import * as React from "react";
import './Slider.css'

class Navbar extends React.Component<any, any>{

public render() {

        return (
            <div className="container2">
            <div className="slider">
              <div className="slide">
       
                <h1 className="slider-text">Venom</h1>
             
              </div>
              <div className="slide">
                <h1 className="slider-text">Tarzan</h1>
              </div>
              <div className="slide">
                <h1 className="slider-text">Kraina Lodu</h1>
              </div>
              <div className="slide">
                <h1 className="slider-text">Iniemamocni 2</h1>
              </div>
              <div className="slide">
                <h1 className="slider-text">Venom</h1>
              </div>
            </div>
          </div>

           )
}

}

export default Navbar;

