import { RiToolsFill, RiContractFill } from "react-icons/ri";
import { MdOutlineInventory } from "react-icons/md";
import { MdCategory } from "react-icons/md";
import { GoCpu } from "react-icons/go";
import { GiCpu, GiMining } from "react-icons/gi";
import { MdDashboardCustomize, MdCelebration } from "react-icons/md";
import { FaUsersLine } from "react-icons/fa6";
import { IoIosWarning } from "react-icons/io";
import { IoMail, IoNotifications, IoCloudOffline } from "react-icons/io5";
import { AiOutlineFileProtect } from "react-icons/ai";
export const adminNavLinks = [
  {
    id: 1,
    name: "Overview",
    path: "/overview",
    urlword: "overview",
    icon: <MdDashboardCustomize />,
  },
  {
    id: 2,
    name: "Miner Models",
    path: "/miner-models",
    urlword: "miner-models",
    icon: <GoCpu />,
  },

  {
    id: 3,
    name: "Miners",
    path: "/data",
    urlword: "data",
    icon: <GiCpu />,
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
    id: 6,
    name: "Clients",
    path: "/clients",
    urlword: "clients",
    icon: <FaUsersLine />,
  },
  {
    id: 7,
    name: "Issues",
    path: "/issues",
    urlword: "issues",
    icon: <IoIosWarning />,
  },
  {
    id: 10,
    name: "Offline Miners",
    path: "/offline-miners",
    urlword: "offline-miners",
    icon: <IoCloudOffline />,
  },
  {
    id: 11,
    name: "Invoices",
    path: "/invoices",
    urlword: "invoices",
    icon: <RiContractFill />,
  },
  {
    id: 12,
    name: "Warranty",
    path: "/warranty",
    urlword: "warranty",
    icon: <AiOutlineFileProtect />,
  },
  {
    id: 13,
    name: "Mining Farms",
    path: "/mining-farms",
    urlword: "mining-farms",
    icon: <GiMining />,
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
