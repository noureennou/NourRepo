import React from "react";
import axios from "axios";
import { useState } from "react";
import OTPVerification from "./OTPVerification";
import OTPVerificationAdhaar from "./OTPVerificationAdhaar";
export default function Auth({contact,userId}){

const [step,setStep]=useState("auth");
const [aadhaarNo,setAadhaarNo]=useState ("")
const [error, setError] = useState(null);       
const [message, setMessage] = useState(null);
  const [aadhaarNumber, setAadhaarNumber] = useState("");

  
 const handleSendOTP = async () => {

setMessage('');
    setError('');
     console.log(userId);
     if (!/^\d{12}$/.test(aadhaarNo)) {
    setError('Please enter a valid 12-digit Aadhaar number.');
    return;
  }
    
    try {
      const response = await axios.post('http://localhost:8088/demo-service/otp_sendAdhaar', {
        aadhaarNo
    
      });

      if (response.data.status === 'OTP_SENT') {
        setMessage('OTP sent to your mobile number.');
        setStep("verifyUid");
      } else if (response.data.status === 'ADHAAR ALready Exist') {
        setError('Adhaar Number Alrady Exist.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to send OTP. Please check your network.');
    }
  

 }
    return(
    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col md:flex-row items-center justify-center font-sans">
    {step === "auth" && (
       <div className="w-full md:w-[150%] max-w-md p-12 bg-white shadow-xl rounded-xl">
          <button className="text-gray-400 text-2xl mb-4">←</button>
          <h2 className="text-2xl font-semibold mb-1"style={{textAlign:"center"}}>Verification <span className="text-pink-600">KYC</span></h2>
          
          <p className="text-gray-600 text-sm  mb-4" style={{textAlign:"center"}}>confirming your identy to ensure security,trust,and smooth experience</p>
    <div className="mb-2">
            <label className="block text-gray-700 text-sm mb-1">Adhaar Number</label>
            <input
              type="text"
              value={aadhaarNo}
              onChange={(e) => setAadhaarNo(e.target.value)}
              placeholder="XXXXXXXXXX"
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
            Get OTP
          </button>
    
          <p className="text-sm text-center text-gray-600 mt-6">
            I don't have Adhaar <span className="text-black font-semibold cursor-pointer">Click Here</span>
          </p>
           
      </div>
      
    )}{step === "verifyUid" && (
  <OTPVerificationAdhaar 
    adhaarNo={aadhaarNo}
  contact=  {contact}
  userId={userId}
   
  />)}
    </div>
    )
    
    }


