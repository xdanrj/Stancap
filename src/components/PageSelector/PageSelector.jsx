import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap"
import { MDBIcon } from "mdb-react-ui-kit"

export default function PageSelector({ searchParams, quotesQtd }) {
    //const [itemsQtd, setItemsQtd] = useState([1])
    const [totalPages, setTotalPages] = useState(1)
    const navigate = useNavigate()

    useEffect(() => {
        async function getPagesQtd() {
            let totalPagesCalc = Math.ceil((quotesQtd / 5)) 
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
            //setItemsQtd(Array.from({ length: totalPagesCalc }, (_, i) => i + 1))
        }
        getPagesQtd()
        // if(searchParams.get("page") === totalPages -1){
        //     let itemsQtdCopy = [...itemsQtd]
        //     itemsQtdCopy[0] = itemsQtdCopy[0] +1
        //     setItemsQtd(itemsQtd[0] + 1)
        // }
    }, [quotesQtd])

    const handlePageClick = (pageNum) => {
        console.log(`${typeof (pageNum)}: ${pageNum}`)
        console.log(totalPages)

        searchParams.set("page", pageNum)
        navigate({ search: searchParams.toString() })
    }
    return (
        <>
            <ButtonGroup className="me-2">
                {itemsQtd.map((item) => (
                    item < totalPages ? (
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