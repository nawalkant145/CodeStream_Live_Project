// import React from "react";

import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Home'
import { Toaster } from 'react-hot-toast';
import EditorPage from './EditorPage';

function App() {


  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: '#4aed88',
              },
            },
          }}
        ></Toaster>
      </div>


      
      <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home />}></Route>
                    <Route
                        path="/editor/:roomId"
                        element={<EditorPage />}
                    ></Route>
                </Routes>
            </BrowserRouter>
           
    </>
  );
}

export default App;
