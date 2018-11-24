import * as React from "react";
import 'src/assets/css/App.css'
import 'src/assets/css/ReserveTicket.css';



export default class Seats extends React.Component<any, any>{

    public state={
        free: true,
        IdReservation:"",
        IdSeat: this.props.seat.seatNumb
        }
    public isFree = () => {

        this.setState({
          free: !this.state.free
          
        })
    
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