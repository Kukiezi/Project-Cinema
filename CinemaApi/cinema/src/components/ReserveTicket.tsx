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
  },
  "Reserved":""

};

constructor(props: IState) {
  super(props);
  this.updateReservation = this.updateReservation.bind(this);
} 

public async componentDidMount() {
  const result = await fetch('https://localhost:44371/cinema/MapRoom?mask=' + "A2P7P2QB3PPP4PPP3QC3P4P3Q");
  const seats = await result.json();
  this.setState({
  seats });
   }
public updateReservation(value: string, check: boolean)
{
  let Res = this.state.Reserved;
  if(check){
  this.setState({Reserved: this.state.Reserved + value})
  }
  else 
  {
    Res = Res.replace(value,"")
    this.setState({Reserved: Res})
  }

  
}

  public render() {  
    let i = 1;
    return (     
      <div className="flex content-center whitespace-nowrap">
      <div className="w-full h-64 text-grey-darker text-center bg-white px-4 py-2 m-2 row-left room-width">
         
      {this.state.seats.map(seat => 
                    <Seats triggerUpdate={this.updateReservation} key={i=i+1} seat={seat}/>)}
                    
  </div> 
  
  <NavLink className="buy-btn" to={{
                pathname: 'Reservation/'+this.state.Reserved,
              }}> 
              Zarezerwuj 
      </NavLink>
  </div>

      
    );
  }
}

export default ReserveTicket;
export interface IState {
  seats: string[],
  reservation: IReservation,
  Reserved:string
}




