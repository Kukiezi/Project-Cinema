import * as React from "react";
import 'src/assets/css/App.css'
import { NavLink } from 'react-router-dom';


export default class Movies extends React.Component<any, any>{



public render() {

        return (
            <div className="img__wrap">
            <img src={this.props.movie.picture} width="203.66px" height="300.89px"/>
            {/* <img src={image} width="203.66px" height="300.89px"/> */}
              <NavLink to={{
                pathname: 'Details/'+this.props.movie.id,
                state: {
                  movie: this.props.movie
                }
              }}>
                <div className="img__description_layer">
         
             <p> {this.props.movie.description}</p> 
             </div></NavLink>
             <p> {this.props.movie.title}</p>
             </div>
           )
}


}
