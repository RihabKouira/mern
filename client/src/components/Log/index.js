import React, { Fragment, useState } from "react";
import axios from "axios";

import {
  GlobalStyles,
  Head,
  Text,
  Span,
  Link,
  Input,
  Form,
  Container,
  FormContainer,
  SocialContainer,
  Button,
  OverlayContainer,
  OverlayPanel,
  Overlay,
} from "./styles/index.style";

const Log = () => {

  const [info, setInfo] = useState({
    // pseudo: "",
    email: "",
    password: "",
    // controlPassword: "",
  });
  const [panelActive, setPanelActive] = useState(false);
  const onSignInEvent = () => {
    setPanelActive(false);
  };

  const onSignUpEvent = () => {
    setPanelActive(true);
  };

  const handleChange = (e) => {
    e.preventDefault();
    setInfo({ ...info, [e.target.name]: e.target.value });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");

    axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/login`,
      withCredentials: true,
      data: {
        //email:email
        email: info.email,
        password: info.password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          emailError.innerHTML = res.data.errors.email;
          passwordError.innerHTML = res.data.errors.password;
        } else {
          window.location = "/";
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  //signUp
  const [formSubmit, setFormSubmit] = useState(false);
  const [infoRegister, setInfoRegister] = useState({
    pseudo: "",
    email: "",
    password: "",
   
  });
  const handleChangeRegister = (e) => {
    e.preventDefault();
    setInfoRegister({ ...infoRegister, [e.target.name]: e.target.value });
  };
  const handleRegister = async (e) => {
    e.preventDefault();
    // const terms = document.getElementById("terms");
    const pseudoRegisterError = document.querySelector(".pseudoRegister.error");
    const emailRegisterError = document.querySelector(".emailRegister.error");
    const passwordRegisterError = document.querySelector(".passwordRegister.error");
    // const passwordConfirmError = document.querySelector(
    //   ".password-confirm.error"
    // );
    // const termsError = document.querySelector(".terms.error");

    // passwordConfirmError.innerHTML = "";
    // termsError.innerHTML = "";

    // if (info.password !== info.controlPassword || !terms.checked) {
    //   if (info.password !== info.controlPassword)
    //     passwordConfirmError.innerHTML =
    //       "Les mots de passe ne correspondent pas";

    //   if (!terms.checked)
    //     termsError.innerHTML = "Veuillez valider les conditions générales";
    // } else {
    await axios({
      method: "post",
      url: `${process.env.REACT_APP_API_URL}api/user/register`,
      data: {
        pseudo: infoRegister.pseudo,
        email: infoRegister.email,
        password: infoRegister.password,
      },
    })
      .then((res) => {
        console.log(res);
        if (res.data.errors) {
          pseudoRegisterError.innerHTML = res.data.errors.pseudo;
          emailRegisterError.innerHTML = res.data.errors.email;
          passwordRegisterError.innerHTML = res.data.errors.password;
        } else {
        // setFormSubmit(true);
        setPanelActive(false);

        }
      })
      .catch((err) => console.log(err));
    // }
  };

  return (
    <div
      className="connection-form"
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "100px 0 100px",
        alignItems: "center",
      }}
    >
      {/* <GlobalStyles /> */}
      <Container
        id="container"
        className={`${panelActive ? "right-panel-active" : ""}`}
      >
         {!panelActive ? (
         <FormContainer className="sign-in-container">
          <div className="sign-in-container">

          {/* <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4> */}
          </div>
        </FormContainer>
      ) : (
        <FormContainer className="sign-up-container">
          <Form action="#" onSubmit={handleRegister}>
            <Head>Create Account</Head>
            <SocialContainer>
              <Link href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </Link>
              <Link href="#" className="social">
              <i className="fab fa-linkedin-in"></i>
              </Link>
            </SocialContainer>
            <Span>or use your email for registration</Span>
            <Input
              type="text"
              name="pseudo"
              id="pseudo"
              onChange={handleChangeRegister}
              placeholder="Name"
            />
            <div className="pseudoRegister error"></div>
           
            <Input
              type="text"
              name="email"
              id="email"
              onChange={handleChangeRegister}
              placeholder="Email"
            />
            <div className="emailRegister error"></div>
           
            <Input
              type="password"
              name="password"
              id="password"
              onChange={handleChangeRegister}
              placeholder="Password"
            />
            <div className="passwordRegister error"></div>
           

            <input type="submit" value="Valider inscription" />
          </Form>
        </FormContainer>)}
        <FormContainer className="sign-in-container">
          <Form action="#" onSubmit={handleLogin}>
            <Head>Sign In</Head>
            <SocialContainer>
              <Link href="#" className="social">
                <i className="fab fa-google-plus-g"></i>
              </Link>
              <Link href="#" className="social">
                <i className="fab fa-linkedin-in"></i>
              </Link>
            </SocialContainer>
            <Span>or use your account</Span>
            <Input
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
              placeholder="Email"
            />
            <div className="email error"></div>
            <br />
            <Input
              type="password"
              name="password"
              id="password"
              onChange={handleChange}
              placeholder="Password"
            />
            <Link href="#">Forgot your password?</Link>
            <div className="password error"></div>
            <br />
            <input type="submit" value="login" />
          </Form>
        </FormContainer>
        <OverlayContainer>
          <Overlay>
            <OverlayPanel
              className="overlay-left"
              style={{ backgroundColor: "rgba(255,255,255,0.5)" }}
            >
              <Head>Welcome Back!</Head>
              <Text>
                To keep connected with us please login with your personal info
              </Text>
              <Button className="ghost" id="signIn" onClick={onSignInEvent}>
                Sign In
              </Button>
            </OverlayPanel>
            <OverlayPanel
              className="overlay-right"
              style={{ backgroundColor: "rgba(255,255,255,0.3)" }}
            >
              <Head>Hello, Friend!</Head>
              <Text>Enter your personal details and start journey with us</Text>
              <Button className="ghost" id="signUp" onClick={onSignUpEvent}>
                Sign Up
              </Button>
            </OverlayPanel>
          </Overlay>
        </OverlayContainer>
      </Container>
    </div>
  );
};

export default Log

// import React from "react";
// import { useState } from "react";
// import SignInForm from "./SignInForm";
// import SignUpForm from "./SignUpForm";

// const Log = (props) => {
//   const [signUpModal, setSignUpModal] = useState(true);
//   const [signInModal, setSignInModal] = useState(false);

//   const handleModals = (e) => {
//     if (e.target.id === "register") {
//       setSignInModal(false);
//       setSignUpModal(true);
//     } else if (e.target.id === "login") {
//       setSignUpModal(false);
//       setSignInModal(true);
//     }
//   };
//   return (
//     <div className="connection-form">
//       <div className="form-container">
//         <ul>
//           <li
//             onClick={handleModals}
//             id="register"
//             className={signUpModal ? "active-btn" : null}
//           >
//             S'inscrire
//           </li>
//           <li
//             onClick={handleModals}
//             id="login"
//             className={signInModal ? "active-btn" : null}
//           >
//             Se connecter
//           </li>
//         </ul>
//         {/* /* //si signUpModal true : affiche signUpModal and SignUpForm */}
//         {signUpModal && <SignUpForm />}
//         {/* //si signInModal true : affiche signInModal and SignInForm */}
//         {signInModal && <SignInForm />}
//       </div>
//     </div>
//   );
// };

// export default Log
