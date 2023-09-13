import React from "react";
import mongoose from "mongoose";
import { useParams } from "react-router-dom";
import GenericQuoteForm from "../../components/Quote/GenericQuoteForm/GenericQuoteForm";


export default function EditQuote() {  
    const {id} = useParams()
    const quoteId = {_id: id}
    //const quoteId = mongoose.Types.ObjectId(params)
    console.log(quoteId)
    return (
        <>
            <GenericQuoteForm
                texts={{ button: "Editar quote" }}
                type={"editQuote"}
                quoteIdToEdit={quoteId}
            />
        </>
    )
}