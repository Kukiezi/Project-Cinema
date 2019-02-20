import * as React from 'react';
import SeatReservation from '../Reservations/Info';


class Reservations extends React.Component<any, IState> {

    public state: IState = {
      "seatsReservation":[],
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
    
      public async componentDidMount() {

        const result = await fetch('https://localhost:44371/cinema/GetSeat2?mask=' + this.props.reservations.seatsReserved);
        const seatsReservation = await result.json();
        const result3 = await fetch('https://localhost:44371/cinema/GetMovieInfo?id=' + this.props.reservations.idScreening);
        const Title = await result3.json();
        this.setState({
          seatsReservation,Title        
        });
        console.log(this.state.User.email);
    }
  public render() {
    const userStorage = localStorage.getItem("User");
    let user;
  if (userStorage !== null){
     user = JSON.parse(userStorage);
  }
    return (
        <div className="info">
        <h3 className="white2">Dane:</h3>
        <p className="white2 text-base">Imię: {user.response.firstName}</p>
        <p className="white2 text-base">Nazwisko: {user.response.lastName}</p>
        <p className="white2 text-base">Email: {user.response.email}</p>
        <h3 className="white2">Film: {this.state.Title}</h3>
        <h3 className="white2">Godzina: {this.props.reservations.showtime}</h3>
        <h3 className="white2">Miejsca:</h3>
        {this.state.seatsReservation.map(seatReservation => 
                    <SeatReservation key={seatReservation} seatReservation={seatReservation}/>)}

        </div>

    );
  }
}

export default Reservations;
export interface IState {
  

  seatsReservation: string[],
  Title: string,
  User: IUser 
  }
  export interface IUser {
  firstName: string,
  lastName: string,
  email: string
  }
