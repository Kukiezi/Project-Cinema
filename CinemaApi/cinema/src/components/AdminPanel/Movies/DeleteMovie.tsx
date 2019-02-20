import * as React from 'react';
import { NavLink } from 'react-router-dom';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { NavLink } from 'react-router-dom';
// import Fade from './Fade';


export class DeleteMovie extends React.Component<any, IState> {

    public state: IState = {
        "movie": {
          "id": 0,
          "title": "",
          "description": "",
          "picture": "",
          "rating": 0
        }
      };

      constructor(props: IState) {
        super(props);
        this.deleteMovie = this.deleteMovie.bind(this);
      
      }

      public async componentDidMount() {
        const { Id } = this.props.match.params;
        // const { movie } = this.props.location.state
        const result = await fetch('https://cinemaapi.azurewebsites.net/cinema/GetMovie?id=' + Id);
        const movie = await result.json();
      
        this.setState({
          movie
        });
      }

      public async deleteMovie(){
       await fetch('https://cinemaapi.azurewebsites.net/cinema/DeleteMovie?id=' + this.state.movie.id, {
            method: 'POST'
          });
      }

  

   public render(){
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



export interface IState {
  movie: IMovie,
}
export interface IMovie {
  id: number,
  title: string,
  description: string,
  picture: string,
  rating: number
}