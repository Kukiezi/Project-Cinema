import * as React from 'react';


class ConfirmReservation extends React.Component<any, any> {



    constructor(props: any) {
        super(props);
      }
      public componentDidMount() {
        fetch('https://localhost:44371/cinema/ConfirmReservation?id=' + this.props.match.params);

        // console.log(this.state.User.email);
    }

  public render() {
    
    return (
        <div className="info">
        <h3 className="white3">Twoja rezerwacja została potwierdzona, pamiętaj żeby odebrać ją 15 minut przed rozpoczęciem seansu.:</h3>
        </div>

    );
  }
}

export default ConfirmReservation;
