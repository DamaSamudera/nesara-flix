import { useState } from "react";
import Logo from "../assets/Logo.png";
import Button from "./Button";
import { BellDot, LogOut, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import useAuthContext from "../hooks/useAuthContext";

const Navbar = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { logOut } = useAuthContext();
  const navigate = useNavigate();

  return (
    <div
      className={`flex bg-black items-center justify-between w-full px-2 md:px-10 py-2 z-10 sticky top-0`}
    >
      <img className="h-16" onClick={() => navigate("/")} src={Logo} />
      <div className="flex flex-shrink-0 md:gap-2">
        <form
          className={`flex-grow max-w-[400] ${
            showSearch ? "flex" : "hidden md:flex"
          }`}
        >
          <input
            type="search"
            placeholder="search movie"
            className="rounded-l-full border border-secondary-border shadow-inner shadow-secondary py-1 px-4 text-lg w-full focus:border-yellow-500 outline-none"
          />
          <Button className="bg-gray-100 py-2 px-4 rounded-r-full border-secondary-border border border-l-0 flex-shrink-0">
            <Search />
          </Button>
        </form>
        <div
          className={`flex-shrink-0 md:gap-2 ${
            showSearch ? "hidden md:flex" : "flex"
          }`}
        >
          <Button
            onClick={() => setShowSearch(true)}
            variant="ghost"
            size="icon"
            className="md:hidden"
          >
            <Search />
          </Button>
          <Button variant="ghost" size="icon">
            <BellDot />
          </Button>
          <Button
            onClick={() => navigate("/account")}
            variant="ghost"
            size="icon"
          >
            <User />
          </Button>
          <Button onClick={() => logOut()} variant="ghost" size="icon">
            <LogOut />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
