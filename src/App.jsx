import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./components/layouts/Layout";
import {
  AddData,
  AddDataV2,
  AddInventory,
  AddRepair,
  Clients,
  Data,
  EditData,
  EditDataV2,
  Error,
  ForgotPassowrd,
  Inventory,
  InventoryAlert,
  Invoices,
  Issues,
  Login,
  Messages,
  MinerModels,
  MiningFarms,
  Notifications,
  OfflineMiners,
  Overview,
  RemoveRepair,
  Repair,
  RepairSections,
  ResetPassword,
  SingleClient,
  SingleInventory,
  Warranty,
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
      { index: true, element: <Overview /> },
      { path: "overview", element: <Overview /> },
      { path: "data", element: <Data /> },
      { path: "data/new", element: <AddData /> },
      { path: "data/newV2", element: <AddDataV2 /> },
      { path: "data/:id/edit", element: <EditData /> },
      { path: "data/:id/editV2", element: <EditDataV2 /> },
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
      { path: "miner-models", element: <MinerModels /> },
      { path: "clients", element: <Clients /> },
      { path: "clients/:id", element: <SingleClient /> },
      { path: "issues", element: <Issues /> },
      { path: "offline-miners", element: <OfflineMiners /> },
      { path: "invoices", element: <Invoices /> },
      { path: "warranty", element: <Warranty /> },
      { path: "mining-farms", element: <MiningFarms /> },
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
