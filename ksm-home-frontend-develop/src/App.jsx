import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Contact from './Page/Contact';
import Home from './Page/Home';
import Registration from './Page/loginRegister/citizen/Components/Registration';
import LeftBanner from './Page/loginRegister/citizen/Components/LeftBanner';
import OTPVerification from './Page/loginRegister/citizen/Components/OTPVerification';
import AccountCreated from './Page/loginRegister/citizen/Components/AccountCreated';
import Login from './Page/loginRegister/citizen/Components/Login';
import Auth from './Page/loginRegister/citizen/Components/Auth';
import OTPVerificationAdhaar from './Page/loginRegister/citizen/Components/OTPVerificationAdhaar';
import Inbox from './Page/loginRegister/citizen/Components/Inbox';


function App() {
  return (
    
    <div>
      
    
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/registration" element={<Registration/>} />
        <Route path='/auth'element={<Auth/>}/>
        <Route path='/LeftBanner' element={<LeftBanner/>}/>
        <Route path='/OTPVerification' element={<OTPVerification/>}/>
        <Route path='/accountCreated' element={<AccountCreated/>}/>
      <Route path="/login" element={<Login />} />
      <Route path="/auth" element={<Auth/>} />
     

      <Route path='/otpverificationAdhaar' element={<OTPVerificationAdhaar/>}/>

       <Route path='/inbox' element={<Inbox/>}/>
      </Routes>
    
    </BrowserRouter></div>

  );
}

export default App;
