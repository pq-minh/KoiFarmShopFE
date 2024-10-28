// eslint-disable-next-line no-unused-vars
import React,{useState} from "react";
import Header from "../../component/header";
import KoiAssigment from "../koi-assigment/index";

const ServiceMenu = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (    
    <div>
    <Header setIsLoggedIn={setIsLoggedIn}/>
    <KoiAssigment/>   
    </div>
  );
};

export default ServiceMenu;
