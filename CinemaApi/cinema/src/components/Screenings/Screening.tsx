import * as React from 'react';
import 'src/assets/css/App.css';
import './Screening.css';
// import Fade from '../App/Fade';
// import Movies from '../Movies/Movies';
import 'src/assets/css/Spinner.css';
import { NavLink } from 'react-router-dom';
// import Modal from 'react-modal';
// import * as Datetime from 'react-datetime';



class Screening extends React.Component<any, any> {

//   public state: IState = {
//     "movies": []
// };

constructor(props: any) {
  super(props);

  this.state = {
    movies: [],
    screening: this.props.screening
  }
} 

  public componentDidMount(){
    console.log(this.props.screening)
  }   

  public render() {
    return (
      <div>
      <div><button className="day-btn">{this.state.screening.movieName}</button></div>    
      <div><NavLink className="day-btn" to="/ReserveTicket">{this.state.screening.showtime1}</NavLink> </div>
      <div><NavLink className="day-btn" to="/ReserveTicket">{this.state.screening.showtime2}</NavLink> </div>
      <div><NavLink className="day-btn" to="/ReserveTicket">{this.state.screening.showtime3}</NavLink> </div>
      </div>
    );
  }
}

export default Screening;
// export interface IState {
//   movies: IMovies[]
// }

// export interface IMovies {
//   id: number,
//   title: string,
//   description: string,
//   picture: string,
//   icon: string,
//   genre: string,
//   watchingTime: string,
//   director: string,
// }
