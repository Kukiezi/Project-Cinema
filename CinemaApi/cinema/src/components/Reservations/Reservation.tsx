import * as React from 'react';
import SeatReservation from './Info';
import { NavLink } from 'react-router-dom';

class Reservation extends React.Component<any, IState> {

    public state: IState = {
      "seatsReservation":[],
      "Screening": this.props.match.params.Screening,
      "Reserved": this.props.match.params.Reserved,
      "UserId": this.props.match.params.UserId,
      "Title": "",
      "User":{
        "firstName": "",
        "lastName": "",
        "email": ""
      },
      };

    constructor(props: IState) {
        super(props);
      }
      public async Reserve(){
        await fetch('https://cinemaapi.azurewebsites.net/cinema/AddReservation?user=' + this.state.UserId + '&screening=' + this.state.Screening + '&seat=' + this.state.Reserved + "&time=" + this.props.match.params.Showtime, {
          method: 'POST',
          mode: 'no-cors'

        });
    }
      public async componentDidMount() {
        const result = await fetch('https://cinemaapi.azurewebsites.net/cinema/GetSeat2?mask=' + this.state.Reserved);
        const seatsReservation = await result.json();
        const result2 = await fetch('https://cinemaapi.azurewebsites.net/cinema/GetUser?id=' + this.state.UserId);
        const User = await result2.json();
        const result3 = await fetch('https://cinemaapi.azurewebsites.net/cinema/GetMovieInfo?id=' + this.state.Screening);
        const Title = await result3.json();
        this.setState({
          seatsReservation, User ,Title        
        });
        // console.log(this.state.User.email);
    }

    public handleClick = () => {
      this.Reserve()

    }
  public render() {
    
    return (
        <div className="info">
        <h3 className="white">Potwierdzenie:</h3>
        <h3 className="white">Dane:</h3>
        <p className="white">Imię: {this.state.User.firstName}</p>
        <p className="white">Nazwisko: {this.state.User.lastName}</p>
        <p className="white">Email: {this.state.User.email}</p>
        <h3 className="white">Film: {this.state.Title}</h3>
        <h3 className="white">Godzina: {this.props.match.params.Showtime}</h3>
        <h3 className="white">Miejsca:</h3>
        {this.state.seatsReservation.map(seatReservation => 
                    <SeatReservation key={seatReservation} seatReservation={seatReservation}/>)}

            <NavLink className="buy-btn" to='/'
               
               onClick={this.handleClick}> 
              Zarezerwuj 
      </NavLink>
        </div>

    );
  }
}

export default Reservation;
export interface IState {
  

  seatsReservation: string[],
  Screening: number,
  Reserved: string,
  Title: string,
  UserId: string,
  User: IUser 
  }
  export interface IUser {
  firstName: string,
  lastName: string,
  email: string
  }
