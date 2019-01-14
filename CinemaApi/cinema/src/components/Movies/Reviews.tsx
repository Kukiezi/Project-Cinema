import * as React from "react";
import 'src/assets/css/App.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


export default class Reviews extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.upVote = this.upVote.bind(this);
        this.downVote = this.downVote.bind(this);
        this.state = {
            review: this.props.review,
            points: 0,
            userReview: {
                "username": "",
                "idReview": 0,
            },
            vote: 0
        };
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

        console.log(this.state.review);
        const result = await fetch('https://localhost:44371/cinema/GetPoints?id='+ this.state.review.idReview + '&user=' + user.response.username);
        const review = await result.json();
        await this.setState({ review });
    
        console.log(review.vote);
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
            console.log(this.state.userReview);
        }
        else{
        //   this.setState({errorMessage:"Musisz być użytkownikiem, żeby dodawać opinie!"})
          return;
        }
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

            console.log(this.state.review);

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
            console.log(this.state.userReview);
        }
        else{
        //   this.setState({errorMessage:"Musisz być użytkownikiem, żeby dodawać opinie!"})
          return;
        }
        console.log("siema downvote");
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

    if (arrowUp !== null && arrowDown !== null){
        if (this.state.review.vote === 0){
            arrowUp.style.color = "white";
            arrowDown.style.color = "blue";
        }
        else if (this.state.review.vote === 1){
            arrowUp.style.color = "green";
            arrowDown.style.color = "green";
        }
        else if (this.state.review.vote === 2){
            arrowUp.style.color = "yellow";
            arrowDown.style.color = "yellow";
        }
    }
  
   
        return (
         
            <div>
            <div className="text-white monte border-white">
                <p className="font-bold">{this.state.review.author}</p><br/>
                <p className="review-text italic">{this.state.review.review1}</p><br/>
                <div className="points-section">
                    <p>{this.state.review.points}</p>
                </div>
                <div className="vote-section">
                <a id="arrow-up" onClick={this.upVote}><FontAwesomeIcon className="arrow-up" icon="arrow-up" /> </a>
                <a id="arrow-down" onClick={this.downVote}><FontAwesomeIcon className="arrow-down" icon="arrow-down" /></a>
                </div>
               
                <hr className="white-hr"/>
                <br/> <br/>
            </div>
            
            </div>
           )
}


}
