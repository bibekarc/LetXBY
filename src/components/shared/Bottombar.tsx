import { Link, useLocation } from "react-router-dom";
import { bottombarLinks } from "@/constants";
import { useUserContext } from "@/context/AuthContext";

const Bottombar = () => {
  const { pathname } = useLocation();
  const { user } = useUserContext();

  const updatedLinks = [
    ...bottombarLinks,
    {
      imgURL: user.imageUrl || "/assets/icons/profile-placeholder.svg",
      route: `/profile/${user.id}`,
      label: "Profile",
    },
  ];

  return (
    <section className="bottom-bar">
      {updatedLinks.map((link) => {
        const isActive = pathname === link.route;
        const isProfile = link.label === "Profile";
        return (
          <Link
            key={`bottombar-${link.label}`}
            to={link.route}
            className={`${
              isActive && "rounded-[10px] bg-primary-500"
            } flex-center flex-col gap-1 py-1.5 px-5 transition`}
          >
            <img
              src={link.imgURL}
              alt={link.label}
              width={16}
              height={16}
              className={`${isActive && "invert-white"} ${isProfile && "rounded-full h-6 w-6"}`}
            />
            <p className="tiny-medium text-light-2">{link.label}</p>
          </Link>
        );
      })}
    </section>
  );
};

export default Bottombar;
