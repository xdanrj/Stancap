import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Ballon, ParagraphAuthor, Paragraph } from "./BallonsStyles";
import _ from "lodash";

export default function Ballons({ data, multipleQuotes }) {
    const [authorsColors, setAuthorsColors] = useState([])
    const colorPallet = ["#25d356", "#fc9775", "#ffbc38", "#e26ab6", "#ffd279", "#d88deb", "#7f66ff", "#a5b335"]
    //"#a791ff"
    useEffect(() => {
        const loadAuthorsColors = async () => {

            let uniqueAuthors = await multipleQuotes.map((mainObj) => {
                return mainObj.quotes

            })
            console.log(uniqueAuthors)
            uniqueAuthors = _.uniqBy(_.flattenDeep(uniqueAuthors), "author").map((obj) => obj.author)

            let actualColor
            let remainColors = [...colorPallet]
            const uniqueAuthorsColors = uniqueAuthors.map((authorName, index) => {
                if (remainColors.length >= 1) {
                    remainColors = [...colorPallet]
                }
                actualColor = remainColors[_.random(remainColors.length - 1)]
                console.log(remainColors[_.random(remainColors.length - 1)])
                console.log(actualColor)

                _.pull(remainColors, actualColor)
                return {
                    author: authorName,
                    color: actualColor
                }
            })
            setAuthorsColors(uniqueAuthorsColors)
            console.log(uniqueAuthorsColors)
        }
        loadAuthorsColors()
    }, [multipleQuotes])

    let previousAuthor = null
    let actualSide = false

    const [isExpanded, setIsExpanded] = useState(false)
    const handleReadMore = () => {
        setIsExpanded(!isExpanded)
    }
    
    return data.quotes.map((quote, index) => {
        let readMoreEnabled = false
        let isSameAuthor = quote.author === previousAuthor
        if (isSameAuthor) {
            actualSide = actualSide
        } else {
            actualSide = !actualSide
        }
        previousAuthor = quote.author
        console.log("idx: ", index)
        return (
            <>
                {index < 3 && (
                    <>
                        <Ballon
                            key={index}
                            ballonside={actualSide}>
                            <ParagraphAuthor authorcolor={authorsColors.find(obj => obj.author === quote.author)?.color}>
                                {quote.author}
                            </ParagraphAuthor>
                            <Paragraph>
                                {quote.quote}
                            </Paragraph>
                        </Ballon>
                    </>
                )}

                {index === 3 && (
                    <Button onClick={handleReadMore}>Ler mais</Button>
                )}
            </>             
        )
})
}           