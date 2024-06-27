import { useEffect, useRef, useState } from "react";
import { appwriteConfig } from "@/lib/appwrite/config";
import { databases } from "@/lib/appwrite/config";
import { AppwriteException, Query } from "appwrite";
import { toast } from "react-toastify";
import { communityStore } from "@/state/communityStore";
import { Spinner, Card, CardBody, Button } from "@nextui-org/react";
import { Link } from "react-router-dom";

export default function CommunitiesList() {
  const [loading, setLoading] = useState(false);
  const isDataFetched = useRef(false);
  const communityState = communityStore();
  useEffect(() => {
    if (!isDataFetched.current) {
      setLoading(true);
      databases
        .listDocuments(
            appwriteConfig.databaseId, 
            appwriteConfig.CommunitiesId, [
          Query.select(["$id", "name"]),
        ])
        .then((res) => {
          console.log("The response is", res.documents);
          setLoading(false);
          communityState.addCommunities(res.documents);
        })
        .catch((err: AppwriteException) => {
          toast.error(err.message, { theme: "colored" });
          setLoading(false);
        });

      isDataFetched.current = true;
    }
  }, []);

  return (
    <div>
      <div className="text-center ">
        {" "}
        {loading && <Spinner color="danger" />}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-20 mt-6 ">
        {communityState.communities.length > 0 &&
          communityState.communities.map((item) => (
            <div className="bg-dark-4 p-6 rounded">
              <Card key={item.$id}>
              <CardBody>
                <h1 className="text-xl font-bold">{item["name"]}</h1>
                <p className="py-2">Find more people in this community</p>
                <Link to={`/chats/${item.$id}`}>
                  <Button color="danger" className="w-full rounded bg-green-500">
                    Chat
                  </Button>
                </Link>
              </CardBody>
            </Card>
            </div>
          ))}
      </div>

      {/* If no community found */}
      {communityState.communities.length <= 0 && loading == false && (
        <div className="text-center">
          <h1 className="text-danger-400 font-bold text-2xl">
            No Community Found
          </h1>
          <p>Be the first one to create unique community</p>
        </div>
      )}
    </div>
  );
}
