import * as React from 'react';
import './Events.css';
import CulturalEvents from '../Events/CulturalEvents';




class Events extends React.Component<any, IState>{

    public state: IState = {
        "culturalevents": []
    };

    constructor(props: IState) {
        super(props);
      
      } 

    public async componentDidMount() {
        const result = await fetch('https://localhost:44371/cinema/GetCulturalEvents');
        const culturalevents = await result.json();
        this.setState({ culturalevents });
    }
    

    public render() {

        return(
            <div className="form">
                <div className="inner">
                    <h1 className="text-white text-center font-monte mt-4 pb-4 border-b border-solid border-red">Wydarzenia</h1>
                    <div className="list-of-events" id="list-of-events">

                        {this.state.culturalevents.map(culturalevent => 
                            <CulturalEvents key={culturalevent.idCulturalEvent} culturalevent={culturalevent}/>)}
                        
                    
                    </div>
                    {/* <div className="date-picker">
                        <DatePicker/>
                    </div> */}
                </div>
            </div>
        );
    }

}
export default Events;

export interface IState {
 culturalevents: ICulturalEvents[]
}

export interface ICulturalEvents {
  idCulturalEvent: number,
  eventName: string,
  eventDescription: string,
  eventDate: Date,
  seatsLimit: number,
  
  
}