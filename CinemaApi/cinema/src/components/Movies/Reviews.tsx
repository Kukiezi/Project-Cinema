import * as React from "react";
import 'src/assets/css/App.css'



export default class Reviews extends React.Component<any, any>{

    constructor(props: any) {
        super(props);
        this.state = {review: this.props.review};
      }
    // public componentWillReceiveProps(props: any) {
    //     const { review } = this.props;
    //     if (props.review !== review) {
    //         this.setState({review: props.review});
    //     // console.log(props.review);
    //     }
    //   }

public render() {
   // console.log(this.state.review.author);
        return (
         
            <div>
            <div className="text-white monte border-white">
                <p className="font-bold">{this.state.review.author}</p><br/>
                <p className="italic">{this.state.review.review1}</p>
                <hr className="white-hr"/>
                <br/> <br/>
            </div>
            
            </div>
           )
}


}
