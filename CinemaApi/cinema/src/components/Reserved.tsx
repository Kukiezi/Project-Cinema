import * as React from "react";
import 'src/assets/css/App.css'
import 'src/assets/css/ReserveTicket.css';




class SeatR extends React.Component<any, IState>{

    public state: IState={     
        "seats":{
            "idSeat": this.props.seat.idSeat,
            "rowNumb": this.props.seat.rowNumb,
            "seatNumb": this.props.seat.seatNumb
        },


        };

    constructor(props: IState) {
            super(props);
          }

public render() {

        return (
            <div>
                <p className="white">Rząd:{this.state.seats.rowNumb}</p>
                <p className="white">Miejsce:{this.state.seats.seatNumb}</p>
            </div>
        )

}


}
export default SeatR;
export interface IState {
    seats: ISeats,

  }

  export interface ISeats {
    idSeat: number,
    rowNumb: string,
    seatNumb: number,
    
  }
