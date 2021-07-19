import React from "react";

function Product (props) {
    return (
        <div style={{border: "2px solid orange",background:"coral",borderRadius:"5px 10px",textDecorationWidth:"1px",margin:"10px",width:"450px",fontSize:"15px",textAlign:"left" }}>
            <div>Name: {props.data.name}</div>
            {  props.data.price &&
               <div>Price: {props.data.price}</div>
            }
            <div>Region: {props.data.region}</div>
            <div>Category: {props.data.category}</div>
            {
                props.data.phone &&
                <div>For more details call {props.data.phone}</div>
            }

        </div>
    )
}
export default Product;