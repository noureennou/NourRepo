import React from "react";
import { useState } from "react";
import axios from "axios";
import OTPVerificationLogin from "./OTPVerificationLogin";
import Auth from "./Auth";
import LeftBanner from "./LeftBanner";
export default function Login(){

const [step, setStep] = useState("login"); 
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [country, setCountry] = useState("India");
  const[email,setEmail]=useState("");
  const[message,setMessage]=useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [loginId, setLoginId] = useState("");
  

  const handleSendOTP = async () => {
    setMessage('');
    setError('');

     const isEmail = loginId.includes("@");
    const payload = isEmail
      ? { email: loginId.trim() }
      : { phoneNumber: loginId.trim() };
    
    try {

      
       
      const response = await axios.post('http://localhost:8088/demo-service/otp_sendLogin', payload);

      if (response.data.status === 'OTP_SENT') {
        setMessage('OTP sent to your mobile number.');
        setStep("loginVerify");
      } else if (response.data.status === 'No account present') {
        setError('No account with this Id.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to send OTP. Please check your network.');
    }
  };
 const contact = email.trim() ? email : phoneNumber;
return(

   <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col md:flex-row items-center justify-center font-sans">
    <LeftBanner/>
{step === "login" && (
   <div className="w-full md:w-[150%] max-w-md p-12 bg-white shadow-xl rounded-xl">
      <button className="text-gray-400 text-2xl mb-4">←</button>
      <h2 className="text-2xl font-semibold mb-1"style={{textAlign:"center"}}>Sign In<span className="text-pink-600">K-SMART</span></h2>
      <h2 className="text-blue-1000 text-xl mb-4" style={{textAlign:"center"}}> Login</h2>
      <p className="text-gray-600 text-sm  mb-4" style={{textAlign:"center"}}>Please Enter your login details below</p>
<div className="mb-2">
        <label className="block text-gray-700 text-sm mb-1">Login Id</label>
        <input
          type="text"
          value={loginId}
           onChange={(e) => setLoginId(e.target.value)}
              placeholder="Phone number or Email"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        /></div>
      <div className="flex items-center space-x-4 mb-4">
        
        {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
        {message && <p className="text-green-500 text-xs mt-1">{message}</p>}

      </div>


      <button
        onClick={handleSendOTP}
        className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded"
      >
        Send OTP
      </button>

      <p className="text-sm text-center text-gray-600 mt-6">
        If you  dont have an account? <span className="text-black font-semibold cursor-pointer">Create Account</span>
      </p>
       <p className="text-sm text-center text-gray-600 mt-6">
       <span className="text-black font-semibold cursor-pointer">Forgot User ID?</span>
      </p>
  </div>
  
)}{(step === "loginVerify" ) && (
      <OTPVerificationLogin 
contact={loginId.trim()}
  phoneNumber={!loginId.includes("@") ? loginId.trim() : ""}
  email={loginId.includes("@") ? loginId.trim() : ""}
  countryType={country}
  mode="signin"



      />
    )}


</div>
)

}