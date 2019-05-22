import * as React from "react";
import 'src/assets/css/App.css'
import { NavLink } from 'react-router-dom';
// import image from 'src/assets/images/images';


export default class Movies extends React.Component<any, any>{

  constructor(props: any) {
    super(props);
   
    this.state = {
      imgSrc: "",
      movies: 
        {
          fileName: "",
          src: ""
        }
      
    }
  
  } 
   public async componentDidMount() {
    const movies = this.state.movies;
    const movieIconProps = this.props.movie.icon
    const req = require.context("../../assets/images", false, /.*\.(jpg|png)$/);
    for (const key of req.keys()) {
      movies.fileName = key.substring(2);
      if (movies.fileName === movieIconProps)
      {
        movies.src = req(key);
        this.setState({movies})
      }
    }
  }

  public render() {
    return (
      <div className="img__wrap">
        <div className="movie-picture">
          <img src={this.state.movies.src} />
        </div>

        {/* <img src={image} width="203.66px" height="300.89px"/> */}
        <NavLink to={{
          pathname: 'Details/' + this.props.movie.id,
          state: {
            movie: this.props.movie
          }
        }}>
          <div className="img__description_layer">

            <p>Więcej Informacji</p>
          </div></NavLink>
        <p> {this.props.movie.title}</p>
      </div>
    )
  }


}

export interface ISrc {
  id: number,
  name: string,
  src: string
}