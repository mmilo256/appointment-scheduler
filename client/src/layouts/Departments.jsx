import Heading from "../components/ui/Heading";
import Container from "../components/ui/Container";
import DepartmentTable from "../components/departments/DepartmentTable";

function Departments() {
  return (
    <Container>
      <Heading>Listado de direcciones</Heading>
      <DepartmentTable />
    </Container>
  );
}

export default Departments;
