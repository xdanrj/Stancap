import React, { useEffect } from "react"
import { useSearchParams, Outlet } from "react-router-dom"

const SetDefaultStringQuery = () => {
    const [searchParams, setSearchParams] = useState(useSearchParams())
    useEffect(() => {
        if(searchParams.get("page") === null) {
            searchParams.set("page", "1")
            setSearchParams(searchParams)
        }
    }, [searchParams, setSearchParams])

    return <Outlet/>
    }

export default SetDefaultStringQuery