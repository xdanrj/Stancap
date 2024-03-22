import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap"
import { MDBIcon } from "mdb-react-ui-kit"
import { useSearchParams } from "react-router-dom"

export default function Testes() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [totalPages, setTotalPages] = useState(1);
    const [itemsQtd, setItemsQtd] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        async function getPagesQtd() {
            let totalPagesCalc = Math.ceil((30 / 5)) 
            console.log(totalPagesCalc)
            setTotalPages(totalPagesCalc)
            // [1, 2, 3, 4]
            // [2, 3, 4, 5]
            //possivel formula pro indice
            // totalPages === 5
            // actualPage === 4
            let itemsQtd = []
            let initialIndex = searchParams.get("page")
            for (let i = 1; i <= totalPagesCalc; i++) {
                itemsQtd.push(i)
              }
              setItemsQtd(itemsQtd)
        }
        getPagesQtd()
    }, [])

    const handlePageClick = (pageNum) => {
        searchParams.set("page", pageNum)
        navigate({ search: searchParams.toString() })
    }

    const updateButtonNumbers = (totalPages, current_page) => {
        if (current_page === totalPages - 1) {
            // When on the penultimate page, advance the button numbers
            return [current_page - 1, current_page, current_page + 1, current_page + 2];
        } else {
            return [current_page - 2, current_page - 1, current_page, current_page + 1];
        }
    }

    // Get the current page from searchParams (you can replace this with your actual logic)
    const currentPage = parseInt(searchParams.get("page")) || 1;
    const updatedButtons = updateButtonNumbers(totalPages, currentPage);
    return (
        <>
            <ButtonGroup className="me-2">
                {updatedButtons.map((item) => (
                    item < 5 ? (
                        <Button key={item} onClick={() => handlePageClick(item)}>
                            {item}
                        </Button>
                    ) : null
                ))}
            </ButtonGroup>

            <ButtonGroup>
                <Button><MDBIcon fas icon="angle-double-right" onClick={() => handlePageClick(totalPages)} /> </Button>
            </ButtonGroup>
        </>
    )
}