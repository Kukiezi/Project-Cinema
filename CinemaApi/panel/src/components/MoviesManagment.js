import React from 'react';
import Movies from './MoviesPanel'
import { NavLink } from 'react-router-dom';


export default class MovieManagment extends React.Component{


    
    constructor(props) {
        super(props);
       
        this.state = {   movies: []};
    }

     async componentDidMount() {
        const result = await fetch('https://localhost:44371/cinema/GetMovies');
        const movies = await result.json();
      
        this.setState({ movies });
        
      }

     render(){
        
        return(
            <div>
                <h1 className="text-white text-center font-monte mt-4 mb-4 pb-4 border-b border-solid border-red">Panel Filmów</h1>

                {/* <h2 className="text-white font-monte">Lista filmów:</h2> */}
                <div className="add-movie">
                    <NavLink className="add-btn btn-style" to="/AdminPanel" >
                    &laquo; Powrót
                    </NavLink>
                    <NavLink className="add-btn btn-style" to="/AddMovie" >
                        Dodaj film
                    </NavLink>
                </div>
              
                
                <div className="Movie-list" id="Movie-list"> 
         
                   {this.state.movies.map(movie => 
                             <Movies key={movie.id} movie={movie}/>)}
                </div>

            </div>
        
        )

        
    }
}
