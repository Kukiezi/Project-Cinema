import * as React from 'react';
import SeatReservation from './Info';

class Reservation extends React.Component<any, IState> {

    public state: IState = {
      "seatsReservation":[],
      "reservation":{
        "IdReservation": 1,
        "IdUserAccount": 1,
        "IdScreening": 3
    },
        "seat": {
          "idSeat": 0,
          "rowNumb": "",
          "seatNumb": 0
          
        }
      };

    constructor(props: IState) {
        super(props);
      }
    
      public async componentDidMount() {

        const result = await fetch('https://localhost:44371/cinema/GetSeat?reservation=' + 1);
        const seatsReservation = await result.json();
        this.setState({
          seatsReservation
          
        });
    }
  public render() {
    return (
        <div>
        <h3 className="white">Potwierdzenie</h3>
        {this.state.seatsReservation.map(seatReservation => 
                    <SeatReservation key={seatReservation.idReservation} seatReservation={seatReservation}/>)}

        </div>

    );
  }
}

export default Reservation;
export interface IState {
  
  seat: ISeat,
  reservation: IReservation
  seatsReservation: ISeatReservation[]
  }
  export interface ISeat {
    idSeat: number,
    rowNumb: string,
    seatNumb: number,
    
  }
  export interface IReservation {
    IdReservation: number,
    IdUserAccount: number,
    IdScreening: number,
  }
  export interface ISeatReservation {
    idSeatReservation: number,
    idSeat:number,
    idReservation: number,
    
  }