import React from 'react'
import { useNavigate } from 'react-router-dom';

const BaseButton = ({ text, type = "button", color = "primary", onClick, href, isLoading = false, disabled = false }) => {

    const navigate = useNavigate()

    let colorStyles;

    switch (color) {
        case "primary":
            colorStyles = "bg-secondary-500 hover:bg-secondary-400 disabled:bg-secondary-300";
            break;
        default:
            colorStyles = "bg-primary-500 hover:bg-primary-400 disabled:bg-primary-200";
            break;
    }

    const onClickHandler = () => {
        if (onClick) {
            onClick()
        }
        if (href) {
            navigate(href)
        }
    }

    return (
        <button
            type={type}
            onClick={onClickHandler}
            disabled={disabled || isLoading}
            className={`${colorStyles} ${isLoading && "cursor-wait"} flex w-full p-2 justify-center rounded text-white`}>
            {!isLoading ? text : "Cargando..."}
        </button>
    )
}

export default BaseButton