import Button from "../ui/Button";
function AppointmentCard({ data }) {
  const onClickHandler = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className={`flex justify-between items-center ${
        data.isReferred ? "bg-green-100" : "bg-slate-100"
      } rounded shadow p-4`}
    >
      {/** Info */}
      <div className="flex flex-col gap-1">
        <p className="text-lg">
          <strong>Hora:</strong> {data.time}
        </p>
        <p className="text-lg">
          <strong>Ciudadano:</strong> {data.citizen}
        </p>
        <p className="text-lg">
          <strong>Motivo:</strong> {data.cause}
        </p>
        {data.isReferred ? (
          <p className="font-bold text-green-600">Derivada</p>
        ) : (
          <p className="font-bold text-gray-500">Por derivar</p>
        )}
      </div>
      {/** Acciones */}
      <div>
        <div className="flex gap-2">
          <Button
            onClick={data.isReferred && onClickHandler}
            href={`/referrals/create?id=${data.id}`}
            color="secondary"
            className={
              data.isReferred &&
              "bg-secondary-200 hover:bg-secondary-200 cursor-not-allowed"
            }
          >
            {data.isReferred ? "Derivada" : "Derivar"}
          </Button>
          <Button>Editar</Button>
          <Button>Borrar</Button>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCard;
