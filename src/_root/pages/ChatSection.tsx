import React, { useState, useEffect, useRef } from "react";
import { Button, Input, Spinner } from "@nextui-org/react";
import { appwriteConfig } from "@/lib/appwrite/config";
import { databases } from "@/lib/appwrite/config";
import { client } from "@/lib/appwrite/config";
import { AppwriteException, ID, Models } from "appwrite";
import { userStore } from "@/state/userStore";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { chatStore } from "@/state/chatsStore";


export default function ChatSection() {
  const { id } = useParams();
  const [message, setMessage] = useState("");
  const user = userStore((state) => state.user) as Models.User<Models.Preferences>;
  const [loading, setLoading] = useState(false);
  const isFetched = useRef(false);
  const chatState = chatStore();

  useEffect(() => {
    if (!isFetched.current) {
      fetchMessage();

      client.subscribe(
        `databases.${appwriteConfig.databaseId}.collections.${appwriteConfig.ChatId}.documents`,
        (response) => {
          console.log("Realtime response:", response);
          const payload = response.payload as Models.Document;

          if (response.events.includes("databases.*.collections.*.documents.*.create")) {
            if (user.$id !== payload["user_id"]) {
              chatState.addChat(payload);
            }
          } else if (response.events.includes("databases.*.collections.*.documents.*.delete")) {
            chatState.deleteChat(payload.$id);
          }
        }
      );

      isFetched.current = true;
    }
  }, []);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    databases
      .createDocument(appwriteConfig.databaseId, appwriteConfig.ChatId, ID.unique(), {
        message: message,
        user_id: user.$id,
        community_id: id,
        name: user.name,
      })
      .then((res) => {
        chatState.addChat(res);
        setMessage("");
      })
      .catch((err: AppwriteException) => {
        toast.error(err.message, { theme: "colored" });
      });
  };

  const fetchMessage = () => {
    setLoading(true);
    databases
      .listDocuments(appwriteConfig.databaseId, appwriteConfig.ChatId)
      .then((res) => {
        setLoading(false);
        chatState.addChats(res.documents);
      })
      .catch((err: AppwriteException) => {
        setLoading(false);
        toast.error(err.message);
      });
  };

  const deleteMessage = (id: string) => {
    databases
      .deleteDocument(appwriteConfig.databaseId, appwriteConfig.ChatId, id)
      .then(() => {
        chatState.deleteChat(id);
      })
      .catch((err: AppwriteException) => {
        toast.error(err.message, { theme: "colored" });
      });
  };

  return (
    <div className="chat-page">
      <div className="common-container w-full md:w-3/4 mx-auto p-4 flex">
        <div className="chat-container relative w-full md:w-11/12 rounded-xl overflow-hidden border border-dark-4 min-h-screen">
          <Link to={`/community`} className="relative z-50">
            <img src={"/assets/icons/larrow.png"} alt="profile" className="h-10 w-10" />
          </Link>
          <div className="absolute inset-0 flex justify-center items-center z-0">
            <div className="bg-shape1 bg-teal z-10"></div>
            <div className="bg-shape2 bg-primary z-10"></div>
            <div className="bg-shape1 bg-purple z-10"></div>
          </div>
          <div className="text-center z-10">
            {loading && <Spinner color="danger" />}
          </div>
          <div className="flex flex-col h-full relative z-10">
            {/* Display all messages */}
            <div className="flex-1 p-4 overflow-y-auto scrollbar-hide" style={{ maxHeight: 'calc(100vh - 220px)', minHeight: 'calc(100vh - 220px)' }}>
              {chatState.chats.map((item) => (
                <div key={item.$id} className={`flex justify-${item["user_id"] === user.$id ? 'end' : 'start'} mb-2`}>
                  <div className={`bg-${item["user_id"] === user.$id ? 'green-400' : 'purple-400'} px-4 py-2 max-w-lg rounded-xl shadow-md`}>
                    <h1 className="font-bold">{item["name"]}</h1>
                    <h1>{item["message"]}</h1>
                    {item["user_id"] === user.$id && (
                      <div className="flex justify-end">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="lucide lucide-trash-2 text-red-500 cursor-pointer"
                          onClick={() => deleteMessage(item.$id)}
                        >
                          <path d="M3 6h18" />
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                          <line x1="10" x2="10" y1="11" y2="17" />
                          <line x1="14" x2="14" y1="11" y2="17" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Box */}
            <div className="p-4 bg-transparent z-10">
              <form onSubmit={handleSubmit} className="flex items-center space-x-2">
                <Input
                  type="text"
                  placeholder="Type message..."
                  onChange={(e) => setMessage(e.target.value)}
                  value={message}
                  className="flex-grow bg-transparent"
                />
                <Button color="primary" type="submit" className="rounded bg-dark-4">Send</Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
