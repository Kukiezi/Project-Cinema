import * as React from 'react';
import 'src/assets/css/Details.css';
import 'src/assets/css/Spinner.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { NavLink } from 'react-router-dom';
// import Fade from './Fade';
import '../../Movies/Rating.css'

class DetailsPanel extends React.Component<any, IState> {

  public state: IState = {
    "movie": {
      "id": 0,
      "title": "",
      "description": "",
      "picture": "",
      "rating": 0
    }
  };

  constructor(props: IState) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
  }

  public async componentDidMount() {
    const { Id } = this.props.match.params;
    // const { movie } = this.props.location.state
    const result = await fetch('https://localhost:44371/cinema/GetMovie?id=' + Id);
    const movie = await result.json();
  
    this.setState({
      movie
    });
  }

  public onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const movieCopy = JSON.parse(JSON.stringify(this.state.movie));
    movieCopy[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ movie: movieCopy});
}

public async updateMovie(){
   await fetch('https://localhost:44371/cinema/UpdateMovie?id=' + this.state.movie.id + '&title=' + this.state.movie.title + '&description=' + this.state.movie.description + '&picture=' + this.state.movie.picture, {
        method: 'POST'
      });
}

  public render() {
    
    return (
       
        <div className="login-form-inner">
            <h1 className="text-white text-center font-monte">Edytuj film</h1>
       
                <div className="form-item">
                    <label htmlFor="title" className="block text-sm font-bold mb-2 text-white">TYTUŁ</label>
                    <input onChange={this.onChange} placeholder="Podaj tytuł " defaultValue={this.state.movie.title} id="title" type="title" name="title" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                </div>
                <div className="form-item">
                    <label htmlFor="description" className="block text-sm font-bold mb-2 text-white">OPIS</label>
                    <input onChange={this.onChange}  placeholder="Podaj hasło " defaultValue={this.state.movie.description} id="description" type="description" name="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                </div>
                <div className="form-item">
                    <label htmlFor="picture" className="block text-sm font-bold mb-2 text-white">ZDJĘCIE</label>
                    <input onChange={this.onChange} placeholder="Podaj link do zdjęcia " defaultValue={this.state.movie.picture} id="picture" type="picture" name="picture" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                </div>
                <div className="text-center pt-4">
                    <button onClick={this.updateMovie} className="button bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Zapisz zmiany</button>
                </div>
         </div>
    );
  }
}

export default DetailsPanel;
export interface IState {
  movie: IMovie,
}
export interface IMovie {
  id: number,
  title: string,
  description: string,
  picture: string,
  rating: number
}
