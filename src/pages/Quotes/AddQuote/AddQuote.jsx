import { React, useState } from "react"
import { MDBTabsItem, MDBTabsContent, MDBTabsPane } from 'mdb-react-ui-kit';
import { MDBTabs, MDBTabsLink } from "./AddQuoteStyles";
import SingleQuoteGenericForm from "../../../components/Quote/SingleQuoteGenericForm/SingleQuoteGenericForm";
import MultipleQuoteGenericForm from "../../../components/Quote/MultipleQuoteGenericForm/MultipleQuoteGenericForm";
import { AddQuoteDiv } from "./AddQuoteStyles";

export default function AddQuote() {
    const [basicActive, setBasicActive] = useState('singleQuoteTab');
    const handleBasicClick = (value) => {
        if (value === basicActive) {
            return
        }
        setBasicActive(value)
    }

    return (
        <>
        <AddQuoteDiv>
            <MDBTabs className="justify-content-center">
                <MDBTabsItem >
                    <MDBTabsLink  onClick={() => handleBasicClick('singleQuoteTab')} active={basicActive === 'singleQuoteTab'}>Quote única</MDBTabsLink>
                </MDBTabsItem>
                <MDBTabsItem > 
                    <MDBTabsLink onClick={() => handleBasicClick('multipleQuoteTab')} active={basicActive === 'multipleQuoteTab'}>
                        Diálogo
                    </MDBTabsLink >
                </MDBTabsItem>
            </MDBTabs>

            <MDBTabsContent>
                <MDBTabsPane show={basicActive === 'singleQuoteTab'}>
                    <SingleQuoteGenericForm
                        texts={{
                            submitButton: "Criar quote", submitSuccess: "Quote criada com sucesso"
                        }}
                        type={"addQuote"}
                    />
                </MDBTabsPane>

                <MDBTabsPane show={basicActive === 'multipleQuoteTab'}>
                    <MultipleQuoteGenericForm
                        texts={{
                            submitButton: "Criar quote", submitSuccess: "Quote criada com sucesso"
                        }}
                        type={"addQuote"} />
                </MDBTabsPane>
            </MDBTabsContent>           
            </AddQuoteDiv>
        </>
    )
}