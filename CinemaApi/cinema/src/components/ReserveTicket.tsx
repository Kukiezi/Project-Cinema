import * as React from 'react';
import 'src/assets/css/App.css';
import 'src/assets/css/ReserveTicket.css';
import Seats, { IReservation } from './Seats'
import { NavLink } from 'react-router-dom';



class ReserveTicket extends React.Component{
 
  public state: IState = {
    "seats": [],
    "reservation":{
      "IdReservation": 1,
      "IdUserAccount": 1,
      "IdScreening": 3
  }

};

constructor(props: IState) {
  super(props);

} 

public async componentDidMount() {
  const result = await fetch('https://localhost:44371/cinema/GetSeats');
  const seats = await result.json();
  this.setState({
  seats });
   }


  public render() {  
    return (     
      <div className="flex content-center">
      <div className="w-full h-64 text-grey-darker text-center bg-grey-light px-4 py-2 m-2 row-left">
         
      {this.state.seats.map(seat => 
                    <Seats key={seat.idSeat} seat={seat}/>)}
                    
  </div> 
  
  <NavLink className="buy-btn" to={{
                pathname: 'Reservation/'+this.state.reservation.IdReservation,
              }}> 
              Zarezerwuj 
      </NavLink>
  </div>

      
    );
  }
}

export default ReserveTicket;
export interface IState {
  seats: ISeats[],
  reservation: IReservation
}

export interface ISeats {
  idSeat: number,
  rowNumb: string,
  seatNumb: number,
  
}


