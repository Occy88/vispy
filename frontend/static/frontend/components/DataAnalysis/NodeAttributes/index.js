import React from "react";
import "./style.scss"


/**
 *
 * @param node: {id: id of feature, }
 */
export default function displayNodeAttributes(node) {
    return <div className={"NodeAttributes"}>
        {
            Object.keys(node).map((key, index) => {
                return displayAttribute(key, node[key])
            })}
    </div>

}

function displayAttribute(feature_name, feature_value) {
    return <div key={feature_name} className={'feature'}>
        <h6>{feature_name + " -"} </h6> <p>{feature_value}</p>
    </div>
}


