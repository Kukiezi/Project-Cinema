import * as React from "react";
import 'src/assets/css/Navbar.css'
// import Fade from './Fade';
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
      // <div className="Navbar">
      //   <div className="menu">
      //     <ul>
      //     <Fade>
      //     <li><NavLink to="/" className="menu-item">Kino Studyjne</NavLink></li>
      //     <li><NavLink to="/Repertuar"  className="menu-item">Repertuar</NavLink></li>
      //     <li><NavLink to="/Wydarzenia" className="menu-item">Wydarzenia</NavLink></li>
      //     <li><NavLink to="/Newsy" className="menu-item">Newsy</NavLink></li>
      //     </Fade>
      //  </ul>
      //   </div>

      // </div>
      <nav className="flex items-center justify-between flex-wrap .bg-black p-4">
       
        <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
          <div className="monte text-white text-center text-xl lg:flex-grow">
            <NavLink to="/" className="monte-bold text-white no-underline text-3xl tracking-tight text-center mr-20">Kino Studyjne</NavLink>
            <NavLink to="/Repertuar" className="block no-underline mt-4 lg:inline-block lg:mt-0 text-white mr-6">Repertuar</NavLink>
            <NavLink to="/Wydarzenia" className="block no-underline mt-4 lg:inline-block lg:mt-0 text-white mr-6">Wydarzenia</NavLink>
            <NavLink to="/Newsy" className="block mt-4 no-underline lg:inline-block lg:mt-0 text-white">Newsy</NavLink>
          </div>

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