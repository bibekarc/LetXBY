import {
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Input,
    Spinner,
  } from "@nextui-org/react";
  import { appwriteConfig } from "@/lib/appwrite/config";
  import { databases } from "@/lib/appwrite/config";
  import { useState } from "react";
  import { AppwriteException, ID } from "appwrite";
  import { toast } from "react-toastify";
 import { communityStore } from "@/state/communityStore";

  
  export default function CreateCommunity() {
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState("");
    const communityState = communityStore();
  
    const handleSubmit = () => {
      setLoading(true);
      databases
        .createDocument(
            appwriteConfig.databaseId, 
            appwriteConfig.CommunitiesId,
            ID.unique(), {
            name: name,
        })
        .then((res) => {
          communityState.addCommunity(res);
          setLoading(false);
          toast.success("Community added successfully", { theme: "colored" });
        })
        .catch((err: AppwriteException) => {
          setLoading(false);
          toast.error(err.message, { theme: "colored" });
        });
    };
  
    return (
      <>
        <div className="bg-green-500 rounded p-1">
          <Button onPress={onOpen} color="success">
          Create Community
        </Button>
          </div>
<Modal isOpen={isOpen} onOpenChange={onOpenChange}>
  <ModalContent>
    {(onClose) => (
      <div className="flex justify-center items-center min-h-screen">
        <div className="bg-teal-600 rounded-lg shadow-lg p-6 max-w-md mx-auto">
          <ModalHeader className="flex flex-col gap-1 text-2xl font-bold">
            Create Community
          </ModalHeader>
          <ModalBody>
            <Input
              placeholder="Name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              className="bg-dark-4 rounded-xl"
            />
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={onClose} className="bg-rose-600 rounded"> 
              Close
            </Button>
            <Button
              color="danger"
              onPress={handleSubmit}
              disabled={loading}
              className="bg-green-500 rounded "
            >
              {loading ? <Spinner color="white" /> : "Submit"}
            </Button>
          </ModalFooter>
        </div>
      </div>
    )}
  </ModalContent>
</Modal>
      </>
    );
  }
  