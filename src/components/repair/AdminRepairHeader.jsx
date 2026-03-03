import { CiSearch } from "react-icons/ci";
import { Link } from "react-router-dom";

export default function AdminRepairHeader({ search, setSearch }) {
  return (
    <div>
      <div className="flex md:flex-row flex-col justify-between gap-5 md:items-center mb-3 pb-3 border-b border-gray-200">
        <div>
          <h2 className="md:text-2xl font-medium text-lg my-2">Repairs</h2>
          <p>Repair and track the repair process of your miners</p>
        </div>
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
      </div>

      <div className="flex gap-3 my-3">
        <input
          type="search"
          placeholder="search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="p-2 rounded-md w-fit outline-none bg-gray-100"
        />
      </div>
    </div>
  );
}
