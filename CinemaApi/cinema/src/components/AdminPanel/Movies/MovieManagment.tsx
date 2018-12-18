import * as React from 'react';
import Movies from './MoviesPanel'
import { NavLink } from 'react-router-dom';
import '../AdminPanel.css';

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
                <h1 className="text-white text-center font-monte mt-4 mb-4 pb-4 border-b border-solid border-red">Panel Filmów</h1>

                {/* <h2 className="text-white font-monte">Lista filmów:</h2> */}
                <div className="add-movie">
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