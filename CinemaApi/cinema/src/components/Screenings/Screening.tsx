import * as React from 'react';
import 'src/assets/css/App.css';
import './Screening.css';
// import Fade from '../App/Fade';
// import Movies from '../Movies/Movies';
import 'src/assets/css/Spinner.css';
// import { NavLink } from 'react-router-dom';
// import Modal from 'react-modal';
// import * as Datetime from 'react-datetime';



class Screening extends React.Component<any, IState> {

  public state: IState = {
    "movies": []
};

constructor(props: IState) {
  super(props);

} 

   
  public render() {
    return (
      <div>
      <div><button className="day-btn">{this.props.screening.day1.movieName}</button> </div>     
      <div><button className="day-btn">{this.props.screening.day1.screeningDate}</button> </div>
      </div>
    );
  }
}

export default Screening;
export interface IState {
  movies: IMovies[]
}

export interface IMovies {
  id: number,
  title: string,
  description: string,
  picture: string,
  icon: string,
  genre: string,
  watchingTime: string,
  director: string,
}
