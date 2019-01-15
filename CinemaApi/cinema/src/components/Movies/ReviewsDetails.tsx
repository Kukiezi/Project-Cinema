import * as React from "react";
import 'src/assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';



export default class ReviewsDetails extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.onChangeReview = this.onChangeReview.bind(this);
        this.addReview = this.addReview.bind(this);
        this.changeTextArea = this.changeTextArea.bind(this);
        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);
        this.state = {
            "original":[],
            "reviews":[],
            "review2": {
              "idReview": 0,
              "author": "",
              "review1": "",
              "idResponse": 0,
              "idMovies": 0,
              "vote": 0
            },
            "textareaValue": "",
            "errorMessage": "",
            loading: true,
            review: this.props.review,
            points: 0,
            userReview: {
                "username": "",
                "idReview": 0,
            },
            vote: 0,
            field: "",
            displayField: true
        };
      }
      
      public onChangeReview = (e: any) => {
        e.preventDefault();
        const reviewCopy = JSON.parse(JSON.stringify(this.state.review2));
            reviewCopy[e.currentTarget.name] = e.currentTarget.value;
      
        this.setState({ review2: reviewCopy, textareaValue: e.currentTarget.value});
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
    

      
      // const { Id } = this.state.review.idReview;
      await fetch('https://localhost:44371/cinema/AddResponse', {
          method: 'post',
    
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json',
            'Authorization': "Bearer " + user.response.token
          },
          body: JSON.stringify({author: user.response.username, review1: this.state.review2.review1, idMovies: this.state.review.idMovies, idResponse: this.props.idResponse })
        }).then(res=>res.json())
        // .then(res => console.log(res));
      
        await this.setState({field: "", displayField: !this.state.displayField})
        
        this.props.setReviews();
    }
   
      public  displayField = () => {
        this.setState({
            displayField: !this.state.displayField
        })
      
        if(this.state.displayField)
        {
            this.setState({
                field : (<div className="comment-form text-center"> 
                <label className="error-label2 font-bold text-red">{this.state.errorMessage}</label>
                <textarea rows={5} id="reviewArea" name="review1" onChange={this.onChangeReview} className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:outline-none focus:shadow-outline" placeholder="Opinia..."/><br/>
                
                <button onClick={this.addReview} className="bg-transparent hover:bg-blue text-blue-dark font-semibold hover:text-white py-2 px-4 border border-blue hover:border-transparent rounded">Dodaj Opinie!</button>
                
                </div> )
            })
        }
        else if(!this.state.displayField)
        {
            this.setState({
                field: ""
            })
        }
    }

      public async componentDidMount(){
        const userStorage = localStorage.getItem("User");
        let user;
   
        if (userStorage !== null){
           user = JSON.parse(userStorage);
        }
        else{
        //   this.setState({errorMessage:"Musisz być użytkownikiem, żeby dodawać opinie!"})
          return;
        }

        
        const result = await fetch('https://localhost:44371/cinema/GetPoints?id='+ this.state.review.idReview + '&user=' + user.response.username);
        const review = await result.json();
        await this.setState({ review });
    
      }

      public async upVote(){
        const userStorage = localStorage.getItem("User");
        let user;
        let data;
        if (userStorage !== null){
           user = JSON.parse(userStorage);
            await this.setState({userReview:{
                username: user.response.username,
                idReview: this.state.review.idReview,
            }})
            data = JSON.stringify(this.state.userReview);
            await fetch('https://localhost:44371/cinema/UpVote', {
                method: 'post',
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json',
                  'Authorization': "Bearer " + user.response.token
                },
                body: data
              }).then(res=>res.json())
                .then(res => this.setState({review: res.response}));
        }
        else{
        //   this.setState({errorMessage:"Musisz być użytkownikiem, żeby dodawać opinie!"})
          return;
        }
       

         

        // console.log(this.state.review.idReview);
        // const result = await fetch('https://localhost:44371/cinema/UpVote?id='+ this.state.review.idReview);
        // const review = await result.json();
        // this.setState({ review });
      }

      public async downVote(){
        const userStorage = localStorage.getItem("User");
        let user;
        let data;
        if (userStorage !== null){
           user = JSON.parse(userStorage);
            await this.setState({userReview:{
                username: user.response.username,
                idReview: this.state.review.idReview,
            }})
            data = JSON.stringify(this.state.userReview);
         
        }
        else{
        //   this.setState({errorMessage:"Musisz być użytkownikiem, żeby dodawać opinie!"})
          return;
        }
    
        await fetch('https://localhost:44371/cinema/DownVote', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json',
              'Authorization': "Bearer " + user.response.token
            },
            body: data
          }).then(res=>res.json())
            .then(res => this.setState({review: res.response}));

            // console.log(this.state.review);

        // console.log(this.state.review.idReview);
        // const result = await fetch('https://localhost:44371/cinema/UpVote?id='+ this.state.review.idReview);
        // const review = await result.json();
        // this.setState({ review });
      }
 

public render() {
    const arrowUp = document.getElementById('arrow-up');
    const arrowDown = document.getElementById('arrow-down');
    let arrowUpClass;
    let arrowDownClass;
    if (arrowUp !== null && arrowDown !== null){
        if (this.state.review.vote === 0){
            arrowUpClass = 'arrow-grey'
            arrowDownClass = 'arrow-grey'
        }
        else if (this.state.review.vote === 1){
            arrowUpClass = 'arrow-white'
            arrowDownClass = 'arrow-grey'
        }
        else if (this.state.review.vote === 2){
            arrowUpClass = 'arrow-grey'
            arrowDownClass = 'arrow-white'
        }
    }
  
        let reviewClass;
        if (this.state.review.idResponse != null){
            reviewClass = 'review-nohr'
        }
        return (
         
      
            <div className="text-white monte border-white">
             <div className={reviewClass}> 
                <p className="font-bold">{this.state.review.author}</p><br/>
                <p className="review-text italic">{this.state.review.review1}</p><br/>
                <div className="points-section">
                    <p>{this.state.review.points}</p>
                </div>
                <div className="vote-section">
                <a id="arrow-up" onClick={this.upVote}><FontAwesomeIcon className={arrowUpClass} icon="arrow-up" /> </a>
                <a id="arrow-down" onClick={this.downVote}><FontAwesomeIcon className={arrowDownClass} icon="arrow-down" /></a>
                <br/>   <br/>
                <button className="monte text-grey hover:text-white" onClick = {this.displayField}> <FontAwesomeIcon icon="comment" /> Odpowiedz</button>
                {this.state.field}
                </div>
                </div>
                <hr className="white-hr"/>
                <br/> <br/>
            </div>
            
       
           )
}


}
