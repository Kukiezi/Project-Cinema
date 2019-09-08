import * as React from 'react';
import SeatReservation from '../Reservations/Info';


class Reservations extends React.Component<any, IState> {

  public state: IState = {
    "seatsReservation": [],
    "Title": "",
    "User": {
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
      seatsReservation, Title
    });
    console.log(this.state.User.email);
  }
  public render() {
    const userStorage = localStorage.getItem("User");
    let user;
    if (userStorage !== null) {
      user = JSON.parse(userStorage);
    }
    return (
      <div className="flex-col info-user text-center">
        <p className="info__p text-xl">Dane:</p>
        <p className="info__p text-lg">Imię: <span className="italic">{user.response.firstName}</span></p>
        <p className="info__p text-lg">Nazwisko: <span className="italic">{user.response.lastName}</span></p>
        <p className="info__p text-lg">Email: <span className="italic">{user.response.email}</span></p>
        <p className="info__p text-lg">Film: <span className="italic">{this.state.Title}</span></p>
        <p className="info__p text-lg">Godzina: <span className="italic">{this.props.reservations.showtime}</span></p>
        <p className="info__p text-lg">Miejsca:
        {this.state.seatsReservation.map(seatReservation =>
          <SeatReservation key={seatReservation} seatReservation={seatReservation} />)}
        </p>
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
