import React,{Suspense} from "react";
import './layout.scss';
import {BrowserRouter as Router, redirect, Route, Routes} from 'react-router-dom';
import ScreenOne from "../component/screenOne";
import ScreenTwo from "../component/screenTwo";
import ScreenThree from "../component/screenThree";
function Layout (){
return(
    <div className="mainContainer">
        <Router>
            <Suspense fallback={"loading"}>
            <Routes>
                <Route path="/" element={<ScreenOne/>} />
                <Route path="/screen_one" element={<ScreenOne/>} />
                <Route path="/screen_two" element={<ScreenTwo/>} />
                <Route path="/screen_three" element={<ScreenThree/>} />
            </Routes>
            </Suspense>
        </Router>
    </div>
    
);
}

export default Layout;