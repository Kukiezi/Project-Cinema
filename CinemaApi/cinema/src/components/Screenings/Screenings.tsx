import * as React from 'react';
import '../Events/Events.css';
import Screening from '../Screenings/Screening';
import './Screening.css';



class Screenings extends React.Component<any, IState>{

    public state: IState = {
        "screenings": []
    };

    constructor(props: IState) {
        super(props);
      
      } 

    public async componentDidMount() {
        const result = await fetch('https://localhost:44371/cinema/GetScreenings');
        const screenings = await result.json();
        this.setState({ screenings });
    }
    

    public render() {

        return(
            <div className="form">
                <div className="inner">
                <div className="p-8 List-header">Repetuar</div>
                    <div className="list-of-events" id="list-of-events">

                       {this.state.screenings.map(screening => 
                           <Screening key={screening.idScreening} screening={screening}/>)} 
                        
                   
                    </div>
                </div>
            </div>
        );
    }

}
export default Screenings;

export interface IState {
 screenings: IScreening[]
}

export interface IScreening {
  idScreening: number,
  screeningDate: Date,
}