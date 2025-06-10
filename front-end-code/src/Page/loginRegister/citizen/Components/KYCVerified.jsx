import React, { useState } from "react";

import Login from "./Login";
import Auth from "./Auth";

export default function KYCVerified({ contact }){
 const [step, setStep] = useState("kycverified");
const[phoneNumber ,setPhoneNumber]=useState("");




return(
<div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col md:flex-row items-right justify-center font-sans">

{ step==="kycverified" && (
<div className="w-full md:w-[100%] max-w-md p-6 bg-white shadow-xl rounded-xl"style={{marginTop:"25%",marginBottom:"25%"}}>
      <button className="text-gray-400 text-2xl mb-4">←</button>
      <h2 className="text-2xl font-semibold mb-1"style={{textAlign:"center"}}>Sign Up <span className="text-pink-600">K-SMART</span></h2>
      <h2 className="text-blue-1000 text-xl mb-4" style={{textAlign:"center"}}> Registration</h2>
      <p className="text-gray-600 text-sm  mb-4">To complete your registration, please fill in all the fields below</p>
   
      <div className="flex items-center justify-center">
      <div className="w-10 h-10 rounded-full bg-green-500 shadow-lg"></div>
    </div>
    <div className=" items-center justify-center">
    <h4 className="text-lg font-semibold text-blue-800 mb-2-center">KYC Verified</h4>   </div>
      <p className="text-gray-600 text-sm mb-2">
        You are about to begin the KYC verification process. This will require you to provide personal information and upload documents.
      </p>
      <div className="flex items-center justify-center">
      <p className="text-sm text-gray-800 mt-2">
        <span className="font-semibold text-black">User ID :</span> <span className="text-blue-600">{contact}</span>
      </p>
      </div>
      <button
      
        className="mt-6 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded"onClick={()=>setStep("login")}
      >
        Proceed 
      </button>

      <p className="text-sm text-center text-gray-600 mt-6">
        If you have an account? <span className="text-black font-semibold cursor-pointer" onClick={() => setStep("login")}>Login</span>
      </p> 
        </div>
)}:

{step==="login" &&(
  <Login contact={contact} />
)}
  
      
      </div>
  
)
}