import * as React from 'react';
import 'src/assets/css/Details.css';
import 'src/assets/css/Spinner.css';
class Details extends React.Component<any, IState> {

  public state: IState = {
    "loading": true,
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
    // const { movie } = this.props.location.state
    const result = await fetch('https://localhost:44371/cinema/GetMovie?id='+Id);
    const movie = await result.json();
     this.setState({ 
         movie,
         loading: false
      });
     }

  public render() {
    let content;
    if (this.state.loading){
      content = <div className="lds-ring"><div/><div/><div/><div/></div>;
    }
    else{
     content =<div className="details-picture">  <img src={this.state.movie.picture} width="1920px" height="500px"/>  </div>
      
     
    }
    return (
      
      <div className="details"> 
     
    
      { content }
    
        <h1 className="details-title">{this.state.movie.title}</h1>
        <h3 className="details-desc">{this.state.movie.description}</h3>
      </div>
    );
  }
}

export default Details;
export interface IState {
  movie: IMovie,
  loading: boolean
}
export interface IMovie {
  id: number,
  title: string,
  description: string,
  picture: string
}