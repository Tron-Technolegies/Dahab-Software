import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import {
  AddData,
  AddInventory,
  AddRepair,
  Data,
  EditData,
  Error,
  ForgotPassowrd,
  Inventory,
  InventoryAlert,
  Login,
  Messages,
  Notifications,
  RemoveRepair,
  Repair,
  RepairSections,
  ResetPassword,
  SingleInventory,
} from "./pages";
import { userLoader } from "./loader/userLoader";

const client = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 3,
    },
  },
});

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    loader: userLoader,
    errorElement: <Error />,
    children: [
      { index: true, element: <Data /> },
      { path: "data", element: <Data /> },
      { path: "data/new", element: <AddData /> },
      { path: "data/:id/edit", element: <EditData /> },
      { path: "repair", element: <Repair /> },
      { path: "repair/new", element: <AddRepair /> },
      { path: "repair/remove", element: <RemoveRepair /> },
      { path: "repair/status/:id", element: <RepairSections /> },
      { path: "inventory", element: <Inventory /> },
      { path: "inventory/new", element: <AddInventory /> },
      { path: "inventory/alert", element: <InventoryAlert /> },
      { path: "inventory/:id", element: <SingleInventory /> },
      { path: "notifications", element: <Notifications /> },
      { path: "messages", element: <Messages /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/forgot-password", element: <ForgotPassowrd /> },
  { path: "/reset-password", element: <ResetPassword /> },
]);

export default function App() {
  return (
    <QueryClientProvider client={client}>
      <ReactQueryDevtools initialIsOpen />
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
