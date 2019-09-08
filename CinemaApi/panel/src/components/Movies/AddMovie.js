import React from 'react';
import { NavLink } from 'react-router-dom';


export default class AddMovie extends React.Component {
    state  = {
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
        },
        valid: false,
        message: "All the fields must be completed!"
      };
    
      constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.addMovies = this.addMovies.bind(this);
      }

       onChange = (e) => {
        const movieCopy = JSON.parse(JSON.stringify(this.state.movie));
        console.log(movieCopy);
        if (e.currentTarget.name === "ageRestriction"){
            movieCopy[e.currentTarget.name] = +e.currentTarget.value;
        }
        else{
            movieCopy[e.currentTarget.name] = e.currentTarget.value;
        }
        
        this.setState({ movie: movieCopy});
        if (movieCopy.title !== "" && movieCopy.description !== "" && movieCopy.picture !== "" && movieCopy.ageRestriction !== "" && movieCopy.icon !== "" && movieCopy.genre !== "" && movieCopy.director !== "" && movieCopy.watchingTime !== "" )
        {
            this.setState({
                valid: true,
                message: ""
              });
         
        }
        else{
            this.setState({
                valid: false,
                message: "All the fields must be completed!"
              });
        }
        console.log(this.state.valid);
        console.log(this.state.movie.director);
    }

 

      addMovies(){
        fetch('https://localhost:44371/cinema/AddMovie', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({title: this.state.movie.title, description: this.state.movie.description, picture: this.state.movie.picture, ageRestriction: this.state.movie.ageRestriction, icon: this.state.movie.icon, genre: this.state.movie.genre, director: this.state.movie.director, watchingTime: this.state.movie.watchingTime})
          }).then(res=>res.json())
            .then(res => console.log(res));
     }

     

       render(){
        let validState = this.state.valid ? 'button bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' : 'button bg-grey hover:bg-grey-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
          return(
            <div className="form-inner">
            <h1 className="text-white text-center font-monte mt-4 mb-4 pb-4 border-b border-solid border-red">Dodaj film</h1>
            <div className="add-movie">
                    <NavLink className="add-btn btn-style absolute pin-l ml-2 mr-2" to="/MovieManagment" >
                        &laquo; Powrót
                    </NavLink>
                </div>
              <div className="w-full mt-20 ">
                <div className="inline-block w-1/2 add-form ">
                    <div className="add-form-item float-right ">
                        <label htmlFor="title" className="block text-sm font-bold  text-white">TYTUŁ</label>
                        <input onChange={this.onChange} placeholder="Podaj tytuł "  id="title" type="title" name="title" className="shadow appearance-none border rounded w-4/5 py-2 px-3 mb-3 text-grey-darker  focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="add-form-item  float-right ">
                        <label htmlFor="genre" className="block text-sm font-bold  text-white">GATUNEK</label>
                        <input onChange={this.onChange} placeholder="Podaj gatunek "  id="genre" type="genre" name="genre" className="shadow appearance-none border rounded   w-4/5 py-2 px-3 text-grey-darker mb-3  focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="add-form-item float-right ">
                        <label htmlFor="director" className="block text-sm font-bold  text-white">REŻYSER</label>
                        <input onChange={this.onChange} placeholder="Podaj reżysera "  id="director" type="director" name="director" className="shadow appearance-none border rounded  w-4/5 py-2 px-3 text-grey-darker mb-3  focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>
                </div>

                <div className="inline-block w-1/2 add-form2">
                    <div className="add-form-item2">
                        <label htmlFor="ageRestriction" className="block text-sm font-bold  text-white">OGRANICZENIA WIEKOWE</label>
                        <input onChange={this.onChange} placeholder="Podaj ograniczenie "  id="ageRestriction" type="text" pattern="[0-9]*" name="ageRestriction" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3  focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>
                    
                    <div className="add-form-item2 ">
                        <label htmlFor="watchingTime" className="block text-sm font-bold  text-white">CZAS OGLĄDANIA</label>
                        <input onChange={this.onChange} placeholder="Podaj czas oglądania "  id="watchingTime" type="watchingTime" name="watchingTime" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3  focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>
                </div>

                <div className="text-center w-3/5 ml-auto mr-auto align-content: center">
                    <div className="add-form-item">
                        <label htmlFor="picture" className="block text-sm font-bold  mt-4 text-white ">ZDJĘCIE</label>
                        <input onChange={this.onChange} placeholder="Podaj link do zdjęcia "  id="picture" type="picture" name="picture" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3  focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="add-form-item">
                        <label htmlFor="icon" className="block text-sm font-bold  text-white">IKONA</label>
                        <input onChange={this.onChange} placeholder="Podaj link do ikony "  id="icon" type="icon" name="icon" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3  focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="add-form-item">
                        <label htmlFor="description" className="block text-sm font-bold  text-white ">OPIS</label>
                        <input onChange={this.onChange}  placeholder="..."  id="description" type="description" name="description" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3  focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>
                    
                    
                </div>
                <div className="text-center pt-4">
                        <label className="block text-sm font-bold  text-red">{this.state.message}</label><br/>
                        <button onClick={this.addMovies} disabled={!this.state.valid} className={validState}>Zapisz</button>
                    </div>
                </div>
         </div>
          )
      }
}

