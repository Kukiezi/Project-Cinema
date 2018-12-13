import * as React from "react";
import 'src/assets/css/App.css';
import './ReserveTicket.css';





class SeatReservation extends React.Component<any, IState>{

    public state: IState={
        "free": true,
        "currentRating":0,
        "reservation":{
            "IdReservation": 1,
            "IdUserAccount": 1,
            "IdScreening": 3
        },
        
        "seats":[]



        };

    constructor(props: IState) {
            super(props);
          }
    /* public async componentDidMount() {

            const result = await fetch('https://localhost:44371/cinema/GetReserved?idSeat=' + this.state.seatReservation.idSeat);
            const seats = await result.json();
            this.setState({
                seats
              
            });
        } */

public render() {

        return (
            <div>
            <p className ="white">Miejsce: {this.props.seatReservation}</p>
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
