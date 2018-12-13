import * as React from "react";
import 'src/assets/css/App.css'
import { NavLink } from 'react-router-dom';


export default class Movies extends React.Component<any, any>{



public render() {

        return (
            <div className="img__wrap">
            <div className="movie-picture">
            <img src={this.props.movie.icon}/>
            </div>
         
            {/* <img src={image} width="203.66px" height="300.89px"/> */}
              <NavLink to={{
                pathname: 'Details/'+this.props.movie.id,
                state: {
                  movie: this.props.movie
                }
              }}>
                <div className="img__description_layer">
         
             <p>Więcej Informacji</p> 
             </div></NavLink>
             <p> {this.props.movie.title}</p>
             </div>
           )
}


}
