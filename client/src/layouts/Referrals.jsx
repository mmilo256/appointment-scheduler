import Heading from "../components/ui/Heading";
import Container from "../components/ui/Container";
import { useReferralStore } from "../stores/useReferralStore";
import { useEffect } from "react";
import ReferralsTabs from "../components/referrals/ReferralsTabs";
import { Route, Routes } from "react-router-dom";
import PendingReferralsTable from "../components/referrals/PendingReferralsTable";
import InProgressReferralsTable from "../components/referrals/InProgressReferralsTable";
import CompletedReferralsTable from "../components/referrals/CompletedReferralsTable";

function Referrals() {
  const getAllReferrals = useReferralStore((state) => state.getAllReferrals);

  useEffect(() => {
    (async () => {
      await getAllReferrals(1);
    })();
  }, [getAllReferrals]);

  return (
    <>
      <Container>
        <Heading>Listado de derivaciones</Heading>
      </Container>
      <ReferralsTabs />
      <Container>
        <Routes>
          <Route path="pending" element={<PendingReferralsTable />} />
          <Route path="in-progress" element={<InProgressReferralsTable />} />
          <Route path="completed" element={<CompletedReferralsTable />} />
        </Routes>
      </Container>
    </>
  );
}

export default Referrals;
