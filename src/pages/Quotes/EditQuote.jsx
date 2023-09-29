import React, { useEffect, useState } from "react";
import mongoose from "mongoose";
import { useParams } from "react-router-dom";
import SingleQuoteGenericForm from "../../components/Quote/SingleQuoteGenericForm/SingleQuoteGenericForm";
import MultipleQuoteGenericForm from "../../components/Quote/MultipleQuoteGenericForm/MultipleQuoteGenericForm";

export default function EditQuote() {
    const { id } = useParams()
    const quoteId = { _id: id }
    const { quotetype } = useParams()

    return (
        <>
            {quotetype === "single" ? (
                <SingleQuoteGenericForm
                    texts={{
                        submitButton: "Editar quote", submitSuccess: "Quote editada com sucesso"
                    }}
                    type={"editQuote"}
                    quoteIdToEdit={quoteId}
                />
            ) : quotetype === "multiple" ? (
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