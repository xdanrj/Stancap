import { InfoIconStyles } from "../../../CommonStyles/CommonStyles"
import { useState } from "react"

export default function InfoIcon({ handleQuoteInfoClick, data }) {
    const [hovered, setHovered] = useState(false)
    const [opacityValue, setOpacityValue] = useState(0.2)

    const handleMouseEnter = () => {
        setHovered(true)
        console.log(hovered)
    }
    const handleMouseLeave = () => {
        setHovered(false)
        console.log(hovered)
    }
    const InfoIconStyle = {
        opacity: hovered ? 1 : opacityValue,
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