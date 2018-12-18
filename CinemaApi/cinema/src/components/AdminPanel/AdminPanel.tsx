import * as React from 'react';
import './AdminPanel.css';
import { NavLink } from 'react-router-dom';

export class AdminPanel extends React.Component<any, any>{
    public render(){
        return(
            <div>
                <h1 className="text-white text-center font-monte mt-4 mb-4 pb-4 border-b border-solid border-red">Panel Administracyjny</h1>
                <div className="links">
                <NavLink className="managment-btn btn-style" to="/MovieManagment" >
                     Filmy
                </NavLink>
                <NavLink className="managment-btn btn-style" to="/CulturalEventManagment" >
                     Wydarzenia
                </NavLink>
                <NavLink className="managment-btn btn-style" to="/NewsletterManagment" >
                     Newsletter
                </NavLink>
                </div>
            </div>
        
        )

        
    }
}