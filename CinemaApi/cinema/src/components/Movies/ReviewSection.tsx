import * as React from "react";
import 'src/assets/css/App.css'
import Reviews from '../Movies/Reviews'


export default class ReviewSection extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
    
        this.state = {
            "original":[],
            "reviews":[],
            "review": {
              "idReview": 0,
              "author": "",
              "review1": "",
              "idMovies": 0,
              "vote": 0
            },
        };
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
        //   loading: false,
          original,
          reviews
        });
        
      }

      public render(){
        let reviewCheck;
      
        
        if (this.state.reviews !== undefined){
          reviewCheck =   <div className="reviews comment-form">
          
          {this.state.original.map(review => 
                            <Reviews key={review.idReview} review={review}/>)}
          
          {this.state.reviews.map(review => 
                            <Reviews key={review.idReview} review={review}/>)}
          </div>
    
        }
          return(
            <div>
            {reviewCheck}
            </div>
          )
      }

    }