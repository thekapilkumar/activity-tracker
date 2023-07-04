import React from 'react'
import './login.css'
import logo from '../images/logo.svg'
import brandname from '../images/brandname.png'


const Login = () => {
  return (
    <div id="loginPage">

    <div id="loginBody">

        <div id="firstPart">

            <img src={logo} alt="innova Logo" id="innovaLogo" />

            <h1>Welcome to Activity Tracker </h1>

            <h5 className="opacity">Login to Your Account with SSO.</h5>

            <button  id="loginButton">

                <span id="login"> Login via INNOVA SSO </span>

               

            </button>

            {/*  <p className='opacity'>Trouble Signing? <a href="#">Reach Support</a></p> */}

        </div>

        <div id="customerImage">

           

            <img src={brandname} alt="image" id="loginemp" />

       

        </div>

    </div>


</div>
  )
}

export default Login