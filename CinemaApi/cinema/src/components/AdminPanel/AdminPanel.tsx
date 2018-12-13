import * as React from 'react';
import './AdminPanel.css';
import { NavLink } from 'react-router-dom';

export class AdminPanel extends React.Component<any, any>{
    public render(){
        return(
            <div>
                <h2 className="font-monte">Panel Administracyjny</h2>
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