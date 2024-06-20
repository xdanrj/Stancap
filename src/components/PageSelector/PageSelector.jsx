import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap"
import { MDBIcon } from "mdb-react-ui-kit"
import { MainDiv } from "./PageSelectorStyles"
import { sizes } from "../../CommonStyles/screenSizes"
import { Form } from "react-bootstrap"

//talvez tirar searchparams de prop e chamar searchparams normalmente aqui, assim como é em outro comps.
export default function PageSelector({ searchParams, quotesQtd }) {
  const [itemsQtd, setItemsQtd] = useState([])
  const [totalPages, setTotalPages] = useState()
  const [showInput, setShowInput] = useState(false)
  const [inputValue, setInputValue] = useState()
  const navigate = useNavigate()
  const buttonSize = sizes.isMobile ? "sm" : false
  let actualPage = searchParams.get("page")
  useEffect(() => {
    console.log(quotesQtd)
    if (quotesQtd) {
      let totalPagesCalc = Math.ceil((quotesQtd / 5))

      setTotalPages(totalPagesCalc)

      let tempItemsQtd = []
      let initialIndex = 1
      if (actualPage >= 4) {
        initialIndex = actualPage - 1
      }

      for (let i = initialIndex; i <= totalPagesCalc; i++) {
        tempItemsQtd.push(i)
      }
      setItemsQtd(tempItemsQtd)
    }

  }, [actualPage, quotesQtd, searchParams])
  console.log(totalPages)
  const handlePageClick = (pageNum) => {
    searchParams.set("page", pageNum)
    navigate({ search: searchParams.toString() })
  }
  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputSubmit = () => {
    const pageNum = parseInt(inputValue, 10);
    if (!isNaN(pageNum) && pageNum > 0 && pageNum <= totalPages) {
      handlePageClick(pageNum);
    }
    setShowInput(false);
    setInputValue("");
  };

  return (
    <MainDiv>
      <ButtonGroup size={buttonSize}>
        {actualPage >= 4 && (
          <Button onClick={() => handlePageClick(1)}><MDBIcon fas icon="angle-double-left" /> </Button>
        )}

        {itemsQtd.slice(0, 4).map((item) => (
          <Button key={item} onClick={() => handlePageClick(item)}>
            {item}
          </Button>

        ))}
        {totalPages > 4 && !showInput ? (
          <Button onClick={() => setShowInput(true)}>
            ...
          </Button>
        ) : (
          showInput && (
            <Button>  
            <input
            type="number"
            value={inputValue}
            onChange={handleInputChange}
            onBlur={handleInputSubmit}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleInputSubmit();
              }
            }}
            style={{ width: "25px", textAlign: "center", backgroundColor: "var(--bs-primary)", color: "white", overflow: "hidden", whiteSpace: "nowrap"}}
            autoFocus
            />
            </Button>
          ))}
          {totalPages > 1 && (
            <Button onClick={() => handlePageClick(totalPages)}><MDBIcon fas icon="angle-double-right" /> </Button>
        )}
      </ButtonGroup>
    </MainDiv>
  )
}