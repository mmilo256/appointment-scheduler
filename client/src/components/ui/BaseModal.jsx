const BaseModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        <div className="flex justify-between items-center border-b border-gray-300 p-4">
          <h2 className="text-xl font-semibold">{title}</h2>
          <button className="text-2xl font-semibold" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default BaseModal;
