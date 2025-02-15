import React from "react";
import {VscTrash} from "@react-icons/all-files/vsc/VscTrash";
import './DottedValue.css'

const DottedValue = ({children, onDelete}) => {
    return <div className="DottedValue">
        <span>{children}</span>
        <VscTrash size={25} onClick={() => onDelete(children)} style={{cursor: "pointer"}}/>
    </div>
}

export default DottedValue;