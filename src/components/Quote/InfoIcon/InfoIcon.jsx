import { InfoIconStyles } from "../../../CommonStyles/CommonStyles"
import { useState } from "react"

export default function InfoIcon({handleQuoteInfoClick, data}) {
    const [hovered, setHovered] = useState(false)

    const handleMouseEnter = () => {
        setHovered(true)
        console.log(hovered)
    }
    const handleMouseLeave = () => {
        setHovered(false)
        console.log(hovered)
    }
    const InfoIconStyle = {
        opacity: hovered ? 1 : 0.2,
        transition: 'opacity 0.3s ease-in-out'
    }
    return (
        <>
            <InfoIconStyles
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={InfoIconStyle}
                onClick={() => handleQuoteInfoClick(data)} />
        </>
    )
}

