import * as React from 'react';
import './MovieSchedule.css';
import './Screening.css';
// import MovieSchedule from './MovieSchedule';




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
                    <div className="list-of-events" id="list-of-events">

                        {this.state.screenings.map(screening => 
                            <Screenings key={screening.idScreening} screenings={screening}/>)}
                        
                    
                    </div>
                    {/* <div className="date-picker">
                        <DatePicker/>
                    </div> */}
                </div>
            </div>
        );
    }

}
export default Screenings;

export interface IState {
 screenings: IScreenings[]
}

export interface IScreenings {
  idScreening: number,
  ScreeningDate: Date,
}