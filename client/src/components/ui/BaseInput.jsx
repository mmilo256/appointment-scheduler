import React from 'react'

const BaseInput = ({ type = "text", label, placeholder, required = true, value, onChange, max, options = [] }) => {

    let input;
    const inputStyles = "border border-slate-400 p-2 w-full rounded outline-none mb-2"

    switch (type) {
        case "textarea":
            input = <textarea maxLength={max} value={value} onChange={onChange} required={required} className={inputStyles} placeholder={placeholder} />
            break;
        case "select":
            input = <select value={value} onChange={onChange} className={inputStyles} placeholder={placeholder}>
                <option disabled value="">Seleccionar</option>
                {options?.map((option, index) => (
                    <option
                        className={option.disabled ? "bg-gray-300" : ""}
                        key={index}
                        value={option.disabled ? "" : option.value}
                        disabled={option.disabled} >
                        {option.label}
                    </option>
                ))}
            </select>
            break;
        default:
            input = <input maxLength={max} value={value} onChange={onChange} required={required} className={inputStyles} type={type} placeholder={placeholder} />
    }

    return (
        <label className="block w-full">
            <div className='flex items-center gap-2'>
                <span className="font-semibold">{label}</span>
                {!required && <span className='text-slate-500 text-sm'>(opcional)</span>}
            </div>
            {input}
        </label>
    )
}

export default BaseInput
