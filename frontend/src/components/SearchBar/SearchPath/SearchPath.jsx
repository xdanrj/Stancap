import { React, useState, useEffect } from "react";
import { MainDiv } from "./SearchPathStyles";
import { Breadcrumb, Row, Col } from "react-bootstrap";

export default function SearchPath({ searchParams }) {
    for (const value of searchParams.values()) {
        console.log(value);
      }
     
      const itemsArray = Array.from(searchParams.values())
      console.log(itemsArray)
    return (
        <div className="d-flex justify-content-center">
            <Breadcrumb>
                {
                    itemsArray.map((item, index)=>  (
                        <Breadcrumb.Item>
                        {item}
                        </Breadcrumb.Item>
                    ))
                
                }
            </Breadcrumb>
        </div>
    )
}