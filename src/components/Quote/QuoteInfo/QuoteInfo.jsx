import React, { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom';
import { NormalDate, NormalDateAndHour } from "../../../Formatting/DateFormatting";
import { Modal, ModalTitle, ModalBody, TextTitle, TextParagraph, ClickabeTextParagraph } from "./QuoteInfoStyles";
import quoteEditingServices from "../../../services/quoteServices";
import userServices from "../../../services/userServices";
import _ from "lodash";
import { ring } from "ldrs";
ring.register()
import Sources from "../Sources";

export default function QuoteInfo({ show, setShow, rawData }) {
  const navigate = useNavigate()
  const handleClose = () => setShow(false)
  const Source = new Sources()
  const quoteService = new quoteEditingServices()
  const userService = new userServices()
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    console.log(rawData)
    async function formatData() {
      setLoading(true)
      const updatedData = { ...rawData }
      updatedData.uploadByUser = await userService.getUsername(rawData.uploadByUser)
      updatedData.source = Source.getLabel(rawData.source)
      console.log(updatedData)
      setData(updatedData)
      setLoading(false)
    }
    formatData()
  }, [rawData])

  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <ModalTitle>Detalhes da Quote</ModalTitle>
        </Modal.Header>

        <ModalBody>
        {loading ? (
            <l-ring color='white' />
          ) : (
            <>
          <TextTitle>Source</TextTitle>
          <ClickabeTextParagraph onClick={() => {
            navigate(`?source=${rawData.source}`)
            handleClose()
          }}>
            {data.source || "Source não especificada" || "Loading"}
          </ClickabeTextParagraph>

          <TextTitle>Data de upload</TextTitle>
          <TextParagraph>{
            NormalDateAndHour(data.uploadDate) ||
            "Data não especificada"}
          </TextParagraph>

          {
            data.lastEditDate && (
              <>
                <TextTitle>Última edição</TextTitle>
                <TextParagraph>{
                  NormalDateAndHour(data.lastEditDate) ||
                  "Data não especificada"}
                </TextParagraph>
              </>
            )
          }

          <TextTitle>Upload por</TextTitle>
          <ClickabeTextParagraph onClick={() => {
            navigate(`?uploadByUsername=${data.uploadByUser}`)
            handleClose()
          }}>{
              data.uploadByUser ||
              "Usuário não especificado (isso não deveria acontecer, contate o dev)"}
          </ClickabeTextParagraph>

          <TextTitle>Contexto</TextTitle>
          <ClickabeTextParagraph onClick={() => {
            navigate(`?context=${rawData.context}`)
            handleClose()
          }}>{
              data.context ||
              "Contexto não especificado"}
          </ClickabeTextParagraph>

          <TextTitle>Tags</TextTitle>
          {data.tags && data.tags.length > 0 ? (
            data.tags.map((tag, index) => (
              <ClickabeTextParagraph key={index} onClick={() => {
                navigate(`?tags=${tag}`)
                handleClose()
              }}>
                {tag}
                {index < data.tags.length - 1 && ' • '}
              </ClickabeTextParagraph>
            ))
          ) : (
            <TextParagraph>Nenhuma tag adicionada (isso não deveria acontecer, contate o dev)</TextParagraph>
          )}

          {data.quoteType === "multiple" && (
            <>
              <TextTitle>Data</TextTitle>
              <TextParagraph>{
                data.date || "Data não especificada"}</TextParagraph>
            </>
          )}
          </>
          )}
        </ModalBody>
      </Modal>
    </>
  )
}