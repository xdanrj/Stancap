import React, { useEffect, useState } from "react";
import { Ballon, ParagraphAuthor, Paragraph } from "./BallonsStyles";
import _ from "lodash";

export default function Ballons({ data, multipleQuotes }) {   
    const [authorsColors, setAuthorsColors] = useState([])
    const colorPallet = ["#a791ff", "#25d356", "#fc9775", "#ffbc38", "#a5b335", "#e26ab6", "#ffd279", "#d88deb", "#7f66ff"]

    useEffect(() => {
        const loadAuthorsColors = async () => {
            let uniqueAuthors = await multipleQuotes.map((mainObj) => {
                return mainObj.quotes

            })
            console.log(uniqueAuthors)
            uniqueAuthors = _.uniqBy(_.flattenDeep(uniqueAuthors), "author").map((obj) => obj.author)

            const uniqueAuthorsColors = uniqueAuthors.map((authorName, index) => {
                return {
                    author: authorName,
                    color: colorPallet[index ? index : 0]
                }
            })
            setAuthorsColors(uniqueAuthorsColors)
            console.log(uniqueAuthorsColors)
        }
        loadAuthorsColors()
    }, [multipleQuotes])

    let previousAuthor = null
    let actualSide = false
    return data.quotes.map((quote, index) => {        
        let isSameAuthor = quote.author === previousAuthor
        if(isSameAuthor){
            actualSide = actualSide
        } else {
            actualSide = !actualSide
        }
        previousAuthor = quote.author

        return (
            <Ballon
                key={index}
                ballonside={actualSide}
            >
                <ParagraphAuthor authorcolor={authorsColors.find(obj => obj.author === quote.author)?.color}>
                    {quote.author}
                </ParagraphAuthor>
                <Paragraph>
                    {quote.quote}
                </Paragraph>

            </Ballon>
        );
    });
}           