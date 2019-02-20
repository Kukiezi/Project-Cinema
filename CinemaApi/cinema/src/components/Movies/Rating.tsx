import * as React from "react";
import './Rating.css';


export default class Rating extends React.Component<any, any>{

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
    // console.log(e.currentTarget.value);
    this.FetchIt();
}

public async FetchIt(){

  const result = await fetch('https://cinemaapi.azurewebsites.net/cinema/GetMovies');
  const movies = await result.json();
  this.setState({ movies });
}

public render() {


        return (
          <div className="container">
          <div className="smileybox">	
              <label htmlFor="r1" className="check"><input value="1" type="checkbox" id="r1" onChange={this.onChange}/><i className="em em-weary"/></label>
              <label htmlFor="r2" className="check"><input value="2" type="checkbox" id="r2" onChange={this.onChange}/><i className="em em-worried"/></label>
              <label htmlFor="r3" className="check"><input value="3" type="checkbox" id="r3" onChange={this.onChange}/><i className="em em-blush"/></label>
              <label htmlFor="r4" className="check"><input value="4" type="checkbox" id="r4" onChange={this.onChange}/><i className="em em-smiley"/></label>
              <label htmlFor="r5" className="check"><input value="5" type="checkbox" id="r5" onChange={this.onChange}/><i className="em em-sunglasses"/></label>
          </div>
      </div>
           )
}


}
