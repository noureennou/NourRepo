import { useState } from "react";
import AccountCreated from "./AccountCreated";
import { useNavigate } from "react-router-dom";
import Inbox from "./Inbox";
import axios from "axios";
import Login from "./Login";
import { ChakraProvider } from "@chakra-ui/react";


export default function OTPVerificationLogin({ 
  countryType,
  phoneNumber,
  email,
  mode,
  aadhaarNo,adhaarNo, contact}) {

    const [otp, setOtp] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [step, setStep] = useState("verify"); 
     const navigate = useNavigate();


     const handleVerify = async () => {
  setMessage("");
  setError("");

  try {
    const otpPayload = {
      ...(phoneNumber ? { phoneNumber } : { email }),
      otp,
    };
    const otpresponse = await axios.post(
      "http://localhost:8088/demo-service/otp_verify",
      otpPayload
    );

    const responseData = otpresponse.data;
    const verified =
      (typeof responseData === "string" &&
        responseData.trim().toLowerCase().includes("verified")) ||
      (responseData?.message &&
        responseData.message.trim().toLowerCase().includes("verified"));

    if (verified) {
      const payloadlogin = {
  countryType, // include this explicitly!
  ...(contact && contact.includes("@")
    ? { email: contact }
    : contact ? { phoneNumber: contact }
    : {}),
};

      console.log("Login payload:", payloadlogin);

      const signinResponse = await axios.post(
        "http://localhost:8088/demo-service/signin",
        payloadlogin
      );

      console.log("Signin response:", signinResponse.data);

      setStep("done");
      setMessage("Login Successfully!");
      navigate("/inbox" , { state: { phoneNumber, email } });
    } else {
      setError("Invalid OTP.");
    }
  } catch (err) {
    console.error("Error during verification:", err);
    setError("Verification failed.");
  }
};
         
      
    
  
    return (
      
   <div className="min-h-screen bg-gradient-to-br from-white to-gray-100 flex flex-col md:flex-row items-center justify-center font-sans">
     {step === "verify" ? (
    <div className="w-full md:w-[100%] max-w-md p-6 bg-white shadow-xl rounded-xl">
      <button className="text-gray-400 text-2xl mb-4">←</button>
      <h2 className="text-2xl font-semibold mb-1"style={{textAlign:"center"}}>Sign Up <span className="text-pink-600">K-SMART</span></h2>
      <h2 className="text-blue-1000 text-xl mb-4" style={{textAlign:"center"}}> Registration</h2>
      <p className="text-gray-600 text-sm  mb-4">To complete your registration, please fill in all the fields below</p>
   
      <div className="flex items-center space-x-4 mb-4">
        <label className="flex items-center space-x-2"style={{marginLeft:250}}>
          <input
            type="radio"
            name="country" 
            
          />
          <span >India</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="radio"
            name="country"
            
          />
          <span>Abroad</span>
        </label>
      </div>

      <div className="mb-2">
        <label className="block text-gray-700 text-sm mb-1">Enter OTP</label>
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="xxxxxx"
          className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-500"
        />
           <p className="text-red-600 text-sm mb-4">Please enter the OTP sent to your number</p>

      </div>

      <button
        onClick={handleVerify}
        className="mt-4 w-full bg-pink-600 hover:bg-pink-700 text-white font-semibold py-2 rounded"
      >
        Verify OTP
      </button>
      {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
      {message && <p className="text-green-600 text-sm mb-2">{message}</p>}
      <p className="text-sm text-center text-gray-600 mt-6">
        If you have an account? <span className="text-black font-semibold cursor-pointer">Login</span>
       </p>
      </div>
    
  ):(
<div className="text-center">
          <p className="text-xl font-semibold text-green-700 mb-4">Login Successfully!</p>
        </div>

    
)
}


</div>
);
}

   
         
   
  