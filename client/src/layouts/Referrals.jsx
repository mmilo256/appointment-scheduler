import Heading from "../components/ui/Heading";
import Container from "../components/ui/Container";
import ReferralsTable from "../components/referrals/ReferralsTable";

function Referrals() {
  return (
    <Container>
      <Heading>Listado de derivaciones</Heading>
      <ReferralsTable />
    </Container>
  );
}

export default Referrals;
