import * as React from "react";

export default class Logout extends React.Component<any, any>{


    public logOut(){
        localStorage.removeItem("User");
        window.location.reload();
    }

public render() {
  
        return (
                <button onClick={this.logOut} className="user-options color-grey block mt-4 no-underline lg:inline-block lg:mt-0 text-white mr-6"><h4 >Logout</h4></button>
           )
}


}
