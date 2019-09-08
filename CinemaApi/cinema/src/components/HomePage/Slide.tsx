import * as React from "react";
import 'src/assets/css/App.css'
import { NavLink } from 'react-router-dom';
// import image from 'src/assets/images/images';


export default class Slide extends React.Component<any, any>{

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
        const movieIconProps = this.props.movie.picture
        const req = require.context("../../assets/images", false, /.*\.(jpg|png|jpeg)$/);
        for (const key of req.keys()) {
            movies.fileName = key.substring(2);
            if (movies.fileName === movieIconProps) {
                movies.src = req(key);
                this.setState({ movies })
            }
        }
    }

    public render() {
        return (
            <NavLink to={{
                pathname: 'Details/' + this.props.movie.id,
                state: {
                  movie: this.props.movie
                }
              }}>
            <div className="slide" style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0) , rgba(0,0,0,1)), url(' + this.state.movies.src + ') no-repeat center center' }}>
                <h1 className="slider-text">{this.props.movie.title}</h1>
            </div>
            </NavLink>
        )
    }


}

export interface ISrc {
    id: number,
    name: string,
    src: string
}