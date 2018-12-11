import * as React from 'react';
import 'src/assets/css/AdminPanel.css';
import { NavLink } from 'react-router-dom';

export class AdminPanel extends React.Component<any, any>{
    public render(){
        return(
            <div>
                <h1 className="text-white text-center font-monte">Panel Administracyjny</h1>
                <NavLink className="buy-btn" to="/MovieManagment" >
                     Zarządzaj filmami
                </NavLink>
            </div>
        
        )

        
    }
}