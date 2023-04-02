import { ReactElement } from "react";
import { AiFillHome, AiFillGift } from "react-icons/ai";
import { BiCategory } from "react-icons/bi";
import { BsFillPersonFill } from "react-icons/bs";
import { FaShoppingBag } from "react-icons/fa";

// interface starts
interface Sidebar {
  title: string;
  path: string;
  icon: ReactElement;
}
// interface ends

// sidebar data
export const sidebarData: Sidebar[] = [
  { title: "Dashboard", path: "/admin-dashboard", icon: <AiFillHome /> },
  {
    title: "Product",
    path: "/admin-dashboard/product",
    icon: <FaShoppingBag />,
  },
  {
    title: "Author",
    path: "/admin-dashboard/author",
    icon: <BsFillPersonFill />,
  },
  {
    title: "Genre",
    path: "/admin-dashboard/genre",
    icon: <BiCategory />,
  },
  {
    title: "Order",
    path: "/admin-dashboard/order",
    icon: <AiFillGift />,
  },
];
