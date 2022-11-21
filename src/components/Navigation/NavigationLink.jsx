import { NavLink } from "react-router-dom";

const NavigationLink = ({ link, text }) => {
  return (
    <li>
      <NavLink
        to={link}
        className={(element) =>
          element.isActive ? "font-semibold text-blue-500 dark:text-moon-gold" : "font-medium text-gray-800 hover:text-blue-400 dark:text-gray-100 hover:dark:text-amber-200"
        }
      >
        <p className="font-mono text-xl hover:scale-105 sm:text-2xl md:text-base lg:text-xl xl:text-2xl">{text}</p>
      </NavLink>
    </li>
  );
};

export default NavigationLink;
