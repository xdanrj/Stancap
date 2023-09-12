import React from "react";
import GenericQuoteForm from "../../components/Quote/GenericQuoteForm/GenericQuoteForm"

export default function AddQuoteForm() {
    return (
        <>
            <GenericQuoteForm
                texts={{ button: "Criar quote" }}
                type={"addQuote"}
            />
        </>
    )
}