import * as React from 'react';
import 'src/assets/css/Spinner.css';
import './Newsletter.css'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';



class Newsletter extends React.Component<{}, {isActive: boolean}> {
    constructor(props:any){
        super(props)

        this.state = {
            isActive: false
        }
    }

    public componentWillMount(){
        Modal.setAppElement('body');
    }

   public toggleModal = () => {
        this.setState({
            isActive:!this.state.isActive
        })
    }

    public render() {

        return (
            <div className="login-form">
            <button className="news-btn" onClick={this.toggleModal}>Newsletter</button>
                <Modal className="modal-style"isOpen={this.state.isActive} onRequestClose={this.toggleModal}>
                <div className="login-form-inner">
                    <h2 className="form-title">Zapisz się do Newslettera</h2>
                    <form>
                        <div className="news-desc">Jeśli chcesz na bieżąco otrzymywać informacje o naszych najnowszych seansach i planowanych wydarzeniach, zapisz się do naszego Newslettera! Czekają na ciebe niezapomniane przeżycia i atrakcyjne promocje!</div>
                        <button className="close-btn" onClick={this.toggleModal}>Zamknij</button>
                        <div className="form-item">
                            <label htmlFor="email-id" className="block text-sm font-bold mb-2">EMAIL</label>
                            <input placeholder="Podaj email " id="email-id" type="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="form-actions text-center pt-4">
                            <button className="button bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Zapisz się!</button>
                        </div>
                    </form>
                 </div>
                 </Modal>
            </div>
        )
    }
}

export default Newsletter;