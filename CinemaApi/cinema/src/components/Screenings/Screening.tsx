import * as React from 'react';
import 'src/assets/css/App.css';
import './Screening.css';
import Fade from '../App/Fade';
import Movies from '../Movies/Movies';
import 'src/assets/css/Spinner.css';
import { NavLink } from 'react-router-dom';
// import Modal from 'react-modal';
// import * as Datetime from 'react-datetime';



class Screening extends React.Component<any, IState> {

  public state: IState = {
    "movies": []
};

constructor(props: IState) {
  super(props);

} 

public async componentDidMount() {
  const result = await fetch('https://localhost:44371/cinema/GetMovies');
  const movies = await result.json();
  this.setState({ movies });
   }
   
  public render() {
    return (
      
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
        <div className="Days" ><br/><br/><NavLink className="day-btn" to="/Repertuar" >Dzisiaj</NavLink> <NavLink className="day-btn" to="/Repertuar/1" >Śr</NavLink>  <NavLink className="day-btn" to="/Repertuar/1" >Czw</NavLink>  <NavLink className="day-btn" to="/Repertuar/1" >Pt</NavLink>  <NavLink className="day-btn" to="/Repertuar/1" >Sob</NavLink>  <NavLink className="day-btn" to="/Repertuar/1" >Nie</NavLink> <br/></div>
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

    
    );
  }
}

export default Screening;
export interface IState {
  movies: IMovies[]
}

export interface IMovies {
  id: number,
  title: string,
  description: string,
  picture: string,
  icon: string,
  genre: string,
  watchingTime: string,
  director: string,
  
}

/*import * as React from "react";
import '../Events/Events.css'
import Modal from 'react-modal';



export default class MovieSchedule extends React.Component<any, any>{

    constructor(props:any) {
        super(props)

        this.state = {
            isActive: false
        }
    }  
    
    
    public componentWillMount(){
        Modal.setAppElement('body');
    }

    public toggleModal = () => {
        this.setState({
            isActive:!this.state.isActive
        })
    }

    public render(){

        return(
            <div className='event-wrap'>
                <div className='event-details'>
                <button className="details-btn text-sm" onClick={this.toggleModal}>Zobacz szczegóły</button>
                <Modal className='modal-style' isOpen={this.state.isActive} onRequestClose={this.toggleModal}>
                    
                    <button className="details-btn-inner text-sm"onClick={this.toggleModal}>Zamknij</button>
                   
                    <div className="event-more-details">
                        <div className="date">
                            <h3>Kiedy?<br/></h3>
                            {this.props.screening.screeningDate}
                        </div>
                    </div>
                    <button className="sign-in-btn text-lg">Zapisz się</button>
                    
                    
                </Modal>
            </div>
                          
            </div>
        );
    }
    
}*/