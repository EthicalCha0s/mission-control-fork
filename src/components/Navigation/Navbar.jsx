import MobileMenu from "./MobileMenu";
import RouterLinks from "./RouterLinks";
import { Sun, Moon, LogoBlack, LogoWhite, LogoMobile, DiscordIcon } from "../../assets";

const Navbar = ({ lightMode, setLightMode }) => {
  return (
    <nav
      className={`flex w-full items-center justify-between bg-gradient-to-r from-gray-100 via-amber-50 to-white py-3 px-3 dark:from-slate-900 dark:via-gray-900 dark:to-slate-900  sm:py-4 sm:px-6 xl:pr-10`}
    >
      {/*Mobile logo and Mobile Menu */}
      <div className="flex items-center xl:hidden">
        <a href="https://moondao.com">
        <LogoMobile />
        </a>
        <span className="md:hidden">
          <MobileMenu />
        </span>
      </div>

      {/*Main logo*/}
      <a href="https://moondao.com">
      <div className="relative right-5 hidden xl:flex">{lightMode ? <LogoBlack /> : <LogoWhite/>}</div>
      </a>

      <ul className="relative hidden w-full justify-around md:flex items-center xl:right-5">
        <RouterLinks />
      </ul>

      {/*Color mode and discord link*/}
      <div className="flex lg:ml-2">
        <button aria-label="Toggle Light Mode" className="mr-3 xl:mr-8 2xl:mr-9" onClick={() => setLightMode(!lightMode)}>
          {lightMode ? <Moon /> : <Sun />}
        </button>
        <a aria-label="Link to Discord" href="https://discord.com/invite/5nAu7K9aES" target="_blank">
          <DiscordIcon />
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
