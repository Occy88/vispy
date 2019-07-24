import React from 'react'
import './style.css'
import {Navbar, Nav} from 'react-bootstrap'
import {Link, withRouter} from 'react-router-dom'
import languages from "./lang.js"
// import LanguageSelect from "../../../../../accounts/static/accounts/components/Languages/LanguageSelect.jsx";

let lang = languages[document.documentElement.lang];

const app_url_prefix = "/visualizer";

//THIS FILE REQUIRES A STATIC_URL to be defined in the base html file.
if (STATIC_URL === undefined) {
    STATIC_URL = "";
}
export default class Header extends React.Component {
    constructor(props) {
        super(props);
        console.log(lang);
        console.log("=================");
        this.state={

        }
    }


    render() {
        return (
            <Navbar fixed="top">
                <Navbar.Brand>
                    <Link to={'/'}>
                        <img
                            src={"https://www.designevo.com/res/templates/thumb_small/blue-bar-graph-and-stock.png"}
                            style={{"padding": "5px", "marginTop": "-17px"}} alt="Logo"></img>
                    </Link>
                </Navbar.Brand>
                <CustomNav/>
                <div className="ml-auto pr-md-5 navbar-nav">

                    {/*<div style={{"padding": "5px"}}>*/}
                        {/*<LanguageSelect/>*/}
                    {/*</div>*/}
                    <div style={{"padding": "5px"}}>
                        <a style={{'fontWeight': 'bold', 'paddingLeft': '20px', 'color': 'rgba(0,178,177,0.7)'}}
                           href={'/accounts/logout/'}>{lang.logout}</a>
                    </div>
                </div>
            </Navbar>
        )
    }
}

const CustomNav = withRouter((props) => {
    const {location} = props;
    console.log(location.pathname+"/knn");
    console.log(app_url_prefix+"/knn");
    return (
        <Nav>
            <li className={(location.pathname === app_url_prefix + "/knn") ? "active nav-item" : "nav-item"}>
                <Link className="nav-link" to={app_url_prefix + "/knn"}>{lang.knn}</Link>
            </li>



        </Nav>

    )


});