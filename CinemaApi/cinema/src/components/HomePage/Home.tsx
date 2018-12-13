import * as React from 'react';
import 'src/assets/css/App.css'
import Fade from '../App/Fade';
import Movies from '../Movies/Movies'
import Slider from './Slider';


class Home extends React.Component<any, IState> {

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
   
  public render() {
    return (
      
      <div className="App">
        
        <Fade>
        <Slider/>
        </Fade>
        <Fade>
        <p className="p-8 App-intro">
          DZISIAJ NA DUŻYM EKRANIE
        </p>
      
        </Fade>
    
        <Fade>
     <div className="Movie-list" id="Movie-list"> 
         
          {this.state.movies.map(movie => 
                        <Movies key={movie.id} movie={movie}/>)}
      </div>
      </Fade>

      </div>
    );
  }
}

export default Home;
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