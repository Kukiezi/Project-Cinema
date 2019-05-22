import * as React from 'react';


class ConfirmCulturalEvent extends React.Component<any, any> {



    constructor(props: any) {
        super(props);
      }
      public componentDidMount() {
        fetch('https://localhost:44371/cinema/ConfirmSignFor?id=' + this.props.match.params.Id);

         console.log( this.props.match.params.Id);
    }

  public render() {
    
    return (
        <div className="info">
        <h3 className="white3">Twoja rezerwacja została potwierdzona, pamiętaj żeby odebrać ją 15 minut przed rozpoczęciem seansu.</h3>
        </div>

    );
  }
}

export default ConfirmCulturalEvent;
