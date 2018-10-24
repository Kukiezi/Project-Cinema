
import * as React from 'react';
import 'src/assets/css/App.css'
import Fade from './Fade';
import Footer from './Footer';
import Movies from './Movies'
import Navbar from './Navbar';
import Slider from './Slider';




class App extends React.Component<any, IState> {

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
      <Navbar/>
        <Slider/>
        <Fade>
        <p className="App-intro">
          DZISIAJ NA DUŻYM EKRANIE
        </p>
        </Fade>
    
        <Fade>
     <div className="Movie-list" id="Movie-list"> 
         
          {this.state.movies.map(movie => 
                        <Movies key={movie.id} movie={movie}/>)}
      </div>
      </Fade>
      <Footer footer={"2018"}/>
      </div>
    );
  }
}

export default App;
export interface IState {
  movies: IMovies[];
}

export interface IMovies {
  id: number,
  title: string,
  description: string,
  picuture: string
}