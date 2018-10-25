import * as React from "react";
import 'src/assets/css/Navbar.css'
import Fade from './Fade';
import { NavLink } from 'react-router-dom';

class Navbar extends React.Component<any, IState>{

  public state: IState = {
    "user": []
};

constructor(props: IState) {
  super(props);
} 

public render() {

        return (
            <div className="Navbar">
              <div className="menu">
                <ul>
                <Fade>
                <li><NavLink to="/" className="menu-item">Kino Studyjne</NavLink></li>
                <li><NavLink to="/Repertuar"  className="menu-item">Repertuar</NavLink></li>
                <li><NavLink to="/Wydarzenia" className="menu-item">Wydarzenia</NavLink></li>
                <li><NavLink to="/Newsy" className="menu-item">Newsy</NavLink></li>
                </Fade>
             </ul>
              </div>
            
            </div>

           )
}

}

export default Navbar;

export interface IState {
  user: IUser[];
}

export interface IUser {
  id: number,
  username: string
}