import { AiFillProduct } from "react-icons/ai";
import { RiToolsFill } from "react-icons/ri";
import { MdOutlineInventory } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { ImBlog } from "react-icons/im";
import { MdDashboardCustomize, MdCelebration } from "react-icons/md";
import { SiBitcoinsv } from "react-icons/si";
import { IoMail, IoNotifications } from "react-icons/io5";
export const adminNavLinks = [
  {
    id: 3,
    name: "Data",
    path: "/data",
    urlword: "data",
    icon: <MdCategory />,
  },
  {
    id: 4,
    name: "Repair",
    path: "/repair",
    urlword: "repair",
    icon: <RiToolsFill />,
  },
  {
    id: 5,
    name: "Inventory",
    path: "/inventory",
    urlword: "inventory",
    icon: <MdOutlineInventory />,
  },

  {
    id: 8,
    name: "Notifications",
    path: "/notifications",
    urlword: "notifications",
    icon: <IoNotifications />,
  },
  {
    id: 9,
    name: "Messages",
    path: "/messages",
    urlword: "messages",
    icon: <IoMail />,
  },
];
