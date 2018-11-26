import * as React from "react";
import 'src/assets/css/App.css'
import 'src/assets/css/ReserveTicket.css';




class Seats extends React.Component<any, IState>{

    public state: IState={
        "free": true,
        "currentRating":0,
        "reservation":{
            "IdReservation": 1,
            "IdUserAccount": 1,
            "IdScreening": 3
        },
        
        "seat":{
            "idSeat": this.props.seat.idSeat,
            "rowNumb": this.props.seat.rowNumb,
            "seatNumb": this.props.seat.seatNumb
        }

        };

    constructor(props: IState) {
            super(props);
          }
    public isFree = () => {

        this.setState({
          free: !this.state.free        
        })
        this.SendSeat();
      }
      public async SendSeeat(){

    
        const result = await fetch('https://localhost:44371/cinema/AddSeat?reservation=' + this.state.reservation.IdReservation + '&seat=' + this.state.seat.idSeat, {
          method: 'POST'
        });
        await result.json();


    }
    public async SendSeat(){

    
        const result = await fetch('https://localhost:44371/cinema/AddSeat?reservation=' + this.state.reservation.IdReservation + '&seat=' + this.state.seat.idSeat, {
          method: 'POST'
        });
        let currentRating = await result.json();
        currentRating *= 2;
        this.setState({currentRating});
        console.log("currentrating: "+ this.state.currentRating);
    }


public render() {
    const seatState = this.state.free ? 'seat-free' : 'seat-taken';
        return (
           
            <div className={seatState} onClick={this.isFree}>
            <p className="white">{this.props.seat.seatNumb}</p>
           
             </div>
             
           
             
           )
}


}
export default Seats;
export interface IState {
    free: boolean,
    currentRating:number,
    seat: ISeat,
    reservation: IReservation
  }
  export interface IReservation {
    IdReservation: number,
    IdUserAccount: number,
    IdScreening: number,
  }
  export interface ISeat {
    idSeat: number,
    rowNumb: string,
    seatNumb: number,
    
  }