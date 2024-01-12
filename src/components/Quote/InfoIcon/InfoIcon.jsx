import { InfoIconStyles } from "../../../CommonStyles/CommonStyles"
import { useState } from "react"

export default function InfoIcon() {
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
        opacity: hovered ? 0.7 : 1,
        transition: 'opacity 0.3s ease-in-out'
    }
    return (
        <>
            <InfoIcon
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                style={InfoIconStyle} />
        </>
    )
}

