import * as React from 'react';

import 'src/assets/css/App.css';
import 'src/assets/css/ReserveTicket.css';



class ReserveTicket extends React.Component{


    public state = { showMenu: true }
    public toggleMenu = () => {
       
      this.setState({
        showMenu: !this.state.showMenu
      })
    
    }

  public render() {
    const menuVis = this.state.showMenu ? 'seat-free' : 'seat-taken';
    
    return (
      
      <div className="App">
      <div className="row-left">
      <button id="A1" className={menuVis} onClick={this.toggleMenu}/>
      <button id="A2" className={menuVis} onClick={this.toggleMenu}/>
      <button id="A3" className={menuVis} onClick={this.toggleMenu}/>
      <button id="A4" className={menuVis} onClick={this.toggleMenu}/>
      <button id="A5" className={menuVis} onClick={this.toggleMenu}/>
      <button id="A6" className={menuVis} onClick={this.toggleMenu}/>
      <button id="A7" className={menuVis} onClick={this.toggleMenu}/>
      <button id="A8" className={menuVis} onClick={this.toggleMenu}/>
      <button id="A9" className={menuVis} onClick={this.toggleMenu}/>
      <button id="A10" className={menuVis} onClick={this.toggleMenu}/>
      
      
      
      </div>  
      </div>
    );
  }
}

export default ReserveTicket;


