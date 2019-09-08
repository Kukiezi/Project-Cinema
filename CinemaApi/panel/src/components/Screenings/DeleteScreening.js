import * as React from 'react';
import { NavLink } from 'react-router-dom';


export default class DeleteMovie extends React.Component {

     state = {
        "screening": {
            "idScreening": 0,
            "movieName": "",
            "idMovies": 0,
            "idRoom": 0,
            "screeningDate": new Date(),
            "showtime1": "",
            "showtime2": "",
            "showtime3": ""
          }
      };

      constructor(props) {
        super(props);
        this.deleteMovie = this.deleteMovie.bind(this);
      
      }

       async componentDidMount() {
        const { Id } = this.props.match.params;
        // const { movie } = this.props.location.state
        const result = await fetch('https://localhost:44371/cinema/GetScreening?id=' + Id);
        const screening = await result.json();
      
        this.setState({
            screening
        });
      }

       async deleteMovie(){
       await fetch('https://localhost:44371/cinema/DeleteScreening?id=' + this.state.screening.idScreening, {
            method: 'POST'
          });
      }

  

    render(){
       return(
           <div>
             <h1 className="text-white text-center font-monte mt-32 mb-16 pb-4">Czy na pewno chcesz usunąć Seans: {this.state.screening.movieName}</h1>
             <NavLink onClick={this.deleteMovie} className="yes-btn" to={{
                pathname: '/MovieManagment'
             }}>TAK</NavLink>
          
             <NavLink className="no-btn" to={{
                pathname: '/MovieManagment'
              }}> 
              NIE 
      </NavLink>
           </div>
          
       )
   }


}


