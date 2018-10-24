import * as React from "react";
import 'src/assets/css/Slider.css'

class Navbar extends React.Component<any, any>{

public render() {

        return (
            <div className="container">
            <div className="slider">
              <div className="slide">
                <h1>Venom</h1>
              </div>
              <div className="slide">
                <h1>Tarzan</h1>
              </div>
              <div className="slide">
                <h1>Kraina Lodu</h1>
              </div>
              <div className="slide">
                <h1>Iniemamocni 2</h1>
              </div>
              <div className="slide">
                <h1>Garfield</h1>
              </div>
            </div>
          </div>

           )
}

}

export default Navbar;

