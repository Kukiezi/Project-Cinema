import React from 'react';
import '../assets/css/App.css';
import { NavLink } from 'react-router-dom';

export default class AdminPanel extends React.Component{
     render(){
        return(
            <div className="align-content: center">
                <h1 className="text-white text-center font-monte mt-4 mb-4 pb-4 border-b border-solid border-red">Panel Administracyjny</h1>
                <div className="links">
                    <NavLink className="managment-btn btn-style" to="/MovieManagment" >
                         Filmy
                    </NavLink>
                    <NavLink className="managment-btn btn-style" to="/CulturalEventManagment" >
                         Wydarzenia
                    </NavLink>
                    
                </div>
            </div>
        
        )

        
    }
}