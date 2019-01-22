import React from 'react';
import { NavLink } from 'react-router-dom';


export default class AddMovie extends React.Component {

        state={
            "culturalevent": {
                "id": 0,
                "eventName":"",
                "eventDescription": "",
                "seatsLimit":""
            },

            valid: false,
            message: "All the fields must be completed!"
        };

        constructor(props){
            super(props);
            this.onChange = this.onChange.bind(this);
            this.addCulturalEvents = this.addCulturalEvents.bind(this);
        }

        
       onChange = (e) => {
        const culturaleventCopy = JSON.parse(JSON.stringify(this.state.culturalevent));
        
        
        this.setState({ culturalevent: culturaleventCopy});
        if (culturaleventCopy.eventName !== "" && culturaleventCopy.eventDescription !== "" && culturaleventCopy.seatsLimit !== ""  )
        {
            this.setState({
                valid: true,
                message: ""
              });
         
        }
        else{
            this.setState({
                valid: false,
                message: "All the fields must be completed!"
              });
        }
        console.log(this.state.valid);
    }

    addCulturalEvents(){
        fetch('https://localhost:44371/cinema/AddCulturalEvent', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({eventName: this.state.culturalevent.eventName, eventDescription: this.state.culturalevent.eventDescription, seatsLimit: this.state.culturalevent.seatsLimit})
          }).then(res=>res.json())
            .then(res => console.log(res));
    }


       render(){
        
          return(
        
            <div className="form-inner">
            <h1 className="text-white text-center font-monte mt-4 mb-4 pb-4 border-b border-solid border-red">Dodaj film</h1>
            <div className="add-movie">
                    <NavLink className="add-btn btn-style" to="/CulturalEventManagment" >
                        &laquo; Powrót
                    </NavLink>
                </div>
              

                <div className="text-center w-3/5 ml-auto mr-auto align-content: center">
                    <div className="add-form-item">
                        <label htmlFor="eventName" className="block text-sm font-bold  mt-4 text-white ">NAZWA</label>
                        <input onChange={this.onChange} placeholder="Podaj nazwę wydarzenia "  id="eventName" type="eventName" name="eventName" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="add-form-item">
                        <label htmlFor="eventDescription" className="block text-sm font-bold  text-white">OPIS</label>
                        <input onChange={this.onChange} placeholder="Podaj opis wydarzenia "  id="eventDescription" type="eventDescription" name="eventDescription" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>

                    <div className="add-form-item">
                        <label htmlFor="seatsLimit" className="block text-sm font-bold  text-white ">LIMIT MIEJSC</label>
                        <input onChange={this.onChange}  placeholder="Podaj limit miejsc"  id="seatsLimit" type="seatsLimit" name="seatsLimit" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                    </div>
                    
                    <div className="text-center pt-4">
                        <label className="block text-sm font-bold  text-red">{this.state.message}</label><br/>
                        <button onClick={this.addCulturalEvents} disabled={!this.state.valid} >Zapisz</button>
                    </div>
                </div>
         </div>
          )
      }
}

