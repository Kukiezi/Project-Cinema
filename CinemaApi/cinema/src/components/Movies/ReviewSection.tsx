import * as React from "react";
import 'src/assets/css/App.css'
import ReviewsDetails from '../Movies/ReviewsDetails'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


export default class ReviewSection extends React.Component<any, any>{


    constructor(props: any) {
        super(props);
        this.setReviews = this.setReviews.bind(this);
        this.goPageBack = this.goPageBack.bind(this);
        this.state= {

          "original":[],
          "reviews":[],
          "review": {
              "idReview": 0,
              "author": "",
              "review1": "",
              "idResponse": 0,
              "idMovies": 0,
              "vote": 0,
              "points": 0
         },
        "textareaValue": "",
        "errorMessage": "",
        loading: true
      
        }
      }

      

      public async setReviews(){
        let reviews;
        const userStorage = localStorage.getItem("User");
        let user;
        let username;
        if (userStorage !== null){
           user = JSON.parse(userStorage);
           this.setState({errorMessage:""})
           username = user.response.username;
        }
        else{
          username = ""
        }
         const { Id } = this.props.match.params;
    
        const result3 = await fetch('https://cinemaapi.azurewebsites.net/cinema/GetReviewAnswers?id=' + Id + '&user=' + username)
            if (result3.ok){
               reviews = await result3.json();
            }
            this.setState({
              reviews,
              loading: false
            });
         
           
      }    

      public async componentDidMount() {
        const userStorage = localStorage.getItem("User");
        let user;
        let username;
        if (userStorage !== null){
           user = JSON.parse(userStorage);
           this.setState({errorMessage:""})
           username = user.response.username;
        }
        else{
          username = ""
        }
     
        const { Id } = this.props.match.params;
        let reviews;
        let original;

        const result2 = await fetch('https://cinemaapi.azurewebsites.net/cinema/GetReviewOriginal?id=' + Id + '&user=' + username)
        if (result2.ok){
           original = await result2.json();
        }
        const result3 = await fetch('https://cinemaapi.azurewebsites.net/cinema/GetReviewAnswers?id=' + Id + '&user=' + username)
        if (result3.ok){
           reviews = await result3.json();
        }
        this.setState({
          loading: false,
          original,
          reviews
        });
     

      }

      public goPageBack(){
        this.props.history.goBack()
      }

      public render(){
        let reviewCheck;
     
        if (this.state.loading) {
          reviewCheck = <div className="lds-ring"><div /><div /><div /><div /></div>
        }

        else if (this.state.reviews !== undefined){
          reviewCheck =   <div className="reviews comment-form">
        <button onClick={this.goPageBack}><p className="text-white monte font-bold"><FontAwesomeIcon className="text-white text-xl" icon="long-arrow-alt-left" /> POWRÓT</p></button>
        <br/><br/><br/>
          {this.state.original.map(review => 
                            <ReviewsDetails idResponse={this.props.match.params.Id} setReviews={this.setReviews} key={review.idReview} review={review}/>)}

                            
          
          {this.state.reviews.map(review => 
                            <ReviewsDetails idResponse={this.props.match.params.Id} setReviews={this.setReviews} key={review.idReview} review={review}/>)}
          </div>
        }
        else {
          reviewCheck =   <div className="reviews comment-form">
         <button onClick={this.goPageBack}><h3 className="text-white monte"><FontAwesomeIcon className="text-white" icon="long-arrow-alt-left" /> POWRÓT</h3></button>
        <br/><br/><br/>
          {this.state.original.map(review => 
                            <ReviewsDetails idResponse={this.props.match.params.Id} setReviews={this.setReviews} key={review.idReview} review={review}/>)}

          </div>
        }

      
          return(
            <div>
                 
            {reviewCheck}
            </div>
          )
      }

    }

