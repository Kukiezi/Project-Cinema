import * as React from "react";
import 'src/assets/css/App.css'
import 'src/assets/css/ReserveTicket.css';
import { NavLink } from 'react-router-dom';


export default class Seats extends React.Component<any, any>{

    public state={
        free: true
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
            
            <NavLink to={{
                pathname: 'Reservation/'+this.props.seat.idSeat,
                state: {
                  seat: this.props.seat
                }
              }}><p className="white">{this.props.seat.seatNumb}</p></NavLink>

         
           
             </div>
             
           
             
           )
}


}