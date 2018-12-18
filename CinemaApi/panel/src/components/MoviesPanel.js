import React from "react";
import '../assets/css/App.css';
import { NavLink } from 'react-router-dom';


export default class MoviesPanel extends React.Component{



 render() {

        return (
            <div className="img__wrap">
            <div className="movie-picture">
           
            <img src={this.props.movie.icon} alt=""/>
            </div>
         
         
           
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
             <p className="desc_layer2">Usuń</p> 
             </NavLink>
             </div>
             <p className="text-white"> {this.props.movie.title}</p>
             </div>
           )
}


}
