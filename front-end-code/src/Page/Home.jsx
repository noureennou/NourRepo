import React from "react";
import { Link } from "react-router-dom";
import Registration from "./loginRegister/citizen/Components/Registration";
export default function Home(){
    return(
        <div class="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
     
        <nav className="navbar navbar-expand-lg navbar-light bg-light" style={{ marginTop: 0, paddingTop: 20,position:"fixed"}}>
        <div className="container-fluid" style={{ marginTop: 0, paddingTop: 0 ,textAlign:"right",width:1500,}}>
        
          <div className="d-flex -row reverse">
    
            <a className="nav-link" href="#"style={{padding:10,}}>Home</a>
            <Link className="text-pink-700 border border-pink-1000 rounded-full px-15 py-2 hover:bg-pink-200 " to="/registration" style={{ padding: 10 }}>
           Register
          </Link>
            <a className="text-pink-800 border border-pink-1000 rounded-full px-15 py-2 hover:bg-pink-200" style={{backgroundColor:"pink"}} href="login" style={{padding:10}}>Login</a>
          </div>
        </div>
      </nav>
 </div>

    )
}