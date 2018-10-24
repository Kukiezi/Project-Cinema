import * as React from "react";
import 'src/assets/css/App.css'
export default class Footer extends React.Component<any, any>{

public currentDate(){
    return new Date();
}

public render() {

        return (
            <footer id="foot">
 
            <p>&copy; {this.props.footer} - Kino Studyjne</p>
            </footer>
           )
}


}
