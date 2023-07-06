import React from 'react'

export default function Alert(props) {
    // const capitalize = (word) => {
    //     const lower = word.toLowerCase();
    //     if (word === "danger") {
    //         console.log("danger is removed")
    //         props.alert.type = "Error"
    //     }
    //     return lower.charAt(0).toUpperCase + lower.slice(1);
    // }
    return (
        props.alert && <div className={`alert alert-${props.alert.type} alertCustom`} role="alert">
    <strong>{props.alert.type}&nbsp;</strong> { props.alert.msg }
        </div>
    )
}
