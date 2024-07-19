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
  { label: "Derivaciones", href: "referrals/pending", color: "orange" },
  { label: "Usuarios", href: "users", color: "purple" },
];

function HomeGrid() {
  return (
    <div className="grid grd-cols-1 md:grid-cols-3 grid-rows-6 md:grid-rows-2 h-[20rem] gap-4">
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
