import { Link } from "react-router-dom";
function ActionsRow({ id, noEdit, onDelete, module }) {
  const handleDelete = () => {
    onDelete(id);
  };

  return (
    <div className="flex gap-4">
      {!noEdit && (
        <Link
          to={`/${module}/edit?id=${id}`}
          className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md text-white bg-amber-600 hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Editar
        </Link>
      )}
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
