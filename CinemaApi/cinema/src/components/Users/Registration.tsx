import * as React from 'react';
import 'src/assets/css/Spinner.css';
import Modal from 'react-modal';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'


class Registration extends React.Component<{}, {isActive: boolean}> {
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
           
                <div className="registration-form ">
                <button className="registration-btn" onClick={this.toggleModal}>Zarejestruj </button>
                <Modal className="modal-style"isOpen={this.state.isActive} onRequestClose={this.toggleModal}>
                    <div className="registration-form-inner">
                        <h2 className="form-title">Załóż konto</h2>
                        <form>
                            <button className="close-btn" onClick={this.toggleModal}>Zamknij</button>

                            <div className="form-item">
                                <label htmlFor="email-id" className="block text-sm font-bold mb-2">EMAIL</label>
                                <input placeholder="Podaj email " id="email-id" type="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="form-item">
                                <label htmlFor="password-id" className="block text-sm font-bold mb-2">HASŁO</label>
                                <input placeholder="Podaj hasło "id="password-id" type="password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="form-item">
                                <label htmlFor="confirm-password-id" className="block text-sm font-bold mb-2">POWTÓRZ HASŁO</label>
                                <input placeholder="Powtórz hasło "id="confirm-password-id" type="password" name="confirm-password" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />                           
                            </div>
                            <div className="form-actions text-center pt-4">
                                <button className="button bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Zarejestruj się</button>
                            </div>
                        </form>
                    </div>
                    </Modal>
                </div>
            
        )
    }
}

export default Registration;