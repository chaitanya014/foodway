import React from "react"
import { useRouteError } from "react-router-dom"

const CustomError = () =>{
    const errorDetails = useRouteError();
    console.log("errorDetails", errorDetails);

    return (
       <div className = "d-flex flex-column justify-content-center align-items-center" style={{height:"100vh"}}>
        <div>{errorDetails?.data}</div>
        <div>Error code: {errorDetails?.status}</div>
        <div>Description: {errorDetails?.statusText}</div>
       </div> 
    )
}

export default CustomError