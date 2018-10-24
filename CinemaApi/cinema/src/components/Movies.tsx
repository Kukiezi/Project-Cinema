import * as React from "react";
import 'src/assets/css/App.css'
export default class Movies extends React.Component<any, any>{

public render() {

        return (
            <div className="img__wrap">
            <img src={this.props.movie.picture} width="203.66px" height="300.89px"/>
              <a href="#"><div className="img__description_layer">
         
             <p> {this.props.movie.description}</p> 
             </div></a>
             <p> {this.props.movie.title}</p>
             </div>
           )
}


}
