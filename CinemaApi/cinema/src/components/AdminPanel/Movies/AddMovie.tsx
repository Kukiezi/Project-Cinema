import * as React from 'react';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { NavLink } from 'react-router-dom';
// import Fade from './Fade';


export class AddMovie extends React.Component<any, IState> {
    public state: IState = {
        "movie": {
          "id": 0,
          "title": "",
          "description": "",
          "picture": "",
          "ageRestriction": 0,
          "icon": "",
          "genre": "",
          "director": "",
          "watchingTime": "",
          "rating": 0
        }
      };
    
      constructor(props: IState) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.addMovies = this.addMovies.bind(this);
      }

      public onChange = (e: React.FormEvent<HTMLInputElement>) => {
        const movieCopy = JSON.parse(JSON.stringify(this.state.movie));
        if (e.currentTarget.name === "ageRestriction"){
            movieCopy[e.currentTarget.name] = +e.currentTarget.value;
        }
        else{
            movieCopy[e.currentTarget.name] = e.currentTarget.value;
        }
        
        this.setState({ movie: movieCopy});
    }

    // public async addMovie(){
    //     await fetch('https://cinemaapi.azurewebsites.net/cinema/AddMovie?id=' + this.state.movie.id + '&title=' + this.state.movie.title + '&description=' + this.state.movie.description + '&picture=' + this.state.movie.picture + '&ageRestriction=' + this.state.movie.ageRestriction + '&picture=' + this.state.movie.picture, {
    //          method: 'POST'
    //        });
    //  }

     public addMovies(){
        fetch('https://cinemaapi.azurewebsites.net/cinema/AddMovie', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: this.state.movie.title, description: this.state.movie.description, picture: this.state.movie.picture, ageRestriction: this.state.movie.ageRestriction, icon: this.state.movie.icon, genre: this.state.movie.genre, director: this.state.movie.director, watchingTime: this.state.movie.watchingTime})
          }).then(res=>res.json())
            .then(res => console.log(res));
     }

     

      public render(){
          return(
            <div className="form-inner">
            <h1 className="text-white text-center font-monte mt-4 mb-4 pb-4 border-b border-solid border-red">Dodaj film</h1>

                <div className="inline-block w-1/2 add-form">
                    <div className="add-form-item ">
                        <label htmlFor="title" className="block text-sm font-bold  ml-8 text-white">TYTUŁ</label>
                        <input onChange={this.onChange} placeholder="Podaj tytuł "  id="title" type="title" name="title" className="shadow appearance-none border rounded ml-8 w-full py-2 px-3 mb-3 text-grey-darker leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="add-form-item  ">
                        <label htmlFor="genre" className="block text-sm font-bold  ml-8 text-white">GATUNEK</label>
                        <input onChange={this.onChange} placeholder="Podaj gatunek "  id="genre" type="genre" name="genre" className="shadow appearance-none border rounded ml-8  w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="add-form-item ">
                        <label htmlFor="director" className="block text-sm font-bold  ml-8 text-white">REŻYSER</label>
                        <input onChange={this.onChange} placeholder="Podaj reżysera "  id="director" type="director" name="director" className="shadow appearance-none border rounded ml-8 w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>
                </div>

                <div className="inline-block w-1/2 add-form2">
                    <div className="add-form-item2">
                        <label htmlFor="ageRestriction" className="block text-sm font-bold  text-white">OGRANICZENIA WIEKOWE</label>
                        <input onChange={this.onChange} placeholder="Podaj ograniczenie "  id="ageRestriction" type="ageRestriction" name="ageRestriction" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>
                    
                    <div className="add-form-item2 ">
                        <label htmlFor="watchingTime" className="block text-sm font-bold  text-white">CZAS OGLĄDANIA</label>
                        <input onChange={this.onChange} placeholder="Podaj czas oglądania "  id="watchingTime" type="watchingTime" name="watchingTime" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>
                </div>

                <div className="text-center w-3/5 ml-auto mr-auto">
                    <div className="add-form-item">
                        <label htmlFor="picture" className="block text-sm font-bold  mt-4 text-white ">ZDJĘCIE</label>
                        <input onChange={this.onChange} placeholder="Podaj link do zdjęcia "  id="picture" type="picture" name="picture" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="add-form-item">
                        <label htmlFor="icon" className="block text-sm font-bold  text-white">IKONA</label>
                        <input onChange={this.onChange} placeholder="Podaj link do ikony "  id="icon" type="icon" name="icon" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="add-form-item">
                        <label htmlFor="description" className="block text-sm font-bold  text-white ">OPIS</label>
                        <input onChange={this.onChange}  placeholder="..."  id="description" type="description" name="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>
                    
                    <div className="text-center pt-4">
                        <button onClick={this.addMovies} className="button bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Zapisz</button>
                    </div>
                </div>
         </div>
          )
      }
}

export interface IState {
    movie: IMovie,
  }
  export interface IMovie {
    id: number,
    title: string,
    description: string,
    picture: string,
    ageRestriction: number,
    icon: string,
    genre: string,
    director: string,
    watchingTime: string,
    rating: number
  }