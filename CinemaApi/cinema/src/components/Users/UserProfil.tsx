import * as React from "react";
import './UserProfil.css';

export default class UserProfil extends React.Component{

    public render() {

        let user;
        const userStorage = localStorage.getItem("User");
        if (userStorage != null){
           user = JSON.parse(userStorage);
        }

        return(
            <div className="form">
                <div className="inner">
                    <div className="profile">
                        <div className="username">
                            {user.response.username}
                        </div>
                    </div>
                    <div className="menu">                        
                            <div className="menu-details">Dane</div>
                            <div className="menu-details">Rezerwacje</div>
                            <div className="menu-details">Wydarzenia</div>
                    </div> 
                     {/* <div className="info">
                     <label htmlFor="title" className="block text-sm font-bold ml-8 text-white">TYTUŁ</label>
                      <input onChange={this.onChange} placeholder="Podaj tytuł " defaultValue={this.state.movie.title} id="title" type="title" name="title" className="shadow appearance-none border rounded ml-8 mb-3 w-full py-2 px-3 text-grey-darker leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>                     */}
                </div>
            </div>
        );
    }
}