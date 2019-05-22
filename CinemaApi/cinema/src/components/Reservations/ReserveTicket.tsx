import * as React from 'react';
import 'src/assets/css/App.css';
import './ReserveTicket.css';
import Seats from './Seats'
import { NavLink } from 'react-router-dom';

class ReserveTicket extends React.Component <any, IState>{
 
  public state: IState = {
    "seats": [],
  "Reserved":"",
  "Layout": "",
  "Screening": 0
  
};

constructor(props: IState) {
  super(props);
  this.updateReservation = this.updateReservation.bind(this);
} 

public async componentDidMount() {

  // console.log(this.props.match.params.Showtime)
  const result2 = await fetch('https://localhost:44371/cinema/GetLayout?id=' + this.props.match.params.Screening ,{
    method: 'GET'
  });
  const layout = await result2.json();
  const result = await fetch('https://localhost:44371/cinema/MapRoom?mask=' + layout + "&id=" + this.props.match.params.Screening +"&time="+ this.props.match.params.Showtime);
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
    let user;
    let content
    const userStorage = localStorage.getItem("User");
    if (userStorage != null){
       user = JSON.parse(userStorage);
       content = <div className="flex content-center whitespace-nowrap">
      
      <div className="w-full h-full text-grey-darker text-center bg-white px-6 py-4 m-4 row-left room-width">
      <div className="screen">Ekran</div>
      <br/>
      <br/>  
       {this.state.seats.map(seat => 
                     <Seats triggerUpdate={this.updateReservation} key={i=i+1} seat={seat}/>)}                 
   </div> 
   
   <NavLink className="buy-btn" to={{
                 pathname: '/Reservation/'+this.state.Reserved +"/" + this.props.match.params.Screening + "/" + user.response.id + "/" + this.props.match.params.Showtime,
                // pathname: '/PersonalData/'+this.state.Reserved +"/"+ this.state.Screening,
               }}> 
               Zarezerwuj 
       </NavLink>
   </div>
    }
    else
    {
      content =       <div className="flex content-center whitespace-nowrap">
      <div className="w-full h-full text-grey-darker text-center bg-white px-6 py-4 m-4 row-left room-width">
      <div className="screen">Ekran</div>
      <br/>
      <br/>  
      {this.state.seats.map(seat => 
                    <Seats triggerUpdate={this.updateReservation} key={i=i+1} seat={seat}/>)}                 
  </div> 
  
  <NavLink className="buy-btn" to={{
               // pathname: '/Reservation/'+this.state.Reserved +"/" + this.state.Screening,
               pathname: '/PersonalData/'+this.state.Reserved +"/"+ this.props.match.params.Screening + "/" + this.props.match.params.Showtime,
              }}> 
              Zarezerwuj 
      </NavLink>
  </div>
    }
    return (    
      <div> 
      {content}
      </div>
      
    );
  }
}

export default ReserveTicket;
export interface IState {
  seats: string[],
  Reserved:string,
  Layout:string,
  Screening: number
}




