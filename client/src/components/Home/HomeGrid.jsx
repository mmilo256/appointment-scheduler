import HomePannel from "./HomePannel";

const navigation = [
  {
    label: "Crear audiencia",
    href: "appointments/create",
    rowSpan: "row-span-2",
    color: "green",
  },
  { label: "Audiencias", href: "appointments", color: "lime" },
  { label: "Ciudadanos", href: "citizens", color: "blue" },
  { label: "Direcciones", href: "departments", color: "orange" },
  { label: "Empleados", href: "users", color: "purple" },
];

function HomeGrid() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 h-96 gap-6">
      {navigation.map((pannel) => (
        <HomePannel
          key={pannel.label}
          href={pannel.href}
          className={pannel.rowSpan}
          color={pannel.color}
        >
          {pannel.label}
        </HomePannel>
      ))}
    </div>
  );
}

export default HomeGrid;
