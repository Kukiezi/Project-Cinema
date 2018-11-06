import * as React from 'react';

class Reservation extends React.Component<any, IState> {

    public state: IState = {
        
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
        const { idSeat } = this.props.match.params;
        const result = await fetch('https://localhost:44371/cinema/GetSeat?idSeat=' + idSeat);
        const seat = await result.json();
        this.setState({
          seat
          
        });
    }
  public render() {
    return (
        <div>
        <h3 className="white">Potwierdzenie</h3>
        <h3 className="white">Rząd:{this.state.seat.rowNumb}</h3>
        <h3 className="white">Numer:{this.state.seat.seatNumb}</h3 >
        </div>

    );
  }
}

export default Reservation;
export interface IState {
    seat: ISeat
  
  }
  export interface ISeat {
    idSeat: number,
    rowNumb: string,
    seatNumb: number,
    
  }