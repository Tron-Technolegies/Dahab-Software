import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function NavigationLink({ icon, name, path, urlworld }) {
  const location = useLocation();
  const pathname = location.pathname;
  return (
    <Link
      to={path}
      className={`flex gap-3 items-center my-1 text-lg font-medium px-2 py-2 rounded-lg hover:ml-1.5 nav-link hover:text-white hover:bg-homeBg  ${
        pathname.includes(urlworld)
          ? " ml-3 text-white shadow-lg bg-homeBg"
          : "text-black"
      }`}
    >
      <div>{icon}</div>
      <p>{name}</p>
    </Link>
  );
}
