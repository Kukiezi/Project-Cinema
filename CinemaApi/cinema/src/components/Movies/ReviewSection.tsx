import * as React from "react";
import 'src/assets/css/App.css'
import ReviewsDetails from '../Movies/ReviewsDetails'



export default class ReviewSection extends React.Component<any, any>{


    constructor(props: any) {
        super(props);
        this.onChangeReview = this.onChangeReview.bind(this);
        this.addReview = this.addReview.bind(this);
        this.changeTextArea = this.changeTextArea.bind(this);
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
        "errorMessage": ""
      
        }
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
      
     
      // await this.changeTextArea();
    

  
       const { Id } = this.props.match.params;
      await fetch('https://localhost:44371/cinema/AddResponse', {
          method: 'post',
    
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + user.response.token
          },
          body: JSON.stringify({author: user.response.username, review1: this.state.review.review1, idMovies: 2, idResponse: Id })
        }).then(res=>res.json())
         .then(res => console.log(res));
         this.setReviews();
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
      const result3 = await fetch('https://localhost:44371/cinema/GetReviewAnswers?id=' + Id + '&user=' + username)
          if (result3.ok){
             reviews = await result3.json();
          }
          this.setState({
            reviews
          });
       
         
    }    
            },
            loading: true
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
          loading: false,
          original,
          reviews
        });
        
      }

      public render(){
        let reviewCheck;
      
        if (this.state.loading) {
          reviewCheck = <div className="lds-ring"><div /><div /><div /><div /></div>
        }

        else if (this.state.reviews !== undefined){
          reviewCheck =   <div className="reviews comment-form">
          
          {this.state.original.map(review => 
                            <Reviews key={review.idReview} review={review}/>)}
          <div className="comment-form text-center"> 
          <label className="error-label2 font-bold text-red">{this.state.errorMessage}</label>
          <textarea value={this.state.textareaValue} rows={5} id="reviewArea" name="review1" onChange={this.onChangeReview} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" placeholder="Opinia..."/><br/>

          <button onClick={this.addReview} className="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">Dodaj Opinie!</button>

          </div>
                            <ReviewsDetails key={review.idReview} review={review}/>)}
          
          {this.state.reviews.map(review => 
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

