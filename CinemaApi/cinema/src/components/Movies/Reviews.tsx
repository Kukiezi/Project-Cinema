import * as React from "react";
import 'src/assets/css/App.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { NavLink } from 'react-router-dom';


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
                "action": 0
            },
            vote: 0,
            responseCount: 0,
            disabled: false
        };
      }

      
      public async componentDidMount(){
        const result2 = await fetch('https://localhost:44371/cinema/GetResponseCount?id='+ this.state.review.idReview);
        const responseCount = await result2.json();
        await this.setState({ responseCount });
      }

      public async upVote(){
  
        const userStorage = localStorage.getItem("User");
        let user;
        let data;
        let action;
        if (userStorage !== null){
            await this.setState({disabled: true})
            if (this.state.review.vote === 0){
               const reviewCopy = {...this.state.review}
               reviewCopy.vote = 1;
               reviewCopy.points += 1;
               action = 0;
               this.setState({review:reviewCopy})
           }
           else if (this.state.review.vote === 1){
            const reviewCopy = {...this.state.review}
            reviewCopy.vote = 0;
            reviewCopy.points -=1;
            action = 1;
             this.setState({review:reviewCopy})
           }
           else if (this.state.review.vote === 2){
            const reviewCopy = {...this.state.review}
            reviewCopy.vote = 1;
            reviewCopy.points += 2;
            action = 2;
             this.setState({review:reviewCopy})
           }
    
           user = JSON.parse(userStorage);
            await this.setState({userReview:{
                username: user.response.username,
                idReview: this.state.review.idReview,
                action
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
              }).then(res=>res.json());
                // .then(res => this.setState({review: res.response}));

                await this.setState({disabled: false})
        }
        else{
        //   this.setState({errorMessage:"Musisz być użytkownikiem, żeby dodawać opinie!"})
        await this.setState({disabled: false})
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
        let action;
        if (userStorage !== null){
            await this.setState({disabled: true})
            if (this.state.review.vote === 0){
               const reviewCopy = {...this.state.review}
               reviewCopy.vote = 2;
               reviewCopy.points -= 1;
               action = 0;
               this.setState({review:reviewCopy})
           }
           else if (this.state.review.vote === 1){
            const reviewCopy = {...this.state.review}
            reviewCopy.vote = 2;
            reviewCopy.points -=2;
            action = 1;
             this.setState({review:reviewCopy})
           }
           else if (this.state.review.vote === 2){
            const reviewCopy = {...this.state.review}
            reviewCopy.vote = 0;
            reviewCopy.points += 1;
            action = 2;
             this.setState({review:reviewCopy})
           }
           user = JSON.parse(userStorage);
            await this.setState({userReview:{
                username: user.response.username,
                idReview: this.state.review.idReview,
                action
            }})
            data = JSON.stringify(this.state.userReview);
            await fetch('https://localhost:44371/cinema/DownVote', {
                method: 'post',
                headers: {
                  'Accept': 'application/json, text/plain, */*',
                  'Content-Type': 'application/json',
                  'Authorization': "Bearer " + user.response.token
                },
                body: data
              }).then(res=>res.json());

              await this.setState({disabled: false})
               // .then(res => this.setState({review: res.response}));
        }
        else{
            await this.setState({disabled: false})
        //   this.setState({errorMessage:"Musisz być użytkownikiem, żeby dodawać opinie!"})
          return;
        }
    
      
   
          
            // console.log(this.state.review);

        // console.log(this.state.review.idReview);
        // const result = await fetch('https://localhost:44371/cinema/UpVote?id='+ this.state.review.idReview);
        // const review = await result.json();
        // this.setState({ review });
      }
 

public render() {
    let user;
    let checkRole = false;
    let deleteOpinion;
    const userStorage = localStorage.getItem("User");
    if (userStorage != null){
       user = JSON.parse(userStorage);
       if (user.response.role === "User"){
           checkRole = true;
       }
    }
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

    if (checkRole){
        deleteOpinion = <><FontAwesomeIcon className="delete-btn" icon="times" /></>
    } 
    else{
        deleteOpinion = <></>
    }
  
    
        return (
         
      
            <div className="text-white monte border-white">
                <p className="font-bold">{this.state.review.author}</p><br/>
                <p className="review-text italic">{this.state.review.review1}</p><br/>
                <div className="points-section">
                    <p>{this.state.review.points}</p>
                </div>
                <div className="vote-section">
                <button id="arrow-up" disabled={this.state.disabled} onClick={this.upVote}><FontAwesomeIcon className={arrowUpClass} icon="arrow-up" /> </button>
                <button id="arrow-down" disabled={this.state.disabled} onClick={this.downVote}><FontAwesomeIcon className={arrowDownClass} icon="arrow-down" /></button>
                <br/> <br/>
                <NavLink className="no-underline" to={{
                pathname: '/ReviewSection/'+this.state.review.idReview
              }}>
              <p className="monte text-grey hover:text-white"> <FontAwesomeIcon icon="comment" /> Odpowiedzi({this.state.responseCount})</p> 
         </NavLink>
                {deleteOpinion}
                </div>
                <hr className="white-hr"/>
                <br/> <br/>
            </div>
           )
}


}
