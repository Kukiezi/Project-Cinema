import * as React from 'react';
import Registration from './Registration';
import 'src/assets/css/App.css'


export default class Toogle extends  React.Component {

    public state = {
        on: false,
    }

    public toogle = () => {
        this.setState({
            on: !this.state.on
        })
    }
    public render() {
        return (
            <div className="regtoogle">
                {this.state.on && (
                    <Registration/>
                )}
                 <div className="monte flex text-white text-right text-xl lg:flex-grow pt-4 pb-4">
                <button onClick={this.toogle} className="flex no-underline mt-4 lg:inline-block lg:mt-0 text-white mr-6">Zarejestruj się</button>
                </div>
               
            </div>
            
        )
    }
}