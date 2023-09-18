import React from "react";
import mongoose from "mongoose";
import { useParams } from "react-router-dom";
import SingleQuoteGenericForm from "../../components/Quote/SingleQuoteGenericForm/SingleQuoteGenericForm";

export default function EditQuote() {
    const { id } = useParams()
    const quoteId = { _id: id }
    console.log(quoteId)
    return (
        <>
            <SingleQuoteGenericForm
                texts={{
                    submitButton: "Editar quote", submitSuccess: "Quote editada com sucesso"
                }}
                type={"editQuote"}
                quoteIdToEdit={quoteId}
            />
        </>
    )
}