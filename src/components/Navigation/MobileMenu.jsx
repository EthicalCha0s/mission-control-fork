import RouterLinks from "./RouterLinks";
import { useState } from "react";
import { Menu, MenuClose } from "../../assets";

const MobileMenu = () => {
  const [toggleLinks, setToggleLinks] = useState(false);
  return (
    <div className="relative ml-2 flex items-center sm:ml-3">
      <button name="Mobile Navigation Menu" onClick={() => setToggleLinks((toggleLinks) => !toggleLinks)}>{toggleLinks ? <MenuClose /> : <Menu />}</button>

      <ul className={`${!toggleLinks ? "hidden" : "block"} absolute top-[52px] z-10 flex flex-col justify-around h-[220px] w-[220px] sm:h-[300px] sm:w-[300px] rounded bg-gray-100 p-2 sm:p-4 dark:bg-gray-900`}>
        <RouterLinks />
      </ul>
    </div>
  );
};

export default MobileMenu;
