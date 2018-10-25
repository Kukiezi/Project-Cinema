import * as React from 'react';
import 'src/assets/css/Details.css'
class Details extends React.Component<any, IState> {

  public state: IState = {
    "id": 0,
    "movie": {
      "id": 0,
      "title": "",
      "description": "",
      "picture": ""
    }
};

constructor(props: IState) {
  super(props);
} 

  public async componentDidMount() {
    const { Id } = this.props.match.params;
    const { movie } = this.props.location.state
     this.setState({ 
         movie,
        id: Id,
      });
     }

  public render() {
    return (
      <div className="details"> 
       <div className="details-picture">
       <img src={this.state.movie.picture} width="1920px" height="500px"/>
       </div>
        <h1 className="details-title">{this.state.movie.title}</h1>
        <h3 className="details-desc">{this.state.movie.description}</h3>
      </div>
    );
  }
}

export default Details;
export interface IState {
  id: number,
  movie: IMovie;
}
export interface IMovie {
  id: number,
  title: string,
  description: string,
  picture: string
}