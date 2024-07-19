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
      <div className="grid md:grid-cols-12 gap-5 md:gap-10">
        <div className="md:col-span-5">
          <AppointmentDetails data={selectedAppointment} />
        </div>
        <div className="md:col-span-7">
          <p className="bg-amber-200 p-2 rounded mb-2 text-amber-800 text-sm">Se notificará al director de la dirección seleccionada vía correo electrónico.</p>
          <ReferralForm />
        </div>
      </div>
    </Container>
  );
}

export default CreateReferral;
