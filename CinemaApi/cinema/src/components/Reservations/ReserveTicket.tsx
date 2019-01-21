import * as React from 'react';
import 'src/assets/css/App.css';
import './ReserveTicket.css';
import Seats, { IReservation } from './Seats'
import { NavLink } from 'react-router-dom';

class ReserveTicket extends React.Component <any, IState>{
 
  public state: IState = {
    "seats": [],
    "reservation":{
      "IdReservation": 1,
      "IdUserAccount": 1,
      "IdScreening": 3
  },
  "Reserved":"",
  "Layout": "",
  "Screening": 0
};

constructor(props: IState) {
  super(props);
  this.updateReservation = this.updateReservation.bind(this);
} 

public async componentDidMount() {
  const { Screening } = this.props.match.params;
  this.state.Screening = Screening;
  const result2 = await fetch('https://localhost:44371/cinema/GetLayout?id=' + Screening ,{
    method: 'GET'
  });
  const layout = await result2.json();
  const result = await fetch('https://localhost:44371/cinema/MapRoom?mask=' + layout + "&id=" + Screening);
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
               // pathname: '/Reservation/'+this.state.Reserved +"/" + this.state.Screening,
               pathname: '/PersonalData/'+this.state.Reserved +"/"+ this.state.Screening,
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
  Reserved:string,
  Layout:string,
  Screening: number
}




