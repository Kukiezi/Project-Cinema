import * as React from 'react';
import Movies from './MoviesPanel'
import { NavLink } from 'react-router-dom';

export class MovieManagment extends React.Component<any, IState>{

    public state: IState = {
        "movies": []
    };
    
    constructor(props: IState) {
      super(props);
    
    } 

    public async componentDidMount() {
        const result = await fetch('https://localhost:44371/cinema/GetMovies');
        const movies = await result.json();
      
        this.setState({ movies });
      }

    public render(){
        
        return(
            <div>
                <h1 className="text-white text-center font-monte">Panel Filmów</h1>

                <h2 className="text-white font-monte">Lista filmów:</h2>
                <div className="Movie-list" id="Movie-list"> 
         
                   {this.state.movies.map(movie => 
                             <Movies key={movie.id} movie={movie}/>)}
                </div>
                <NavLink className="mm-btn" to="/AddMovie" >
                     Dodaj film
                </NavLink>
            </div>
        
        )

        
    }
}

export interface IState {
    movies: IMovies[]
  }
  
  export interface IMovies {
    id: number,
    title: string,
    description: string,
    picuture: string,
    icon: string,
    genre: string,
    watchingTime: string,
    director: string,
    
  }