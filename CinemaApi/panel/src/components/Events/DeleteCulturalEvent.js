import * as React from 'react';
import { NavLink } from 'react-router-dom';

export default class DeleteCulturalEvent extends React.Component {
    
    state = {
        "culturalevent": {
          "idCulturalEvent": 0,
          "eventName":"",
            "eventDescription": "",
            "seatsLimit":""
        }
      };

      constructor(props) {
        super(props);
        this.deleteCulturalEvent = this.deleteCulturalEvent.bind(this);
      
      }
      async componentDidMount() {
        const { Id } = this.props.match.params;
        // const { movie } = this.props.location.state
        const result = await fetch('https://localhost:44371/cinema/GetCulturalEvent?IdCulturalEvent=' + Id);
        const culturalevent = await result.json();
      
        this.setState({
          culturalevent
        });
      }

       async deleteCulturalEvent(){
       await fetch('https://localhost:44371/cinema/DeleteCulturalEvent?id=' + this.state.culturalevent.idCulturalEvent, {
            method: 'POST'
          });
      }

      render(){
          return(
              <div>
                  <h1 className="text-white text-center font-monte mt-4 mb-4 pb-4">Czy na pewno chcesz usunąć film: {this.state.culturalevent.idCulturalEvent}</h1>
                <NavLink onClick={this.deleteCulturalEvent} className="yes-btn" to={{
                        pathname: '/CulturalEventManagment'
                    }}>TAK</NavLink>
                
                    <NavLink className="no-btn" to={{
                        pathname: '/CulturalEventManagment'
                    }}> 
                    NIE 
                </NavLink>
              </div>
          )
      }
}