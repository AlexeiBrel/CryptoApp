import { createContext, useContext, useState } from "react";


const CardContext = createContext()

export const useToggleCard = () => {
    return useContext(CardContext)
}

export const CardProvider = ({ children }) => {
    const [toggleCard, setToggleCard] = useState(true)
    const [key, setKey] = useState(0)

    return (
        <CardContext.Provider value={{ toggleCard, setToggleCard, key, setKey }}>
            {children}
        </CardContext.Provider>
    )
}