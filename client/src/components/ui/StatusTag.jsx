const StatusTag = ({ status = "pendiente" }) => {

    let tagStyles = ""

    switch (status) {
        case "pendiente":
            tagStyles = "bg-amber-100 border-amber-600 text-amber-600"
            break;
        case "terminada":
            tagStyles = "bg-green-100 border-green-600 text-green-600"
            break;
        case "derivada":
            tagStyles = "bg-sky-100 border-sky-600 text-sky-600"
            break;
        default:
            break;
    }

    return (
        <span className={`text-xs py-0.5 px-2 rounded-full border ${tagStyles}`}>{status}</span>
    )
}

export default StatusTag