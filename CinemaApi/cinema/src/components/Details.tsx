import * as React from 'react';
import 'src/assets/css/Details.css';
import 'src/assets/css/Spinner.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom';
import Fade from './Fade';


class Details extends React.Component<any, IState> {

  public state: IState = {
    "loading": true,
    "movie": {
      "id": 0,
      "title": "",
      "description": "",
      "picture": ""
    }
  };

  constructor(props: IState) {
    super(props);
  }

  public async componentDidMount() {
    const { Id } = this.props.match.params;
    // const { movie } = this.props.location.state
    const result = await fetch('https://localhost:44371/cinema/GetMovie?id=' + Id);
    const movie = await result.json();
    this.setState({
      movie,
      loading: false
    });
  }

  public render() {
    let content;
    let details;
    if (this.state.loading) {
      content = <div className="lds-ring"><div /><div /><div /><div /></div>
    }
    else {
      content =  <Fade cascade={true}><div className="details-picture"> <img src={this.state.movie.picture} /></div>  </Fade>
      details =        <Fade >  <div className="details-text">
      <div className="buy-absolute">
        <div className="fontawesome">
          <FontAwesomeIcon icon="ticket-alt" />
        </div>
        <NavLink className="subnav" to="/BuyTicket"  >
          Kup Bilet<br />
        </NavLink>
        <NavLink className="subnav" to="/ReserveTicket" >
         Zarezerwuj Bilet
        </NavLink>
      </div>
    </div></Fade>
    }
    return (
      <div className="details">

    
        {content}
      

        <br /><br />
        <div className="details-right">
        <Fade cascade={true}>  
        <div className="cont">
        <h1 className="details-title">{this.state.movie.title}</h1>
       
        <h3 className="details-desc">{this.state.movie.description}</h3>
        </div>
        </Fade>
        
        {details}
        
      </div>
    
      </div>
      
    );
  }
}

export default Details;
export interface IState {
  movie: IMovie,
  loading: boolean
}
export interface IMovie {
  id: number,
  title: string,
  description: string,
  picture: string
}