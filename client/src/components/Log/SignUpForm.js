import React, { useState } from "react";
import axios from "axios";
import SignInForm from "./SignInForm";

const SignUpForm = () => {
  const [formSubmit, setFormSubmit] = useState(false);
  const [info, setInfo] = useState({
    pseudo: "",
    email: "",
    password: "",
    controlPassword: "",
  });

  const handleChange = (e) => {
    e.preventDefault();
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const terms = document.getElementById("terms");
    const pseudoError = document.querySelector(".pseudo.error");
    const emailError = document.querySelector(".email.error");
    const passwordError = document.querySelector(".password.error");
    const passwordConfirmError = document.querySelector(
      ".password-confirm.error"
    );
    const termsError = document.querySelector(".terms.error");

    passwordConfirmError.innerHTML = "";
    termsError.innerHTML = "";

    if (info.password !== info.controlPassword || !terms.checked) {
      if (info.password !== info.controlPassword)
        passwordConfirmError.innerHTML =
          "Les mots de passe ne correspondent pas";

      if (!terms.checked)
        termsError.innerHTML = "Veuillez valider les conditions générales";
    } else {
      await axios({
        method: "post",
        url: `${process.env.REACT_APP_API_URL}api/user/register`,
        data: {
          pseudo: info.pseudo,
          email: info.email,
          password: info.password,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.errors) {
            pseudoError.innerHTML = res.data.errors.pseudo;
            emailError.innerHTML = res.data.errors.email;
            passwordError.innerHTML = res.data.errors.password;
          } else {
            setFormSubmit(true);
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      {formSubmit ? (
        <>
          <SignInForm />
          <span></span>
          <h4 className="success">
            Enregistrement réussi, veuillez-vous connecter
          </h4>
        </>
      ) : (
        <form action="" onSubmit={handleRegister} id="sign-up-form">
          <label htmlFor="pseudo">Pseudo</label>
          <br />
          <input
            type="text"
            name="pseudo"
            id="pseudo"
            onChange={handleChange}
            // value={pseudo}
          />
          <div className="pseudo error"></div>
          <br />
          <label htmlFor="email">Email</label>
          <br />
          <input
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            // value={email}
          />
          <div className="email error"></div>
          <br />
          <label htmlFor="password">Mot de passe</label>
          <br />
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleChange}
            // value={password}
          />
          <div className="password error"></div>
          <br />
          <label htmlFor="password-conf">Confirmer mot de passe</label>
          <br />
          <input
            type="password"
            name="controlPassword"
            id="password-conf"
            onChange={handleChange}
            // value={controlPassword}
          />
          <div className="password-confirm error"></div>
          <br />
          <input type="checkbox" id="terms" />
          <label htmlFor="terms">
            J'accepte les{" "}
            <a href="/" target="_blank" rel="noopener noreferrer">
              conditions générales
            </a>
          </label>
          <div className="terms error"></div>
          <br />
          <input type="submit" value="Valider inscription" />
        </form>
      )}
    </>
  );
};

export default SignUpForm;

// import React, { useState } from "react";
// import axios from "axios";
// import SignInForm from './SignInForm'

// const SignUpForm = () => {
//   const [formSubmit, setFormSubmit] = useState(false);

//   const [info, setInfo] = useState({
//     pseudo: "",
//     email: "",
//     password: "",
//     controlPassword: "",
//   });

//   const handleChange = (e) => {
//     e.preventDefault();
//     setInfo({ ...info, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async (e) => {
//     e.preventDefault();
//     const terms = document.getElementById("terms");
//     const pseudoError = document.querySelector(".pseudo.error");
//     const emailError = document.querySelector(".email.error");
//     const passwordError = document.querySelector(".password.error");
//     const passwordConfirmError = document.querySelector(
//       ".password-confirm.error"
//     );
//     const termsError = document.querySelector(".terms.error");

//     passwordConfirmError.innerHTML = "";
//     termsError.innerHTML = "";

//     if (
//       info.password  !==
//        info.controlPassword ||
//       !terms.checked
//     ) {
//       if (
//          info.password  !==  info.controlPassword
//       )
//         passwordConfirmError.innerHTML =
//           "Les mots de passe ne correspondent pas";

//       if (!terms.checked)
//         termsError.innerHTML = "Veuillez valider les conditions générales";
//     } else {
//         await axios({
//         methode: "post",
//         url: `${process.env.REACT_APP_API_URL}api/user/register`,
//         data : {
//           pseudo: info.pseudo,
//           email: info.email,
//           password: info.password,
//         },
//       })
//       .then((res) => {
//         console.log(res);
//         if (res.data.errors) {
//           pseudoError.innerHTML = res.data.errors.pseudo;
//           emailError.innerHTML = res.data.errors.email;
//           passwordError.innerHTML = res.data.errors.password;
//         } else {
//           setFormSubmit(true);
//         }
//       })
//       .catch((err) => console.log(err));
//     }
//   };
//   return (
//     <>
//       <form action="" onSubmit={handleRegister} id="sign-up-form">
//         <label htmlFor="pseudo">Pseudo</label>
//         <br />
//         <input
//           type="text"
//           name="pseudo"
//           id="pseudo"
//           onChange={handleChange}
//           // value={pseudo}
//         />
//         <div className="pseudo error"></div>
//         <br />
//         <label htmlFor="email">Email</label>
//         <br />
//         <input
//           type="text"
//           name="email"
//           id="email"
//           onChange={handleChange}
//           // value={email}
//         />
//         <div className="email error"></div>
//         <br />
//         <label htmlFor="password">Mot de passe</label>
//         <br />
//         <input
//           type="password"
//           name="password"
//           id="password"
//           onChange={handleChange}
//           // value={password}
//         />
//         <div className="password error"></div>
//         <br />
//         <label htmlFor="password-conf">Confirmer mot de passe</label>
//         <br />
//         <input
//           type="password"
//           name="controlPassword"
//           id="password-conf"
//           onChange={handleChange}
//           // value={controlPassword}
//         />
//         <div className="password-confirm error"></div>
//         <br />
//         <input type="checkbox" id="terms" />
//         <label htmlFor="terms">
//           J'accepte les{" "}
//           <a href="/" target="_blank" rel="noopener noreferrer">
//             conditions générales
//           </a>
//         </label>
//         <div className="terms error"></div>
//         <br />
//         <input type="submit" value="Valider inscription" />
//       </form>
//     </>
//   );
// };

// export default SignUpForm;
