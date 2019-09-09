import * as React from 'react';
import SeatReservation from './Info';
import { NavLink } from 'react-router-dom';

class Reservation extends React.Component<any, IState> {

  public state: IState = {
    "seatsReservation": [],
    "Screening": this.props.match.params.Screening,
    "Reserved": this.props.match.params.Reserved,
    "UserId": this.props.match.params.UserId,
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
  public async Reserve() {
    await fetch('https://localhost:44371/cinema/AddReservation?user=' + this.state.UserId + '&screening=' + this.state.Screening + '&seat=' + this.state.Reserved + "&time=" + this.props.match.params.Showtime, {
      method: 'POST',
      mode: 'no-cors'

    });
  }
  public async componentDidMount() {
    const result = await fetch('https://localhost:44371/cinema/GetSeat2?mask=' + this.state.Reserved);
    const seatsReservation = await result.json();
    const result2 = await fetch('https://localhost:44371/cinema/GetUser?id=' + this.state.UserId);
    const User = await result2.json();
    const result3 = await fetch('https://localhost:44371/cinema/GetMovieInfo?id=' + this.state.Screening);
    const Title = await result3.json();
    this.setState({
      seatsReservation, User, Title
    });
    // console.log(this.state.User.email);
  }

  public handleClick = () => {
    this.Reserve()

  }
  public render() {

    return (
      <div className="flex-col info text-center w-2/5">
        <div className="info__title">
          <h3 className="monte text-3xl">Potwierdzenie</h3>
        </div>
        <div className="info__data">
          {/* <h3 className="info__p text-2xl">Dane</h3> */}
          <p className="info__p text-xl">Imię: <span className="italic">{this.state.User.firstName}</span></p>
          <p className="info__p text-xl">Nazwisko: <span className="italic">{this.state.User.lastName}</span></p>
          <p className="info__p text-xl">Email: <span className="italic">{this.state.User.email}</span></p>
          <p className="info__p text-xl">Film: <span className="italic">{this.state.Title}</span></p>
          <p className="info__p text-xl">Godzina: <span className="italic">{this.props.match.params.Showtime}</span></p>
          <p className="info__p text-xl">Miejsca:
        {this.state.seatsReservation.map(seatReservation =>
            <SeatReservation key={seatReservation} seatReservation={seatReservation} />)}</p>

          <NavLink className="buy-btn-reservation" to='/EmailSent'

            onClick={this.handleClick}>
            Zarezerwuj
      </NavLink>
        </div>
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
