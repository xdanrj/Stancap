import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap"
import { MDBIcon } from "mdb-react-ui-kit"

export default function PageSelector() {
    const [itemsQtd, setItemsQtd] = useState([1, 2, 3, 4, 5, 6, 7])
    const navigate = useNavigate()

    const handlePageClick = (item) => {
        let navTarget
        console.log(item)
        console.log("TIPO do ITEM: ", typeof (item))

        if (typeof (item) === "number") {
            navTarget = item
        } else if (item === "last") {
            navTarget = -1
        } else {
            console.log("navTarget nao definido de nenhuma forma")
        }
        navigate({
            search: `?page=${navTarget}`
        })
    }
    return (
        <>
            <ButtonGroup className="me-2">
                {itemsQtd.map((item, idx) => (
                    item < 5 ? (
                        <Button key={idx} onClick={() => handlePageClick(item)}>
                            {item}
                        </Button>
                    ) : null
                ))}
            </ButtonGroup>

            <ButtonGroup>
                <Button><MDBIcon fas icon="angle-double-right" onClick={() => handlePageClick("last")} /> </Button>
            </ButtonGroup>
        </>
    )
}