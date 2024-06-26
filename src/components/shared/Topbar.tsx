import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { useSignOutAccount } from "@/lib/react-query/queriesAndMutations";
import { useEffect } from "react";

const Topbar = () => {
  const navigate = useNavigate();
  const { mutate: signOut, isSuccess } = useSignOutAccount();

  useEffect(() => {
    if (isSuccess) navigate(0);
  }, [isSuccess]);

  return (
    <section className="topbar">
      <div className="flex-between py-2 px-5">
        <Link to="/" className="flex gap-3 items-center">
          <img
            src="/assets/images/logo1.png"
            alt="logo"
            width={150}
            height={200}
          />
        </Link>

        <div className="flex gap-4">
          <Link to="/create-post" className="flex-center gap-3">
            <img
              src="/assets/icons/createpost.svg"
              alt="create post"
              className="h-8 w-8"
            />
          </Link>

          <Button
            variant="ghost"
            className="shad-button_ghost"
            onClick={() => signOut()}
          >
            <img src="/assets/icons/logout.svg" alt="logout" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Topbar;
