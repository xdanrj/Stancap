import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button, ButtonGroup, ButtonToolbar } from "react-bootstrap"
import { MDBIcon } from "mdb-react-ui-kit"
import { useSearchParams } from "react-router-dom"

export default function Testes() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    useEffect(() => {
        async function getPagesQtd() {
            let totalPagesCalc = Math.ceil(20 / 5);
            setTotalPages(totalPagesCalc);
            let itemsQtd = []
            for (let i = 1; i <= totalPagesCalc; i++) {
                itemsQtd.push(i)
            }
        }
        getPagesQtd();
    }, []);

    const handlePageClick = (pageNum) => {
        // Verifica se pageNum é o primeiro ou o último
        if (pageNum === 1) {
            // Se for o primeiro, move o último para o primeiro lugar
            const lastPage = totalPages;
            searchParams.set("page", lastPage);
            navigate({ search: searchParams.toString() });
        } else if (pageNum === totalPages) {
            // Se for o último, move o primeiro para o último lugar
            const firstPage = 1;
            searchParams.set("page", firstPage);
            navigate({ search: searchParams.toString() });
        } else {
            // Se não for o primeiro nem o último, apenas navega para a página selecionada
            searchParams.set("page", pageNum);
            navigate({ search: searchParams.toString() });
        }
    };

    return (
        <>
            {itemsQtd.map((item) => (
                item < 5 ? (
                    <Button key={item} onClick={() => handlePageClick(item)}>
                        {item}
                    </Button>
                ) : null
            ))}
            <MDBIcon fas icon="angle-double-right" onClick={() => handlePageClick(totalPages)} />
        </>
    );
}
