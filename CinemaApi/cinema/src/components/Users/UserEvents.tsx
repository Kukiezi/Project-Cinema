import * as React from 'react';



class UserEvents extends React.Component<any, IState> {

    public state: IState = {
      "culturalEvent":{
          "eventName":"",
          "eventDate": ""
      },
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
      
    public async componentWillMount(){

        const result = await fetch('https://localhost:44371/api/GetEventsByUser?id=' + this.props.events.idCulturalEvent);
        const culturalEvent = await result.json();

        const Title = culturalEvent.eventDate.slice(0,10);
        this.setState({culturalEvent, Title});
        console.log(culturalEvent);
       

    }

    
  public render() {


    return (
        <div className="info">
        <h3 className="white2">Dane:</h3>

        <h3 className="white2">Wydarzenie: {this.state.culturalEvent.eventName}</h3>
        <h3 className="white2">Data: {this.state.Title}</h3>



        </div>

    );
  }
}

export default UserEvents;
export interface IState {
  

  culturalEvent: ICulturalEvent,
  Title: string,
  User: IUser 
  }
  export interface IUser {
  firstName: string,
  lastName: string,
  email: string
  }
  export interface ICulturalEvent {
    eventName: string,
    eventDate: string

    }
  
