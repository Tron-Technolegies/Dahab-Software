import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminRepairHeader({ search, setSearch }) {
  return (
    <div>
      <h2 className="md:text-2xl text-lg my-2">Repair Dashboard</h2>
      <div className="flex flex-col gap-3 my-3 items-end">
        <Link
          to={"/repair/new"}
          className="px-4 py-2 w-fit rounded-md bg-homeBg text-white hover:bg-homeBgGradient"
        >
          Add New Miner
        </Link>
        <Link
          to={"/repair/remove"}
          className="px-4 py-2 w-fit rounded-md bg-homeBg text-white hover:bg-homeBgGradient"
        >
          Remove Connected Miner
        </Link>
      </div>
      <div className="flex gap-3 my-3">
        <input
          type="search"
          placeholder="search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-md w-fit outline-none bg-white"
        />
      </div>
    </div>
  );
}
