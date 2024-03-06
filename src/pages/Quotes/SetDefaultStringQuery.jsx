import React, { useEffect } from "react"
import { useSearchParams } from "react-router-dom"

const SetDefaultStringQuery = ({children}) => {
    const [searchParams, setSearchParams] = useState(useSearchParams())
    useEffect(() => {
        if(searchParams.get("page") === null) {
            searchParams.set("page", "1")
            setSearchParams(searchParams)
        }
    }, [searchParams, setSearchParams])

    return children
    }

export default SetDefaultStringQuery