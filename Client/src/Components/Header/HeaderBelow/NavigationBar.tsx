import { useMemo } from "react";
import { Link } from "react-router-dom";

/* -------------------------------------------------------------------------- */
/*                              Interfaces Starts                             */
/* -------------------------------------------------------------------------- */
interface NavLink {
  name: string;
  path: string;
}

type NavLinks = NavLink[];

/* ----------------------------- Interfaces Ends ---------------------------- */

/* -------------------------------------------------------------------------- */

//Main Component Starts
const NavigationBar = () => {
  // nav data here
  const navLinks: NavLinks = useMemo(
    () => [
      { name: "Home", path: "/" },
      { name: "Shop", path: "/shop" },
      { name: "About us", path: "/about" },
      { name: "Contact", path: "/contact" },
    ],
    []
  );
  return (
    <nav className="hidden md:block text-white">
      <ul className="flex justify-between">
        {navLinks.map((navLink: NavLink, index) => {
          const { name, path } = navLink;
          return (
            // sub Items Here
            <li className="px-4 hover:text-secondary" key={index}>
              <Link to={path}>{name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default NavigationBar;
