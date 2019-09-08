import React from 'react';
import { NavLink } from 'react-router-dom';


export default class AddScreening extends React.Component {
         state  = {
        "screening": {
          "id": 0,
          "movieName": "",
          "idMovies": 0,
          "idRoom": 0,
          "screeningDate": new Date(),
          "showTime1": "",
          "showTime2": "",
          "showTime3": ""
        },
        valid: false,
        movies: [],
        rooms: [],
        message: "All the fields must be completed!"
      };
    
      constructor(props) {
        super(props);
        this.onChange = this.onChange.bind(this);
        this.addMovies = this.addMovies.bind(this);
      }

       onChange = (e) => {
        const movieCopy = JSON.parse(JSON.stringify(this.state.screening));
        console.log(movieCopy);
            movieCopy[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ screening: movieCopy});
        if (movieCopy.movieName !== "" && movieCopy.idMovies !== "" && movieCopy.idRoom !== "" && movieCopy.screeningDate !== "" && movieCopy.showTime1 !== "" && movieCopy.showTime2 !== "" && movieCopy.showTime3 !== "" )
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
    }
     addScreening = () =>{
        const movieCopy = JSON.parse(JSON.stringify(this.state.screening));
        fetch('https://localhost:44371/cinema/AddScreenings?idMovie=' + movieCopy.idMovies + '&idRoom=' + movieCopy.idRoom + '&movieName=' + movieCopy.movieName + '&screeningDate=' + movieCopy.screeningDate + '&showTime1=' + movieCopy.showTime1  + '&showTime2=' + movieCopy.showTime2 + '&showTime3=' + movieCopy.showTime3    , {
           method: 'POST',
           mode: 'no-cors'
       });
    }

    async componentDidMount() {
        const result = await fetch('https://localhost:44371/cinema/GetMovies');
        const movies = await result.json();
      
        this.setState({ movies });

        const result2 = await fetch('https://localhost:44371/cinema/GetRooms');
        const rooms = await result2.json();
      
        this.setState({ rooms });          
      }

      addMovies(){
        fetch('https://localhost:44371/cinema/AddScreenings', {
            method: 'post',
            mode: 'no-cors',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ idMovies: this.state.screening.idMovies, movieName: this.state.screening.movieName, idRoom: this.state.screening.idRoom, screeningDate: this.state.screening.screeningDate, showtime1: this.state.screening.showTime1, showtime2: this.state.screening.showTime2, showtime3: this.state.screening.showTime3})
          }).then(res=>res.json())
            .then(res => console.log(res));
     }



       render(){
        let validState = this.state.valid ? 'button bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline' : 'button bg-grey hover:bg-grey-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline';
          return(
            <div className="form-inner">
            <h1 className="text-white text-center font-monte mt-4 mb-4 pb-4 border-b border-solid border-red">Dodaj seans</h1>
            <div className="add-movie">
                    <NavLink className="add-btn btn-style absolute pin-l ml-2 mr-2" to="/ScreeningsManagement" >
                        &laquo; Powrót
                    </NavLink>
                </div>
              <div className="w-full mt-20 ">
                <div className="inline-block w-1/2 add-form ">
                    <div className="add-form-item float-right ">
                        <label htmlFor="movieName" className="block text-sm font-bold  text-white">TYTUŁ</label>
                        <input onChange={this.onChange} placeholder="Podaj tytuł "  id="movieName" type="movieName" name="movieName" className="shadow appearance-none border rounded w-4/5 py-2 px-3 mb-3 text-grey-darker  focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="add-form-item float-right ">
                        <label htmlFor="idMovies" className="block text-sm font-bold  text-white">FILM</label>
                        <select onChange={this.onChange}  id="idMovies" type="idMovies" name="idMovies" className="shadow appearance-none border rounded w-4/5 py-2 px-3 mb-3 text-grey-darker  focus:text-blue focus:outline-none focus:shadow-outline">
                        <option value="" disabled selected>Wybierz Film</option>
                            {this.state.movies.map(movie =>
                                    <option key={movie['id']} value={movie["id"]}>{movie["title"]}</option>
                                  )}
                        </select>
                        
                    </div>

                    <div className="add-form-item float-right ">
                        <label htmlFor="idRoom" className="block text-sm font-bold  text-white">SALA</label>
                        <select onChange={this.onChange} placeholder="Podaj tytuł "  id="idRoom" type="idRoom" name="idRoom" className="shadow appearance-none border rounded w-4/5 py-2 px-3 mb-3 text-grey-darker  focus:text-blue focus:outline-none focus:shadow-outline">
                        <option value="" disabled selected>Wybierz Sale</option>
                            {this.state.rooms.map(room =>
                                    <option key={room['idRoom']} value={room["idRoom"]}>{room["roomNumber"]}</option>
                                  )}
                        </select>
                        
                    </div>

                    <div className="add-form-item  float-right ">
                        <label htmlFor="screeningDate" className="block text-sm font-bold  text-white">DATA</label>
                        <input onChange={this.onChange} placeholder="Podaj gatunek "  id="screeningDate" type="date" name="screeningDate" className="shadow appearance-none border rounded   w-4/5 py-2 px-3 text-grey-darker mb-3  focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="add-form-item float-right ">
                        <label htmlFor="showTime1" className="block text-sm font-bold  text-white">SEANS 1</label>
                        <input onChange={this.onChange} placeholder="Podaj reżysera "  id="showTime1" type="time" name="showTime1" className="shadow appearance-none border rounded  w-4/5 py-2 px-3 text-grey-darker mb-3  focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="add-form-item float-right ">
                        <label htmlFor="showTime2" className="block text-sm font-bold  text-white">SEANS 2</label>
                        <input onChange={this.onChange} placeholder="Podaj reżysera "  id="showTime2" type="time" name="showTime2" className="shadow appearance-none border rounded  w-4/5 py-2 px-3 text-grey-darker mb-3  focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="add-form-item float-right ">
                        <label htmlFor="showTime3" className="block text-sm font-bold  text-white">SEANS 3</label>
                        <input onChange={this.onChange} placeholder="Podaj reżysera "  id="showTime3" type="time" name="showTime3" className="shadow appearance-none border rounded  w-4/5 py-2 px-3 text-grey-darker mb-3  focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>
                </div>

               
                <div className="text-center pt-4">
                        <label className="block text-sm font-bold  text-red">{this.state.message}</label><br/>
                        <button onClick={this.addScreening} disabled={!this.state.valid} className={validState}>Zapisz</button>
                    </div>
                </div>
         </div>
          )
      }
}

