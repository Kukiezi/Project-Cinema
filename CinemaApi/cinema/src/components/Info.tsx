import * as React from "react";
import 'src/assets/css/App.css'
import 'src/assets/css/ReserveTicket.css';
import SeatR from './Reserved';




class SeatReservation extends React.Component<any, IState>{

    public state: IState={
        "free": true,
        "currentRating":0,
        "reservation":{
            "IdReservation": 1,
            "IdUserAccount": 1,
            "IdScreening": 3
        },
        
        "seats":[],

        "seatReservation":
        {
            "idSeatReservation":this.props.seatReservation.idSeatReservation,
            "idSeat":this.props.seatReservation.idSeat,
            "idReservation":this.props.seatReservation.idReservation
        }

        };

    constructor(props: IState) {
            super(props);
          }
     public async componentDidMount() {

            const result = await fetch('https://localhost:44371/cinema/GetReserved?idSeat=' + this.state.seatReservation.idSeat);
            const seats = await result.json();
            this.setState({
                seats
              
            });
        }

public render() {

        return (
            <div>
            {this.state.seats.map(seat => 
                <SeatR key={seat.idSeat} seat={seat}/>)}
            </div>
           )
}


}
export default SeatReservation;
export interface IState {
    free: boolean,
    currentRating:number,
    seats: ISeats[],
    reservation: IReservation,
    seatReservation: ISeatReservation
  }
  export interface IReservation {
    IdReservation: number,
    IdUserAccount: number,
    IdScreening: number,
  }
  export interface ISeats {
    idSeat: number,
    rowNumb: string,
    seatNumb: number,
    
  }
  export interface ISeatReservation {
    idSeatReservation: number,
    idSeat:number,
    idReservation: number,
    
  }