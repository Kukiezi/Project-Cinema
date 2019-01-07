import * as React from "react";
// import { NavLink } from 'react-router-dom';


export default class UserOptions extends React.Component<any, any>{

public render() {
    let user;
    const userStorage = localStorage.getItem("User");
    if (userStorage != null){
       user = JSON.parse(userStorage);
    }
        return (
                <h3 className="user-options block mt-4 no-underline lg:inline-block lg:mt-0 text-white mr-6">{user.response.username}</h3>
           )
}


}
