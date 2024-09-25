// App.js
import React from 'react';
import Navbar from './components/Navbar'; 
import Footer from './components/Footer'; 
import { Route, Routes } from 'react-router-dom'; 
import Home from './components/Home';
import About from './components/About';
import ContactForm from './components/ContactForm';

const App = () => {
  return (
    <div className="absolute top-0 z-[-2] min-h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(560,119,198,0.3),rgba(255,255,255,0))]">
      <div className='ml-2 mr-2 md:mr-8 md:ml-8'> 
        <Navbar /> 
        <Routes> 
          <Route exact path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactForm />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
}

export default App;
