import * as React from 'react';
import Screening from './Screening';
import './Screening.css';
import Fade from '../App/Fade';
import Movies from '../Movies/Movies';
import { NavLink } from 'react-router-dom';

class MovieSchedule extends React.Component<any, any>{

    // public state: IState = {
    //     "screenings": {
    //     "day1": [], 
    //     "day2": []
    //     },
    //     "movies": []
    // };

    constructor(props: any) {
        super(props);
       
        this.state = {
          screenings: {
            day1: [],
            day2: [],
            day3: [],
            day4: [],
            day5: [],
            day6: []
          },
          movies: [],
          refresh: 0
        }
      
      } 

    public async componentDidMount() {
        const result = await fetch('https://localhost:44371/cinema/GetScreenings');
        const screenings = await result.json();
       this.setState({ screenings });
        const result2 = await fetch('https://localhost:44371/cinema/GetMovies');
        const movies = await result2.json();
        this.setState({ movies });
        // console.log(this.state.screenings.day1[0]);

    }
    

    public render() {
 
    
     

        return(

            <div className="App">
        
            <Fade>
            <p className="p-8 List-header">
              Repetuar
            </p>
            </Fade>
    
          <Fade>
          <div className="Movie-list" id="Movie-list"> 
             
          {this.state.movies.map(movie => <Movies key={movie.id} movie={movie}/>)}<br/>
       
    
          </div>
          </Fade>
       
          <Fade>
          <div className="Day-header">        
            <div className="Days" ><br/><br/>
            <div>{this.state.screenings.day2.map(day => 
              <Screening key={day.idScreening} screening={day}/>)}</div>
            </div>
           </div>
           </Fade>
        
          <div className="Day-header">
          <br/><NavLink className="title-btn" to="/Details/1" >Garfield</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >9:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >11:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >14:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >20:00</NavLink>
          <br/><NavLink className="title-btn" to="/Details/2" >Iniemamocni</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >9:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >11:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >14:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >20:00</NavLink>
          <br/><NavLink className="title-btn" to="/Details/3" >Robin Hood</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >9:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >11:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >14:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >20:00</NavLink>
          <br/><NavLink className="title-btn" to="/Details/4" >Kraina Lodu</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >9:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >11:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >14:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >20:00</NavLink>
          <br/><NavLink className="title-btn" to="/Details/5" >Ted 2</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >9:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >11:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >14:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >20:00</NavLink>
          <br/><NavLink className="title-btn" to="/Details/8" >Avatar</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >9:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >11:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >14:30</NavLink> <NavLink className="buy-btn" to="/ReserveTicket" >20:00</NavLink>
          </div>
       
            </div>
    
            // <div>
            //     <div >Repetuar</div>
            //         <div>

            //            {this.state.screenings.map(screening => 
            //                <Screening key={screening.idScreening} screening={screening}/>)} 
                        
                   
            //         </div>
            // </div>
        );
    }

}
export default MovieSchedule;

// export interface IState {
//  screenings: IList,
//  movies: IMovies[],
// }

// export interface IList {
//   day1: IScreening[],
//   day2: IScreening[],
//  }

// export interface IScreening {
//   idScreening: number,
//   screeningDate: Date,
//   movieName: string,
// }


// export interface IMovies {
//     id: number,
//     title: string,
//     description: string,
//     picture: string,
//     icon: string,
//     genre: string,
//     watchingTime: string,
//     director: string,
//   }
  