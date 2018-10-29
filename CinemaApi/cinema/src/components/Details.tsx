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
  
    if (this.state.loading) {
      content = <div className="lds-ring"><div /><div /><div /><div /></div>
    }
    else {
      content = <div className="flex flex-no-wrap bg-black ">
      
        <div className="w-1/2 flex-none text-white text-center  bg-black px-4 py-2 m-2">
        <Fade cascade={true}>
          <img src={this.state.movie.picture} />
          </Fade>
        </div>
      
       
        <div className="w-1/2 flex-none monte text-white text-justify bg-black px-4 py-2 m-2">
        <Fade cascade={true}>
          <h1 className="leading-loose font-normal tracking-wide">{this.state.movie.title}</h1>
          <h3 className="font-thin">{this.state.movie.description}</h3>
          </Fade>
          <Fade cascade={true}>
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
          </Fade>
        </div>
        
        </div>


 
    }
    return (
      
   
<div> {content}</div>
     
    



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