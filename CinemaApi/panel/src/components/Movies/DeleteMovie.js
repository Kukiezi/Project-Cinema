import * as React from 'react';
import { NavLink } from 'react-router-dom';


export default class DeleteMovie extends React.Component {

     state = {
        "movie": {
          "id": 0,
          "title": "",
          "description": "",
          "picture": "",
          "rating": 0
        }
      };

      constructor(props) {
        super(props);
        this.deleteMovie = this.deleteMovie.bind(this);
      
      }

       async componentDidMount() {
        const { Id } = this.props.match.params;
        // const { movie } = this.props.location.state
        const result = await fetch('https://localhost:44371/cinema/GetMovie?id=' + Id);
        const movie = await result.json();
      
        this.setState({
          movie
        });
      }

       async deleteMovie(){
       await fetch('https://localhost:44371/cinema/DeleteMovie?id=' + this.state.movie.id, {
            method: 'POST'
          });
      }

  

    render(){
       return(
           <div>
             <h1 className="text-white text-center font-monte mt-4 mb-4 pb-4">Czy na pewno chcesz usunąć film: {this.state.movie.title}</h1>
             <NavLink onClick={this.deleteMovie} className="yes-btn" to={{
                pathname: '/MovieManagment'
             }}>TAK</NavLink>
          
             <NavLink className="no-btn" to={{
                pathname: '/MovieManagment'
              }}> 
              NIE 
      </NavLink>
           </div>
          
       )
   }


}


