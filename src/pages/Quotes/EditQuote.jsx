import React, { useEffect, useState } from "react";
import mongoose from "mongoose";
import SingleQuoteGenericForm from "../../components/Quote/SingleQuoteGenericForm/SingleQuoteGenericForm";
import MultipleQuoteGenericForm from "../../components/Quote/MultipleQuoteGenericForm/MultipleQuoteGenericForm";
import { useSearchParams } from "react-router-dom";

export default function EditQuote() {
    const [searchParams, setSearchParams] = useSearchParams()
    const [quoteType, setQuoteType] = useState("")
    const [quoteId, setQuoteId] = useState("")
    // const { id } = useParams()
    // const quoteId = { _id: id }
    // const { quotetype } = useParams()
    useEffect(() => {
        console.log(searchParams.get("type"))
        console.log(searchParams.get("quote"))
        setQuoteType(searchParams.get("type"))
        setQuoteId(searchParams.get("quote"))
    }, [])

    return (
        <>
            {quoteType === "single" ? (
                <SingleQuoteGenericForm
                    texts={{
                        submitButton: "Editar quote", submitSuccess: "Quote editada com sucesso"
                    }}
                    type={"editQuote"}
                    quoteIdToEdit={quoteId}
                />
            ) : quoteType === "multiple" ? (
                <MultipleQuoteGenericForm
                    texts={{
                        submitButton: "Editar quote", submitSuccess: "Quote editada com sucesso"
                    }}
                    type={"editQuote"}
                    quoteIdToEdit={quoteId}
                />
            ) : null}
        </>
    )
}