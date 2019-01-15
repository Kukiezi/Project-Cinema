import * as React from "react";
import 'src/assets/css/App.css'
import ReviewsDetails from '../Movies/ReviewsDetails'



export default class ReviewSection extends React.Component<any, any>{


    constructor(props: any) {
        super(props);

        this.state= {

          "original":[],
          "reviews":[],
          "review": {
              "idReview": 0,
              "author": "",
              "review1": "",
              "idResponse": 0,
              "idMovies": 0,
              "vote": 0
         },
        "textareaValue": "",
        "errorMessage": "",
        loading: true
      
        }
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

        const result2 = await fetch('https://localhost:44371/cinema/GetReviewOriginal?id=' + Id + '&user=' + username)
        if (result2.ok){
           original = await result2.json();
        }
        const result3 = await fetch('https://localhost:44371/cinema/GetReviewAnswers?id=' + Id + '&user=' + username)
        if (result3.ok){
           reviews = await result3.json();
        }
        this.setState({
          loading: false,
          original,
          reviews
        });
        // console.log(reviews)
      }

      public render(){
        let reviewCheck;
      
        if (this.state.loading) {
          reviewCheck = <div className="lds-ring"><div /><div /><div /><div /></div>
        }

        else if (this.state.reviews !== undefined){
          reviewCheck =   <div className="reviews comment-form">
          
          {this.state.original.map(review => 
                            <ReviewsDetails key={review.idReview} review={review}/>)}

                            
          
          {this.state.reviews.map(review => 
                            <ReviewsDetails key={review.idReview} review={review}/>)}
          </div>
        }
        else {
          reviewCheck =   <div className="reviews comment-form">
          
          {this.state.original.map(review => 
                            <ReviewsDetails key={review.idReview} review={review}/>)}

          </div>
        }

      
          return(
            <div>
            {reviewCheck}
            </div>
          )
      }

    }

