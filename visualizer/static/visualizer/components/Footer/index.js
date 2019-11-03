import React from 'react'
import './style.css'
import { withRouter } from 'react-router-dom'

export default withRouter((props) => {

  console.log(props.location.pathname);
  var cont =   <div className="footer">
                <div className="container">
                {//<img src={logo} alt="Logo" style={{height: "50px"}}></img>
                }
                <span className="pull-right">© OD 2019</span>

                </div>
              </div>;
  if(props.location.pathname.startsWith("/admin")) {
    return "";
  } else {
    return (cont);
  }
});