import React from "react";
import './style.scss'
import languages from "./lang.js";
import lk_icon from '../../images/linkedin-icon-2.svg'

let lang = languages[document.documentElement.lang];


/**
 * An Example of a simple widget to be used in the grid.
 *
 * Note: To be able to use a widget you must also:
 *  - Add it to the WidgetList in DashboardGrid
 *  - Create a button for it in the Toolbar
 *
 * Any given widget must take the following parameters
 * @param {function} handleRemove callback used to remove this widget
 * @param {string} i unique identity of this widget.
 */
export default class WelcomePage extends React.Component {
    constructor(props) {
        super(props);
        console.log("loading welcome page");
        console.log("lang:");
        console.log(lang);
        console.log("end-lang");

    }


    render() {
        return (
                <div className={'WelcomePage'}>
                    <div className={'Title'}>
                        {lang.title}
                    </div>
                    <div className={'Subtitle'}>
                        {lang.subtitle}
                    </div>
                    <div className={'WhatIsSeclea'}>
                        <p>{lang.what_is_seclea}
                            <a href="mailto:rajanaeem@seclea.com" style={{color: "rgb(47, 47, 132)"}}
                               className={'contact'}>
                                contact
                            </a>
                            .</p>
                    </div>
                    <img className={'LinkedinIcon'}
                         src={STATIC_URL + lk_icon}
                         onClick={() => {
                             window.open('https://www.linkedin.com/company/seclea')
                         }}/>
                </div>
        )
    }

}

