import * as React from 'react';
import 'src/assets/css/Details.css';
import 'src/assets/css/Spinner.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
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
      content = <div className="flex flex-wrap bg-black">
      
        <div className="xl:w-1/2 sm:w-full flex-none text-white text-center  bg-black px-4 py-2 m-2">
        <Fade>
          <img src={this.state.movie.picture} />
          </Fade>
        </div>
      
       
        <div className="xl:w-2/5 sm:w-full flex-none monte text-white text-justify bg-black px-4 py-2 m-2">
        <Fade>
          <h1 className="leading-loose font-normal tracking-wide">{this.state.movie.title}</h1>
          <h3 className="font-thin">{this.state.movie.description}</h3>
          </Fade>
        
        
              {/* <FontAwesomeIcon className="fontawesome" icon="ticket-alt" /> */}

          <NavLink className="buy-btn" to="/BuyTicket" >
              Kup Bilet
            </NavLink>
          <NavLink className="buy-btn" to="/ReserveTicket" >
              Zarezerwuj Bilet
      </NavLink>
  
      
     
         
         
        </div>
        
        </div>


 
    }
    return (
      
        
      <div>
    {content}
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