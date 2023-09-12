import React from "react";
import GenericQuoteForm from "../../components/Quote/GenericQuoteForm/GenericQuoteForm";

export default function EditQuote(props) {
    return (
        <>
            <GenericQuoteForm
                texts={{ button: "Editar quote" }}
                type={"editQuote"}
                //quoteId={props.match.params.id}
            />
        </>
    )
}