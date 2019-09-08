import * as React from "react";
import './Slider.css'
import Slide from './Slide';
// const slideBackground = {
//   background: 'linear-gradient(to bottom, rgba(0,0,0,0) , rgba(0,0,0,1)), url(http://badfeelingmag.com/wp-content/uploads/2018/09/contest-win-tickets-to-the-montreal-premiere-of-venom-2.jpg) no-repeat center center'
// }

class Navbar extends React.Component<any, any>{
  constructor(props: any) {
    super(props);


  }
  public render() {

    console.log(this.props.movies);

    return (
      <div className="container2">
        <div className="slider">
          {this.props.movies.map(movie =>
            <Slide key={movie.id} movie={movie} />)}
        </div>
      </div>

    )
  }

}

export default Navbar;

