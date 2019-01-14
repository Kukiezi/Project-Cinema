import * as React from "react";
import 'src/assets/css/App.css'
import Reviews from '../Movies/Reviews'


export default class ReviewSection extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
    
        this.state = {
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

        const result3 = await fetch('https://localhost:44371/cinema/GetReviewAnswers?id=' + Id + '&user=' + username)
        if (result3.ok){
           reviews = await result3.json();
        }
        this.setState({
        //   loading: false,
          reviews
        });
        
      }

      public render(){
        let reviewCheck;
      
        
        if (this.state.reviews !== undefined){
          reviewCheck =   <div className="reviews comment-form">
          
          {this.state.reviews.map(review => 
                            <Reviews key={review.idReview} review={review}/>)}
          </div>
    
        }
          return(
            {reviewCheck}
          )
      }

    }