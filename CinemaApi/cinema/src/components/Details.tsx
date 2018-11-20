import * as React from 'react';
import 'src/assets/css/Details.css';
import 'src/assets/css/Spinner.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom';
import Fade from './Fade';
import 'src/assets/css/Rating.css'



class Details extends React.Component<any, IState> {

  public state: IState = {
    "loading": true,
    "currentRating": 0,
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
  }

  public onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const checkValue = document.querySelectorAll("input");
    const checkStar = document.querySelectorAll("label");
    const checkSmiley = document.querySelectorAll("i");
    let checkCount = 0;
    for(let i=0; i<checkValue.length; i++){
        if(checkValue[i]===e.target){
            checkCount = i+1;
        }
    }
    for(let j=0; j<checkCount; j++){
        checkValue[j].checked = true;
        checkStar[j].className = "rated";
        checkSmiley[j].style.display = "none";
    }
    
    for(let k=checkCount; k<checkValue.length; k++){
        checkValue[k].checked = false;
        checkStar[k].className = "check"
        checkSmiley[k].style.display = "none";	
    }
    if(checkCount === 1){
        document.querySelectorAll("i")[0].style.display = "block";
    }
    if(checkCount === 2){
        document.querySelectorAll("i")[1].style.display = "block";
    }
    if(checkCount === 3){
        document.querySelectorAll("i")[2].style.display = "block";
    }
    if(checkCount === 4){
        document.querySelectorAll("i")[3].style.display = "block";
    }
    if(checkCount === 5){
        document.querySelectorAll("i")[4].style.display = "block";
    }
    console.log(e.currentTarget.value);
    this.setState({currentRating: +e.currentTarget.value})
   this.SendRating();
}

public async SendRating(){

    // const result =await fetch('https://localhost:44371/cinema/AddRating?rating=' + this.state.currentRating);
    const result =  await fetch('https://localhost:44371/cinema/AddRating?rating=' + this.state.currentRating, {
      method: 'POST'
    });
    const movie = await result.json();
    

    console.log(movie);
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
    <div className="container">
          <div className="smileybox">	
              <h1>Rating Stars</h1>
              <label htmlFor="r1" className="check"><input value="1" type="checkbox" id="r1" onChange={this.onChange}/><i className="em em-weary"/></label>
              <label htmlFor="r2" className="check"><input value="2" type="checkbox" id="r2" onChange={this.onChange}/><i className="em em-worried"/></label>
              <label htmlFor="r3" className="check"><input value="3" type="checkbox" id="r3" onChange={this.onChange}/><i className="em em-blush"/></label>
              <label htmlFor="r4" className="check"><input value="4" type="checkbox" id="r4" onChange={this.onChange}/><i className="em em-smiley"/></label>
              <label htmlFor="r5" className="check"><input value="5" type="checkbox" id="r5" onChange={this.onChange}/><i className="em em-sunglasses"/></label>
          </div>
      </div>
      </div>
     

    );
  }
}

export default Details;
export interface IState {
  movie: IMovie,
  loading: boolean,
  currentRating: number
}
export interface IMovie {
  id: number,
  title: string,
  description: string,
  picture: string,
  rating: number
}