import * as React from 'react';
import 'src/assets/css/Details.css';
import 'src/assets/css/Spinner.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { NavLink } from 'react-router-dom';
import Fade from '../App/Fade';
import './Rating.css'
import Reviews from '../Movies/Reviews'



class Details extends React.Component<any, IState> {

  public state: IState = {
    "reviews":[],
    "review": {
      "idReview": 0,
      "author": "",
      "review1": "",
      "idMovies": 0,
    },
    "loading": true,
    "currentRating": 0,
    "rating": [],
    "ratingTest": {
      "idRating": 0,
      "idMovies": 0,
      "ratingNumber": 0
    },
    "movie": {
      "id": 0,
      "title": "",
      "description": "",
      "picture": "",
      "rating": 0
    },
    textareaValue: "",
    errorMessage: ""
  };

  constructor(props: IState) {
    super(props);
    this.onChangeReview = this.onChangeReview.bind(this);
    this.addReview = this.addReview.bind(this);
    this.onChange = this.onChange.bind(this);
    this.changeTextArea = this.changeTextArea.bind(this);
  }

  public onChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { Id } = this.props.match.params;
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
    
    for(let k=checkCount; k<checkValue.length-1; k++){
      console.log(k)
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
    const ratingCopy = this.state.ratingTest;
    ratingCopy.ratingNumber = +e.currentTarget.value;
    ratingCopy.idMovies = Id;
    this.setState({ratingTest: ratingCopy})
   this.SendRating();
}

public async SendRating(){
    const result =  await fetch('https://localhost:44371/cinema/AddRating?rating=' + this.state.ratingTest.ratingNumber + '&id=' + this.state.ratingTest.idMovies, {
      method: 'POST'
    });
    let currentRating = await result.json();
    currentRating *= 2;
    currentRating = Math.round(currentRating);
    currentRating /= 2;
    this.setState({currentRating});
}


  public async componentDidMount() {
    const userStorage = localStorage.getItem("User");
    let user;
    if (userStorage !== null){
       user = JSON.parse(userStorage);
       this.setState({errorMessage:""})
    }
    else{
      this.setState({errorMessage:"Musisz być użytkownikiem, żeby dodawać opinie!"})
      return;
    }
    const { Id } = this.props.match.params;
    let reviews;
    // const { movie } = this.props.location.state
    const result = await fetch('https://localhost:44371/cinema/GetMovie?id=' + Id);
    const movie = await result.json();
    const result2 = await fetch('https://localhost:44371/cinema/GetRating?id=' + Id);
    let currentRating = await result2.json();
    const result3 = await fetch('https://localhost:44371/cinema/GetReviews?id=' + Id + '&user=' + user.response.username)
    if (result3.ok){
       reviews = await result3.json();
    }
    
    currentRating *= 2;
    currentRating = Math.round(currentRating);
    currentRating /= 2;
    this.setState({
      movie,
      loading: false,
      currentRating,
      reviews
    });
    
  }

  public onChangeReview = (e: any) => {
    e.preventDefault();
    const reviewCopy = JSON.parse(JSON.stringify(this.state.review));
    const { Id } = this.props.match.params;
        reviewCopy[e.currentTarget.name] = e.currentTarget.value;
    reviewCopy.idMovies = Id;
  
    this.setState({ review: reviewCopy, textareaValue: e.currentTarget.value});
}

public changeTextArea(){
  console.log("jestem");
  this.setState({textareaValue: ''})
}

public async addReview(){
  const userStorage = localStorage.getItem("User");
  let user;
  if (userStorage !== null){
     user = JSON.parse(userStorage);
     this.setState({errorMessage:""})
  }
  else{
    this.setState({errorMessage:"Musisz być użytkownikiem, żeby dodawać opinie!"})
    return;
  }

  if(this.state.textareaValue === ""){
    this.setState({errorMessage:"Nie możesz dodawać pustych opinii!"})
    return;
  }
  else{
    this.setState({errorMessage:""})
  }
  
 
  await this.changeTextArea();



  await fetch('https://localhost:44371/cinema/AddReview', {
      method: 'post',
      headers: {
        'Accept': 'application/json, text/plain, */*',
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + user.response.token
      },
      body: JSON.stringify({author: user.response.username, review1: this.state.review.review1, idMovies: this.state.review.idMovies})
    }).then(res=>res.json())
      .then(res => console.log(res));
    this.setReviews();
}

public async setReviews(){
  let reviews;
  const { Id } = this.props.match.params;
  const result3 = await fetch('https://localhost:44371/cinema/GetReviews?id=' + Id)
      if (result3.ok){
         reviews = await result3.json();
      }
      this.setState({
        reviews
      });
      console.log(reviews);
     
}

  public render() {
    let content;
    let reviewContent;
    let reviewCheck;
  
    
    if (this.state.reviews !== undefined){
      reviewCheck =   <div className="reviews comment-form">
      
      {this.state.reviews.map(review => 
                        <Reviews key={review.idReview} review={review}/>)}
      </div>

    }
    else{
      reviewCheck =   <div className="reviews comment-form"> <br/><br/>
      <h1 className="text-white monte text-center">Ten film nie ma jeszcze żadnych opinii!</h1>
      </div>
      
    }
  
    if (this.state.loading) {
      content = <div className="lds-ring"><div /><div /><div /><div /></div>
    }
    else {
      content =<div> <div className="flex flex-wrap bg-black">
      
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
    <div className="container">
    <div className="smileybox">	
    <h1 className="RatingNumb">{this.state.currentRating}</h1>
        <label htmlFor="r1" className="check"><input value="1" type="checkbox" id="r1" onChange={this.onChange}/><i className="em em-weary"/></label>
        <label htmlFor="r2" className="check"><input value="2" type="checkbox" id="r2" onChange={this.onChange}/><i className="em em-worried"/></label>
        <label htmlFor="r3" className="check"><input value="3" type="checkbox" id="r3" onChange={this.onChange}/><i className="em em-blush"/></label>
        <label htmlFor="r4" className="check"><input value="4" type="checkbox" id="r4" onChange={this.onChange}/><i className="em em-smiley"/></label>
        <label htmlFor="r5" className="check"><input value="5" type="checkbox" id="r5" onChange={this.onChange}/><i className="em em-sunglasses"/></label>
    </div>
</div>

</div>

reviewContent = <div> <h1 className="review-header text-white monte text-center">Opinie</h1><br/><br/>
<div className="comment-form text-center"> 
<label className="error-label2 font-bold text-red">{this.state.errorMessage}</label>
<textarea value={this.state.textareaValue} rows={5} id="reviewArea" name="review1" onChange={this.onChangeReview} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" placeholder="Opinia..."/><br/>

<button onClick={this.addReview} className="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">Dodaj Opinie!</button>

</div>


 </div>
    }
    return (
        
      <div>
      {content}
      {reviewContent}
      {reviewCheck}
      </div>
     

    );
  }
}

export default Details;
export interface IState {
  movie: IMovie,
  loading: boolean,
  currentRating: number,
  rating: IRating[],
  ratingTest: IRating,
  reviews: IReviews[],
  review: IReviews,
  textareaValue: string,
  errorMessage: string
}
export interface IMovie {
  id: number,
  title: string,
  description: string,
  picture: string,
  rating: number
}
export interface IRating {
  idRating: number,
  idMovies: number,
  ratingNumber: number
}
export interface IReviews {
  idReview: number,
  idMovies: number,
  review1: string,
  author: string
}