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
    // console.log(this.props.screening)
  }   

  public render() {
    return (
      <div className="mt-8">
        <div className="screening-title">{this.state.screening.movieName}</div>    
        <div className="screening-time"><NavLink className="day-btn" to={{pathname:"/ReserveTicket/"+this.state.screening.idScreening+"/"+this.state.screening.showtime1}}>{this.state.screening.showtime1}</NavLink> </div>
        <div className="screening-time"><NavLink className="day-btn" to={{pathname:"/ReserveTicket/"+this.state.screening.idScreening+"/"+this.state.screening.showtime2}}>{this.state.screening.showtime2}</NavLink> </div>
        <div className="screening-time"><NavLink className="day-btn" to={{pathname:"/ReserveTicket/"+this.state.screening.idScreening+"/"+this.state.screening.showtime3}}>{this.state.screening.showtime3}</NavLink> </div>
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
