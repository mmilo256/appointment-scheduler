import { Link } from "react-router-dom";
function ActionsRow({ id, onDelete, onEdit }) {
  const handleDelete = () => {
    onDelete(id);
  };

  const handleEdit = () => {
    onEdit(id);
  };

  return (
    <div className="flex gap-4">
      <Link
        to={`/users/edit?id=${id}`}
        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-amber-600 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Editar
      </Link>
      <button
        onClick={handleDelete}
        className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-red-600 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
      >
        Eliminar
      </button>
    </div>
  );
}

export default ActionsRow;
