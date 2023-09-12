import React from "react";
import GenericQuoteForm from "../GenericQuoteForm/GenericQuoteForm";

export default function EditQuoteForm() {
    return (
        <>
            <GenericQuoteForm
                texts={{ button: "Editar quote" }}
                type={"editQuote"}
            />
        </>
    )
}