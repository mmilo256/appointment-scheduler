const buttonStyles = "disabled:bg-primary-400 bg-primary-500 text-white h-8 w-8 rounded font-bold"
function Pagination({getItems, currentPage, totalPages}) {

    const firstPage = async () => {
        await getItems(1)
    }

    const nextPage = async () => {
        await getItems(currentPage + 1)
    }
    const prevPage = async () => {
        await getItems(currentPage - 1)
    }
    const lastPage = async () => {
        await getItems(totalPages)
    }

  return (
    <div className="flex gap-2">
        <button disabled={currentPage < 2} onClick={firstPage} className={buttonStyles}> {"<<"} </button>
        <button disabled={currentPage < 2} onClick={prevPage} className={buttonStyles}> {"<"} </button>
        <p> {currentPage} / {totalPages} </p>
        <button disabled={currentPage === totalPages} onClick={nextPage} className={buttonStyles}> {">"} </button>
        <button disabled={currentPage === totalPages} onClick={lastPage} className={buttonStyles}> {">>"} </button>
    </div>
  )
}

export default Pagination