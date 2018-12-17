import * as React from "react";
import './Navbar.css'

import Fade from '../App/Fade';
import { NavLink } from 'react-router-dom';
import Registration from '../Users/Registration';
import Login from '../Users/Login';

class Navbar extends React.Component<any, IState>{

  public state: IState = {
    "user": []
  };

  constructor(props: IState) {
    super(props);
  }

  public render() {

    return (

      <nav className="flex items-center justify-between flex-wrap .bg-black p-4">
       
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <Fade>
          <div className="monte text-white text-center text-xl lg:flex-grow">
            <NavLink to="/" className="monte-bold text-white no-underline text-3xl tracking-tight text-center mr-20">Kino Studyjne</NavLink>
            <NavLink to="/Repertuar" className="block no-underline mt-4 lg:inline-block lg:mt-0 text-white mr-6">Repertuar</NavLink>
            <NavLink to="/Events" className="block no-underline mt-4 lg:inline-block lg:mt-0 text-white mr-6">Wydarzenia</NavLink>
            <NavLink to="/AdminPanel" className="block mt-4 no-underline lg:inline-block lg:mt-0 text-white">Administracja</NavLink>
            <Registration/>
            <Login/>
           
          </div>
          </Fade>
        </div>
      </nav>

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