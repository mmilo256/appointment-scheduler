import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import AppointmentDetails from "../components/referrals/AppointmentDetails";
import ReferralForm from "../components/referrals/ReferralForm";
import { useAppointmentStore } from "../stores/useAppointmentStore";

function CreateReferral() {
  const selectedAppointment = useAppointmentStore(
    (state) => state.selectedAppointment
  );

  return (
    <Container>
      <Heading className="text-center">Derivar audiencia</Heading>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-5">
          <AppointmentDetails data={selectedAppointment} />
        </div>
        <div className="col-span-7">
          <ReferralForm />
        </div>
      </div>
    </Container>
  );
}

export default CreateReferral;
