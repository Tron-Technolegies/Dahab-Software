export default function WarrantyStatsCard({ item, value }) {
  return (
    <div className="bg-[#E9F2FF] rounded-3xl p-5 shadow-md">
      <p className="text-black text-[15px] font-medium">{item.title}</p>
      <p className="text-black text-2xl font-semibold mt-1">{value}</p>
      {item.subtitle && (
        <p className="text-[12px] mt-1 text-gray-700">{item.subtitle}</p>
      )}
    </div>
  );
}
