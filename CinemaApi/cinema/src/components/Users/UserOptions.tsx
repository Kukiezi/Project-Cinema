import * as React from "react";
// import { NavLink } from 'react-router-dom';
import './DropdownMenu.css';
import { NavLink } from 'react-router-dom';


export default class UserOptions extends React.Component<any, any>{

constructor(props:any){
    super(props);

    this.state= {
        displayMenu: false,
    };

    this.showDropdownMenu = this.showDropdownMenu.bind(this);
    this.hideDropdownMenu = this.hideDropdownMenu.bind(this);
};

public logOut(){
    localStorage.removeItem("User");
    window.location.reload();
}

public showDropdownMenu(event: any) {

    event.preventDefault();
    this.setState({ displayMenu: true }, ()  => {
        document.addEventListener('click', this.hideDropdownMenu);
    });
}

public hideDropdownMenu(){

    this.setState({ displayMenu: false }, ()  => {
        document.removeEventListener('click', this.hideDropdownMenu);
    });
}

public render() {
    let user;
    const userStorage = localStorage.getItem("User");
    if (userStorage != null){
       user = JSON.parse(userStorage);
    }
        return (
            <div>
                <button className="user-options block  no-underline lg:inline-block lg:mt-0 text-white " onClick={this.showDropdownMenu}>Witaj, {user.response.username} &#11163;</button>
             
                {this.state.displayMenu ? (
                    <ul>
                        <li><NavLink to="/UserProfil" className="text-white">Mój profil</NavLink></li>
                        <li> <NavLink to='/' className="text-white" onClick={this.logOut}>Wyloguj</NavLink></li>
                    </ul>
                ):
            (null)
        }  
      
        </div>
        );
    }

}
