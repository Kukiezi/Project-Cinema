import * as React from "react";
import 'src/assets/css/App.css'
import { NavLink } from 'react-router-dom';


export default class MoviesPanel extends React.Component<any, any>{



public render() {

        return (
            <div className="img__wrap">
            <div className="movie-picture">
            <img src={this.props.movie.icon}/>
            </div>
         
            {/* <img src={image} width="203.66px" height="300.89px"/> */}
           
                <div className="img__description_layer">
                <NavLink to={{
                pathname: 'DetailsPanel/'+this.props.movie.id,
                state: {
                  movie: this.props.movie
                }
              }}style={{ textDecoration: 'none' }}>
             <p className="desc_layer">Zarządzaj</p> 
             </NavLink>
             <NavLink to={{
                pathname: 'DeleteMovie/'+this.props.movie.id,
                state: {
                  movie: this.props.movie
                }
              }}style={{ textDecoration: 'none' }}>
             <p className="desc_layer">Usuń</p> 
             </NavLink>
             </div>
             <p> {this.props.movie.title}</p>
             </div>
           )
}


}
