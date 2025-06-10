
import React from "react";
import peopleImage from "../../../../assets/people.png";
import govtlogo from "../../../../assets/govtOfKerala.png";
import { useState,useEffect} from 'react';
import axios from 'axios'
import OTPVerification from "./OTPVerification";
import { Link } from "react-router-dom";

export default function Registration() {
  const [step, setStep] = useState("send"); 
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState("");
  const [country, setCountry] = useState("India");
  const[email,setEmail]=useState("");
  const[message,setMessage]=useState("");
  const [otpSent, setOtpSent] = useState(false);


   const handleSendOTP = async () => {
    setMessage('');
    setError('');
    if (country === "India" && !/^\d{0,10}$/.test(phoneNumber)) {
  setError("Please enter a valid 10-digit phone number.");
  return;
}

    try {
      const response = await axios.post('http://localhost:8088/demo-service/otp_send',{
        phoneNumber, email ,countryType:country === "Abroad"
      
      });

     if  (response.data.status === 'OTP_SENT')  {
        setMessage('OTP sent to your mobile number.');
        setStep("verify");
      } else if (response.data.status === 'ALREADY_REGISTERED') {
        setError('Phone number already present.');
      } else {
        setError('Something went wrong. Please try again.');
      }
    } catch (err) {
      setError('Failed to send OTP. Please check your network.');
    }
  };

  return(

    <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col md:flex-row items-center justify-center font-sans">
    {/* Left Panel */}
    <div className="hidden md:flex flex-col items-center justify-center w-1/2 p-10 text-center">
      <img
        src={govtlogo}
        alt="Kerala Seal"
        className="h-12 mb-4"
      />
      <h2 className="text-gray-700 text-lg mb-2">Welcome to</h2>
      <h1 className="text-4xl font-bold mb-4">
        <span className="text-pink-600">K</span>
        <span className="text-blue-600">✔</span>
        <span className="text-blue-800">smart</span>
      
      </h1>
      <img 
      src={peopleImage}
        alt="Office people"
        className="rounded-md mt-2 shadow-md"
      />
      <p className="text-gray-500 mt-6 text-sm">
        One integrated platform for all the services you need
      </p>
      <p className="text-xs text-gray-400 mt-10">
        Copyright © 2024, Ksuite, Government of Kerala. | Designed & Developed by Information Kerala Mission
      </p>
     
    </div>

    {step === "send" ? (
    <div className="w-full md:w-1/3 p-6 md:p-12 bg-white shadow-xl rounded-xl">
      <button className="text-gray-400 text-2xl mb-4">←</button>
      <h2 className="text-2xl font-semibold mb-1"style={{textAlign:"center"}}>Sign Up <span className="text-pink-600">K-SMART</span></h2>
      <h2 className="text-blue-1000 text-xl mb-4" style={{textAlign:"center"}}> Registration</h2>
      <p className="text-gray-600 text-sm  mb-4">To complete your registration, please fill in all the fields below</p>

      <div className="flex items-center space-x-4 mb-4">
        <label className="flex items-center space-x-2"style={{marginLeft:250}}>
          <input
            type="radio"
            name="country" 
            checked={country === "India"}
            onChange={() => setCountry("India")}
          />
          <span >India</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="country"
            checked={country === "Abroad"}
            onChange={() => setCountry("Abroad")}
          />
          <span>Abroad</span>
        </label>
      </div>

      <div className="mb-2">
        <label className="block text-gray-700 text-sm mb-1">{country === "India" ? "Mobile Number" : "Email ID"}</label>

 
        <input
          type="text"
          value={country === "India" ? phoneNumber : email}
  onChange={(e) =>
    country === "India"
      ? setPhoneNumber(e.target.value)
      : setEmail(e.target.value)

  }
   placeholder={country === "India" ? "XXXXXXXXXX" : "example@email.com"}
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
        


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
  If you have an account?{" "}
  <Link to="/login" className="text-black font-semibold hover:underline">
    Login
  </Link>
</p>
    </div>
    ):(

      <OTPVerification 

      contact={country === "India" ? phoneNumber : email}
      countryType={country === "Abroad"}
      phoneNumber={phoneNumber}
      email={email}
      />
      )}

    </div>

  )

    }
  


  
  