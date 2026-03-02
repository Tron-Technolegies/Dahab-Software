import React from "react";
import { adminNavLinks } from "../../utils/adminNavlinks";
import NavigationLink from "./NavigationLink";

export default function Sidebar() {
  return (
    <div className="hidden xl:block w-72 shrink-0 bg-white shadow-md h-screen overflow-auto p-2 sticky top-0 animate-slideInLeft">
      <div className="mt-3 flex flex-col gap-1">
        {adminNavLinks.map((x) => (
          <NavigationLink
            key={x.id}
            icon={x.icon}
            name={x.name}
            path={x.path}
            urlworld={x.urlword}
          />
        ))}
      </div>
    </div>
  );
}
