import { useEffect, useRef } from "react";
import { account } from "@/lib/appwrite/config";
import { userStore } from "@/state/userStore";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CreateCommunity from "@/components/shared/CreateCommunity";
import CommunitiesList from "@/components/shared/CommunitiesList";

function Community() {
  const isRendered = useRef<boolean>(false);
  const userState = userStore();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isRendered.current) {
      account
        .get()
        .then((res) => {
          userState.updateUser(res);
        })
        .catch(() => {
          userState.resetState();
          navigate("/login");
          toast.error("Your session got expired.please login again", {
            theme: "colored",
          });
        });
      isRendered.current = true;
    }
  }, []);

  return (
    <>
      <div className="common-container">
        <div className="w-full flex items-center justify-between flex-wrap">
          <h1 className="text-5xl font-semibold">Communities</h1>
          <div className="mt-4 sm:mt-0 flex-grow flex justify-end">
            <div className="hidden sm:block"> {/* Hidden on small screens */}
              <CreateCommunity />
            </div>
            <div className="sm:hidden"> {/* Shown only on small screens */}
              <CreateCommunity />
            </div>
          </div>
        </div>
        <CommunitiesList />
      </div>
    </>
  );
}

export default Community;
