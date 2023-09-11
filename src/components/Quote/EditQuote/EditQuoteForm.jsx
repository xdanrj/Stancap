import React from "react";
import dayjs from "dayjs";
import GenericQuoteForm from "../GenericQuoteForm/GenericQuoteForm";

import quoteEditingServices from "../../../services/quoteServices"
const quoteEditingService = new quoteEditingServices()
export default function AddQuoteForm() {
    const handleSubmitEditQuote = async (e) => {
        e.preventDefault();
        try {
            const updatedQuoteData = {
                ...quoteData,
                quotes: quotes,
                tags: tags,
                uploadDate: dayjs().format(),
                uploadByUser: localStorage.getItem("username")
            }
            const response = await quoteEditingService.addQuote(updatedQuoteData)
            if (response === true) {
                alert('Quote editada com sucesso')
            } else {
                alert(response)
            }
        } catch (error) {
            alert(error)
        }
    }
    return (
        <>
           <GenericQuoteForm handleSubmit={handleSubmitEditQuote} texts={{button: "Editar quote"}}/>
        </>
    )
}