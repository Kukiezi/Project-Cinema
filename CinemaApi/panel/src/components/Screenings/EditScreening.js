import * as React from 'react';
import '../../assets/css/Spinner.css';
import { NavLink } from 'react-router-dom';

class EditScreening extends React.Component {

   state = {
    "screening": {
        "id": 0,
        "movieName": "",
        "idMovies": 0,
        "idRoom": 0,
        "screeningDate": new Date(),
        "showtime1": "",
        "showtime2": "",
        "showtime3": ""
      },
      temp: "",
      movies: [],
      rooms: []
  };

  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.updateMovie = this.updateMovie.bind(this);
  }

   async componentDidMount() {
    const { Id } = this.props.match.params;
    // const { movie } = this.props.location.state
    const result = await fetch('https://localhost:44371/cinema/GetScreening?id=' + Id);
    let screening = await result.json();
    let temp = screening.screeningDate.slice(0,10);
    screening.showtime1 = screening.showtime1.slice(0,5); 
    screening.showtime2 = screening.showtime2.slice(0,5); 
    screening.showtime3 = screening.showtime3.slice(0,5); 
    console.log(screening);
    this.setState({
        screening
    });
    this.setState({
        temp
    });
    console.log(this.state.screening);
    const result2 = await fetch('https://localhost:44371/cinema/GetMovies');
    const movies = await result2.json();
  
    this.setState({ movies });

    const result3 = await fetch('https://localhost:44371/cinema/GetRooms');
    const rooms = await result3.json();
  
    this.setState({ rooms }); 
  }

   onChange = (e) => {
    const movieCopy = JSON.parse(JSON.stringify(this.state.screening));
    movieCopy[e.currentTarget.name] = e.currentTarget.value;
    this.setState({ screening: movieCopy});
    console.log(this.state.screening);
}

 async updateMovie(){
    const movieCopy = JSON.parse(JSON.stringify(this.state.screening));
    console.log(movieCopy);
    fetch('https://localhost:44371/cinema/EditScreenings?idScreening=' + movieCopy.idScreening + '&idMovie=' + movieCopy.idMovies + '&idRoom=' + movieCopy.idRoom + '&movieName=' + movieCopy.movieName + '&screeningDate=' + movieCopy.screeningDate + '&showtime1=' + movieCopy.showtime1  + '&showtime2=' + movieCopy.showtime2 + '&showtime3=' + movieCopy.showtime3    , {
       method: 'POST',
       mode: 'no-cors'
   });
}

render(){
    
      return(
        <div className="form-inner">
        <h1 className="text-white text-center font-monte mt-4 mb-4 pb-4 border-b border-solid border-red">Edytuj Seans</h1>
        <div className="add-movie">
                <NavLink className="add-btn btn-style absolute pin-l ml-2 mr-2" to="/ScreeningsManagement" >
                    &laquo; Powrót
                </NavLink>
            </div>
          <div className="w-full mt-20 ">
            <div className="inline-block w-1/2 add-form ">
                <div className="add-form-item float-right ">
                    <label htmlFor="movieName" className="block text-sm font-bold  text-white">TYTUŁ</label>
                    <input onChange={this.onChange} placeholder="Podaj tytuł " defaultValue={this.state.screening.movieName} id="movieName" type="movieName" name="movieName" className="shadow appearance-none border rounded w-4/5 py-2 px-3 mb-3 text-grey-darker  focus:text-blue focus:outline-none focus:shadow-outline" />
                </div>

                <div className="add-form-item float-right ">
                    <label htmlFor="idMovies" className="block text-sm font-bold  text-white">FILM</label>
                    <select onChange={this.onChange}  defaultValue={this.state.screening.idMovies}  id="idMovies" type="idMovies" name="idMovies" className="shadow appearance-none border rounded w-4/5 py-2 px-3 mb-3 text-grey-darker  focus:text-blue focus:outline-none focus:shadow-outline">
                    <option value="" disabled>Wybierz Film</option>
                        {this.state.movies.map(movie =>
                                <option key={movie['id']} value={movie["id"]}>{movie["title"]}</option>
                              )}
                    </select>
                    
                </div>

                <div className="add-form-item float-right ">
                    <label htmlFor="idRoom" className="block text-sm font-bold  text-white">SALA</label>
                    <select onChange={this.onChange} placeholder="Podaj tytuł " defaultValue={this.state.screening.idRoom}  id="idRoom" type="idRoom" name="idRoom" className="shadow appearance-none border rounded w-4/5 py-2 px-3 mb-3 text-grey-darker  focus:text-blue focus:outline-none focus:shadow-outline">
                    <option value="" disabled>Wybierz Sale</option>
                        {this.state.rooms.map(room =>
                                <option key={room['idRoom']} value={room["idRoom"]}>{room["roomNumber"]}</option>
                              )}
                    </select>
                    
                </div>

                <div className="add-form-item  float-right ">
                    <label htmlFor="screeningDate" className="block text-sm font-bold  text-white">DATA</label>
                    <input onChange={this.onChange}  defaultValue={this.state.temp} id="screeningDate" type="date" name="screeningDate" className="shadow appearance-none border rounded   w-4/5 py-2 px-3 text-grey-darker mb-3  focus:text-blue focus:outline-none focus:shadow-outline" />
                </div>

                <div className="add-form-item float-right ">
                    <label htmlFor="showtime1" className="block text-sm font-bold  text-white">SEANS 1</label>
                    <input onChange={this.onChange}  defaultValue={this.state.screening.showtime1} id="showtime1"  type="time" name="showtime1" className="shadow appearance-none border rounded  w-4/5 py-2 px-3 text-grey-darker mb-3  focus:text-blue focus:outline-none focus:shadow-outline" />
                </div>

                <div className="add-form-item float-right ">
                    <label htmlFor="showtime2" className="block text-sm font-bold  text-white">SEANS 2</label>
                    <input onChange={this.onChange}  defaultValue={this.state.screening.showtime2} id="showtime2" type="time" name="showtime2" className="shadow appearance-none border rounded  w-4/5 py-2 px-3 text-grey-darker mb-3  focus:text-blue focus:outline-none focus:shadow-outline" />
                </div>

                <div className="add-form-item float-right ">
                    <label htmlFor="showtime3" className="block text-sm font-bold  text-white">SEANS 3</label>
                    <input onChange={this.onChange}  defaultValue={this.state.screening.showtime3} id="showtime3" type="time" name="showtime3" className="shadow appearance-none border rounded  w-4/5 py-2 px-3 text-grey-darker mb-3  focus:text-blue focus:outline-none focus:shadow-outline" />
                </div>
            </div>

           
            <div className="text-center pt-4">
                      <button onClick={this.updateMovie} className="button bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Zapisz zmiany</button>
                  </div>
            </div>
     </div>
      )
  }
}


export default EditScreening;

