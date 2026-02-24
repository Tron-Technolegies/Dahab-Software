import { Link, useOutletContext } from "react-router-dom";
import { useTotalAlerts } from "../../hooks/inventory/useInventory";
import Loading from "../Loading";

const options = ["All", "Repair Components", "Mining Facility Items"];
export default function AdminInventoryHeader({
  search,
  setSearch,
  type,
  setType,
}) {
  const user = useOutletContext();
  const { isLoading: loading, data: total } = useTotalAlerts();

  return (
    <div>
      <h2 className="md:text-2xl text-lg my-2">Inventory Dashboard</h2>
      <div className="flex flex-col gap-3 my-3 items-end">
        <Link to={"/inventory/new"}>
          <button
            disabled={user?.role === "admin"}
            className="px-4 py-2 w-fit rounded-md bg-homeBg text-white hover:bg-homeBgGradient disabled:bg-gray-200 disabled:cursor-not-allowed"
          >
            Add New Item
          </button>
        </Link>
        {loading ? (
          <Loading />
        ) : (
          <Link to={"/inventory/alert"} className="relative">
            <button
              disabled={user?.role === "admin"}
              className="px-4 py-2 w-fit rounded-md bg-homeBg text-white hover:bg-homeBgGradient disabled:bg-gray-200 disabled:cursor-not-allowed"
            >
              Alerts Panel
            </button>
            <p className="absolute -top-2 -left-3 w-8 h-8 text-white flex justify-center items-center rounded-full bg-red-600">
              {total?.total}
            </p>
          </Link>
        )}
      </div>
      <div className="flex gap-3 my-3">
        <input
          type="search"
          placeholder="search..."
          className="p-2 rounded-md w-fit outline-none bg-white"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <select
        className={`bg-white p-2 rounded-md outline-none`}
        value={type}
        onChange={(e) => {
          setType(e.target.value);
        }}
      >
        {options.map((item) => (
          <option>{item}</option>
        ))}
      </select>
    </div>
  );
}
