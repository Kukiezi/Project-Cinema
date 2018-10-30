import * as React from "react";
import 'src/assets/css/Rating.css'



export default class Rating extends React.Component<any, any>{



public render() {

        return (
            <div>
           <h1 className="rating-text">OCEŃ FILM</h1>
            <div className="rating">
             
              <input aria-flowto="rating0" className="rating__input" type="radio" name="rating" value="5" id="rating5"/>
              <label className="rating__label" htmlFor="rating5">☆
                <span className="rating__star">5 Stars</span> 
              </label>
              
              <input aria-flowto="rating5"  className="rating__input" type="radio" name="rating" value="4" id="rating4"/>
              <label className="rating__label" htmlFor="rating4">☆
                <span className="rating__star">4 Stars</span> 
              </label>
              
              <input aria-flowto="rating4" className="rating__input" type="radio" name="rating" value="3" id="rating3"/>
              <label className="rating__label" htmlFor="rating3">☆
                <span className="rating__star">3 Stars</span> 
              </label>
              
              <input aria-flowto="rating3" className="rating__input" type="radio" name="rating" value="2" id="rating2"/>
              <label className="rating__label" htmlFor="rating2">☆
                <span className="rating__star">2 Stars</span> 
              </label>
              
              <input aria-flowto="rating2" className="rating__input" type="radio" name="rating" value="1" id="rating1"/>
              <label className="rating__label" htmlFor="rating1">☆
                <span className="rating__star">1 Stars</span> 
              </label>
              
              <input aria-flowto="rating1" className="rating__input" type="radio" name="rating" value="0" id="rating0"/>
              <label className="rating__label rating__label--hidden" htmlFor="rating0">
                <span className="rating__star">Not rated yet </span>
              </label>
                
            </div>
            </div>
           )
}


}
