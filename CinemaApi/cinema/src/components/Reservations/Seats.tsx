import * as React from "react";
import 'src/assets/css/App.css';
import './ReserveTicket.css';





class Seats extends React.Component<any, IState>{

    public state: IState={
        "free": true,     
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
    public async RemoveSeat(){

    
        const result = await fetch('https://cinemaapi.azurewebsites.net/cinema/RemoveSeat2?seat=' + this.state.seat.s, {
          method: 'GET'
        });
        await result.json();
    }


public render() {
    // if(this.props.seat.seatNumb !== 0){this.state.map = "seat-taken"  }
    // else { this.state.map = "seat-free" }
    // let content;
    let seatState = this.state.free ? 'seat-free' : 'seat-taken';
    let snumber = this.state.seat.s;
    if (this.state.seat.s === "P") {
        seatState = 'seat-empty';
        return ( <div className= "line"> 
        <div className={seatState}/>
        </div>
        )
      }
    if (this.state.seat.s === "Taken") {
        seatState = 'seat-reserved';
        snumber = "T";
        return ( <div className= "line"> 
        <button className={seatState}>
        <p className="white">{snumber}</p>
        </button>
        </div>
        )

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
  }
  export interface ISeat {
    s: string,
  }
