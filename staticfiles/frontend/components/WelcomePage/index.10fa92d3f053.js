import React from "react";
import './style.scss'
import languages from "./lang.js";
import lk_icon from '../../images/linkedin-icon-2.svg'
import mail_icon from '../../images/mail.svg'
import logo from '../../images/logo.png'
import logo_black from '../../images/logo_black.png'
import ParticleBackground3D
    from "../../../../../static/remote_components/react_components/components/ParticleBackground3D";

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
        this.mail = React.createRef()
    }


    render() {
        return (
            <div className={'WelcomePage'}>
                <ParticleBackground3D/>
                <div className={'Container'}>
                    <div className={'Title'}>
                        {lang.title}
                    </div>
                    <div className={'Subtitle'}>
                        {lang.subtitle}
                    </div>
                    <div className={'WhatIsSeclea'}>
                        <p>{lang.what_is_seclea}
                            <a ref={this.mail} href="mailto:rajanaeem@seclea.com"
                               style={{color: "rgb(47, 47, 132)"}}
                               className={'contact'}>
                                contact
                            </a>
                            .</p>
                    </div>
                    <div className={'Contacts'}>
                        <img className={'LinkedinIcon'}
                             src={STATIC_URL + lk_icon}
                             onClick={() => {
                                 window.open('https://www.linkedin.com/company/seclea')
                             }}/>
                        <img className={'LinkedinIcon'}
                             src={STATIC_URL + mail_icon}
                             onClick={() => {
                                 this.mail.current.click()
                             }}
                        />
                    </div>
                </div>
            </div>
        )
    }

}

