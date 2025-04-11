import { useRef } from "react"
import Button from "./Button"

const SearchBar = ({ setQuery }) => {

    const inputRef = useRef(null)

    const onSubmit = async (e) => {
        e.preventDefault()
        setQuery(inputRef.current.value)
    }

    return (
        <form onSubmit={onSubmit} className="flex gap-2">
            <input ref={inputRef} type="text" placeholder="Buscar..." className="border border-slate-400 p-2 w-full rounded" />
            <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-4 rounded">Buscar</button>
        </form>
    )
}

export default SearchBar