import React from "react";
import Tabs from "../ui/Tabs";
import { useReferralStore } from "../../stores/useReferralStore";



function ReferralsTabs() {

  const pendings = useReferralStore(state => state.pendingReferrals)
  const inProgress = useReferralStore(state => state.inProgressReferrals)
  const completed = useReferralStore(state => state.finishedReferrals)

  const navigation = [
    { label: `Pendientes ${pendings.length}`, href: "pending", styles: "bg-red-50 text-red-500" },
    {
      label: `En proceso ${inProgress.length}`,
      href: "in-progress",
      styles: "bg-amber-50 text-amber-500",
    },
    {
      label: `Finalizadas ${completed.length}`,
      href: "completed",
      styles: "bg-green-50 text-green-500",
    },
  ];

  return <Tabs links={navigation} />;
}

export default ReferralsTabs;
