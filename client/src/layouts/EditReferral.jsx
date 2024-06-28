import Container from "../components/ui/Container";
import Heading from "../components/ui/Heading";
import AppointmentDetails from "../components/referrals/AppointmentDetails";
import { useReferralStore } from "../stores/useReferralStore";
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import EditReferralForm from "../components/referrals/EditReferralForm";

function EditReferral() {
  const [params] = useSearchParams();
  const id = params.get("id");

  const selectedReferral = useReferralStore((state) => state.selectedReferral);
  const selectReferral = useReferralStore((state) => state.selectReferral);

  useEffect(() => {
    selectReferral(id);
  }, [id, selectReferral]);

  const appointmentData = {
    citizen: {
      first_name: selectedReferral.citizen.first_name ?? "",
      last_name: selectedReferral.citizen.last_name,
    },
    date: selectedReferral.appointment.date,
    time: selectedReferral.appointment.time,
    cause: selectedReferral.appointment.cause,
    response: selectedReferral.appointment.response,
  };

  return (
    <Container>
      <Heading className="text-center">Editar derivación</Heading>
      <div className="grid grid-cols-12 gap-10">
        <div className="col-span-5">
          <AppointmentDetails data={appointmentData} />
        </div>
        <div className="col-span-7">
          <EditReferralForm data={selectedReferral} />
        </div>
      </div>
    </Container>
  );
}

export default EditReferral;
