import * as React from "react";
import 'src/assets/css/App.css'
import 'src/assets/css/ReserveTicket.css';





class Seats extends React.Component<any, IState>{

    public state: IState={
        "free": true,
        
        "reservation":{
            "IdReservation": 1,
            "IdUserAccount": 1,
            "IdScreening": 3
        },
        
        "seat":{
            "s": this.props.seat

        }
        

        };

    constructor(props: IState) {
            super(props);
          }
    public isFree = () => {

        this.setState({
          free: !this.state.free        
        })
        this.props.triggerUpdate(this.state.seat.s,this.state.free)
 
      }
      public async SendSeat(){

    
       //  await fetch('https://localhost:44371/cinema/AddSeat2?seat=' +  this.state.seat.s, {
       //   method: 'POST'
       // });
        // await result.json();
        
    }
    public async RemoveSeat(){

    
        const result = await fetch('https://localhost:44371/cinema/RemoveSeat2?seat=' + this.state.seat.s, {
          method: 'GET'
        });
        await result.json();
    }


public render() {
    // if(this.props.seat.seatNumb !== 0){this.state.map = "seat-taken"  }
    // else { this.state.map = "seat-free" }
    let seatState = this.state.free ? 'seat-free' : 'seat-taken';
    let snumber = this.state.seat.s;
    if (this.state.seat.s === "P") {
        seatState = 'seat-empty';
        
      }
    if (this.state.seat.s === "Taken") {
        seatState = 'seat-reserved';
        snumber = "T";
      }
    if(this.state.seat.s === "Q")
    {
        
        return(
            <br/>           
        )
    }
    else{
        return (
            <div className= "line"> 
            <button className={seatState} onClick={this.isFree}>
            <p className="white">{snumber}</p>
            </button>
            </div>
           
             
           )
        }
}


}
export default Seats;
export interface IState {
    free: boolean,
    
    seat: ISeat,
    reservation: IReservation,
  }
  export interface IReservation {
    IdReservation: number,
    IdUserAccount: number,
    IdScreening: number,
  }
  export interface ISeat {
    s: string,
  }
