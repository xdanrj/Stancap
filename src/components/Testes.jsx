import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap"
import { MDBIcon } from "mdb-react-ui-kit"
import { useSearchParams } from "react-router-dom"

export default function Testes() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [itemsQtd, setItemsQtd] = useState([])
    const navigate = useNavigate()

    let actualPage = searchParams.get("page")
    let totalPages
    useEffect(() => {
        async function getPagesQtd() {
            let totalPagesCalc = Math.ceil((75 / 5))
            console.log(totalPagesCalc)
            totalPages = totalPagesCalc
            
            console.log(actualPage)
            let itemsQtd = []
            let initialIndex = 1
            if (actualPage >= 4) {
                initialIndex = actualPage - 1
            }

            for (let i = initialIndex; i <= totalPagesCalc; i++) {
                itemsQtd.push(i)
            }
            setItemsQtd(itemsQtd)
        }
        getPagesQtd()
    }, [searchParams.get("page")])

    const handlePageClick = (pageNum) => {
        searchParams.set("page", pageNum)
        navigate({ search: searchParams.toString() })
    }

    return (
        <>
            {actualPage >= 4 && (
                <Button><MDBIcon fas icon="angle-double-left" onClick={() => handlePageClick(1)} /> </Button>
            )}

            <ButtonGroup className="mx-2">
                {itemsQtd.slice(0, 4).map((item) => (
                    <Button key={item} onClick={() => handlePageClick(item)}>
                        {item}
                    </Button>

                ))}
            </ButtonGroup>
            <Button><MDBIcon fas icon="angle-double-right" onClick={() => handlePageClick(totalPages)} /> </Button>
        </>
    )
}