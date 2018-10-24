import * as React from "react";
import 'src/assets/css/Navbar.css'
import Fade from './Fade';

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
                <li><a href="#" className="menu-item">Kino Studyjne</a></li>
                <li><a href="#" className="menu-item">Repertuar</a></li>
                <li><a href="#" className="menu-item">Wydarzenia</a></li>
                <li><a href="#" className="menu-item">Newsy</a></li>
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