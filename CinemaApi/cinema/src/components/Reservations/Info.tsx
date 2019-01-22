import * as React from "react";
import 'src/assets/css/App.css';
import './ReserveTicket.css';
class SeatReservation extends React.Component<any, IState>{

    public state: IState={
        "free": true,
        "currentRating":0,      
        "seats":[]
        };

    constructor(props: IState) {
            super(props);
          }
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
  }
  export interface ISeats {
    idSeat: number,
    rowNumb: string,
    seatNumb: number,
    
  }
