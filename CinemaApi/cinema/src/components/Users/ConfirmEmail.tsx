import * as React from 'react';


class ConfirmEmail extends React.Component<any, any> {



    constructor(props: any) {
        super(props);
      }
      public componentDidMount() {
        fetch('https://localhost:44371/api/ConfirmEmail?email=' + this.props.match.params.Email);

         console.log( this.props.match.params.Email);
    }

  public render() {
    
    return (
        <div className="info">
        <h3 className="white3">Twój email został potwierdzony.</h3>
        </div>

    );
  }
}

export default ConfirmEmail;
