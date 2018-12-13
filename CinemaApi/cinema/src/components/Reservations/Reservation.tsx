import * as React from 'react';
import SeatReservation from './Info';
import { NavLink } from 'react-router-dom';

class Reservation extends React.Component<any, IState> {

    public state: IState = {
      "seatsReservation":[],
      };

    constructor(props: IState) {
        super(props);
      }
      public async Reserve(){

        const { Reserved } = this.props.match.params;
        await fetch('https://localhost:44371/cinema/AddReservation?user=' + 1 + '&screening=' + 3 + '&seat=' + Reserved, {
          method: 'POST',
          mode: 'no-cors'

        });


        // await result.json();
    }
      public async componentDidMount() {
        const { Reserved } = this.props.match.params;
        console.log(this.props.idSeat);
        const result = await fetch('https://localhost:44371/cinema/GetSeat2?mask=' + Reserved);
        const seatsReservation = await result.json();
        this.setState({
          seatsReservation
          
        });
    }

    public handleClick = () => {
      this.Reserve()

    }
  public render() {
    
    return (
        <div>
        <h3 className="white">Potwierdzenie</h3>
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
  

  seatsReservation: string[]
  }

