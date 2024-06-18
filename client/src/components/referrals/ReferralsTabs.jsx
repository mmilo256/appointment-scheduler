import React from "react";
import Tabs from "../ui/Tabs";

const navigation = [
  { label: "Pendientes", href: "pending", styles: "bg-red-50 text-red-500" },
  {
    label: "En proceso",
    href: "in-progress",
    styles: "bg-amber-50 text-amber-500",
  },
  {
    label: "Finalizadas",
    href: "completed",
    styles: "bg-green-50 text-green-500",
  },
];

function ReferralsTabs() {
  return <Tabs links={navigation} />;
}

export default ReferralsTabs;
