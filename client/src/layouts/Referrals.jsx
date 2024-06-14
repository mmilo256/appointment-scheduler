import Heading from "../components/ui/Heading";
import Container from "../components/ui/Container";
import ReferralsTable from "../components/referrals/ReferralsTable";
import { useReferralStore } from "../stores/useReferralStore";
import { useEffect } from "react";

function Referrals() {
  const getAllReferrals = useReferralStore((state) => state.getAllReferrals);

  useEffect(() => {
    (async () => {
      await getAllReferrals();
    })();
  }, [getAllReferrals]);

  return (
    <Container>
      <Heading>Listado de derivaciones</Heading>
      <ReferralsTable />
    </Container>
  );
}

export default Referrals;
