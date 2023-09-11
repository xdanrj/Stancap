import React from "react";
import dayjs from "dayjs";
import GenericQuoteForm from "../GenericQuoteForm/GenericQuoteForm";

import quoteEditingServices from "../../../services/quoteServices"
const quoteEditingService = new quoteEditingServices()

export default function AddQuoteForm() {

    //const response = await quoteEditingService.addQuote(updatedQuoteData)

    return (
        <>
            <GenericQuoteForm
                texts={{ button: "Criar quote" }}
                type={"addQuote"}
            />
        </>
    )
}