import React, { useContext } from "react";
import Log from "../components/Log";
import { UidContext } from "../components/AppContext";
import UpdateProfil from "../components/Profil/UpdateProfil";
import LeftNav from "../components/LeftNav";
const Profil = () => {
  const uid = useContext(UidContext);
  return (
    <div >
      {uid ? (
        <div className="profil-page">
            <LeftNav />
        <UpdateProfil/>
        </div>
      ) : (
        // <div className="log-container">
          <Log signin={false} signup={true} />
          /* <div className="img-container">
            <img src="./img/log.svg" alt="img-log" />
          </div>
        </div> */
      )}
    // </div>
  );
};

export default Profil;
