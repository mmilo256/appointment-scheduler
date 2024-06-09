import HomePannel from "./HomePannel";

const navigation = [
  {
    label: "Crear audiencia",
    href: "appointments/create",
    span: "row-span-2",
    color: "green",
  },
  {
    label: "Audiencias",
    href: "appointments",
    color: "lime",
  },
  { label: "Ciudadanos", href: "citizens", color: "blue" },
  { label: "Direcciones", href: "departments", color: "orange" },
  { label: "Usuarios", href: "users", color: "purple" },
];

function HomeGrid() {
  return (
    <div className="grid grid-cols-3 grid-rows-2 h-[30rem] gap-6">
      {navigation.map((pannel) => (
        <HomePannel
          key={pannel.label}
          href={pannel.href}
          className={pannel.span}
          color={pannel.color}
        >
          {pannel.label}
        </HomePannel>
      ))}
    </div>
  );
}

export default HomeGrid;
