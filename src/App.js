
import React from 'react';
import Home from './screens/Home';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Login from './screens/Login';
import '../node_modules/bootstrap-dark-5/dist/css/bootstrap-dark.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Signup from './screens/Signup.js';
import { CartProvider } from './components/ContextReducer.js';
import MyOrder from './screens/MyOrder.js';
import ServicesPage from './components/ServicesPage.js';
import LearnMore from './components/LearnMore.js';

function App() {
  return (
    <CartProvider>
    <Router>
      <div>
        <Routes>
          <Route exact path="/" element={<Home/>} />
          <Route exact path="/Login" element={<Login/>} />
          <Route exact path="/createuser" element={<Signup/>}/>
          <Route exact path="/myOrder" element={<MyOrder/>}/>
          <Route exact path="/services" element={<ServicesPage/>} />
          <Route exact path="/learnmore" element={<LearnMore/>} />
          
        </Routes>
      </div>
    </Router>
    </CartProvider>
  );
}

export default App;

//components-->components are the building blocks of react application that represent a part of user interface
//reusability&nested
//passing properties
//types of components-->Stateless functional components and Stateful Class Components
//