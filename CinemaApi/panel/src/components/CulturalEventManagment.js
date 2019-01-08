import React from 'react';
import { NavLink } from 'react-router-dom';
import 'src/assets/css/App.css'

export default class CulturalEventManagment extends React.Component{

    render(){

        return(

            <div>
                <div className="add-event">
                    <NavLink className="add-btn btn-style" to="/AdminPanel" >
                        &laquo; Powrót
                    </NavLink>
                </div>
            </div>
        )
        
    }
}