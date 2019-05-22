import * as React from 'react';
import 'src/assets/css/Spinner.css';
import Modal from 'react-modal';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import decode from 'jwt-decode';
import 'src/assets/css/Spinner.css';

class Registration extends React.Component<any, any> {
    constructor(props:any){
        super(props)
        this.onChange = this.onChange.bind(this);
        this.performRegister= this.performRegister.bind(this);
        this.checkToken = this.checkToken.bind(this);
        this.state = {
            isActive: false,
            credentials:{
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            },
            res: [],
            valid: false,
            message: "",
            loading: false
    }
    }

    public componentWillMount(){
        Modal.setAppElement('body');
    }

   public toggleModal = () => {
        this.setState({
            isActive:!this.state.isActive,
            message: "",
            credentials:{
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                password: "",
                confirmPassword: ""
            }
        })
    }

    public async performRegister(){
        this.setState({loading: true});
        await fetch('https://localhost:44371/api/register', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({firstName: this.state.credentials.firstName, lastName: this.state.credentials.lastName, 
                username: this.state.credentials.username, email: this.state.credentials.email, password: this.state.credentials.password, confirmPassword: this.state.credentials.confirmPassword})
          }).then(res2=>res2.json())
            // .then(res2 => // console.log(res2))
            .then(res2 => this.setState({res: res2}));

            const tokenState = this.checkToken();
            if (tokenState){
                await localStorage.setItem("User", JSON.stringify(this.state.res))
                window.location.reload();
            }
  
        }

        public checkToken(){
            try{
                if (this.state.res.errorMessage !== null){
                    // console.log(this.state.res.errorMessage);
                    this.setState({message: this.state.res.errorMessage, loading: false});
                    return false;
                }
                const { exp } = decode(this.state.res.response.token)
                // console.log(exp);
                if (exp < new Date().getTime() / 1000){
                  return false;
                }
              } catch (e){
                return false;
              }

              return true;
        }

    public onChange = (e: React.FormEvent<HTMLInputElement>) => {
      
        const credentialsCopy = JSON.parse(JSON.stringify(this.state.credentials));
        credentialsCopy[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ credentials: credentialsCopy});
        // console.log(credentialsCopy);
    }

    public dim(bool: any){
        if (typeof bool==='undefined') {bool=true;} // so you can shorten dim(true) to dim()
        const dimmer = document.getElementById('dimmer');
        if (dimmer !== null){
              dimmer.style.display=(bool?'block':'none');
        }
    }  

    public render() {
        let content;
        if (this.state.loading) {
            this.dim(true);
          }
        else{
            this.dim(false);
            content = <label className="error-label font-bold text-red">{this.state.message}</label>
        }         
        return (
           
                <>
                <button className="user-options block mt-4 no-underline lg:inline-block lg:mt-0 text-white mr-6" onClick={this.toggleModal}>Zarejestruj </button>
                <Modal className="modal-register"isOpen={this.state.isActive} onRequestClose={this.toggleModal}>
                    <div className="form-inner">
                        <h2 className="form-title">Załóż konto</h2>
                            <button className="close-btn" onClick={this.toggleModal}>x</button>
                            <div className="form-item">
                                <label htmlFor="firstName-id" className="block text-sm font-bold mb-2">IMIĘ</label>
                                <input onChange={this.onChange} placeholder="Podaj imię " id="firstName-id"  name="firstName" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="form-item">
                                <label htmlFor="lastName-id" className="block text-sm font-bold mb-2">NAZWISKO</label>
                                <input onChange={this.onChange} placeholder="Podaj nazwisko " id="lastName-id" name="lastName" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="form-item">
                                <label htmlFor="username-id" className="block text-sm font-bold mb-2">LOGIN</label>
                                <input onChange={this.onChange} placeholder="Podaj login " id="username-id" name="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="form-item">
                                <label htmlFor="email-id" className="block text-sm font-bold mb-2">EMAIL</label>
                                <input onChange={this.onChange} placeholder="Podaj email " id="email-id" type="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="form-item">
                                <label htmlFor="password-id" className="block text-sm font-bold mb-2">HASŁO</label>
                                <input onChange={this.onChange} placeholder="Podaj hasło "id="password-id" type="password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                            </div>
                            <div className="form-item">
                                <label htmlFor="confirmPassword-id" className="block text-sm font-bold mb-2">POWTÓRZ HASŁO</label>
                                <input onChange={this.onChange} placeholder="Powtórz hasło "id="confirmPassword-id" type="password" name="confirmPassword" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />                           
                            </div>
                            <div className="form-actions text-center pt-4">
                                <button onClick={this.performRegister} className="button bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Zarejestruj się</button><br/><br/>
                                {content}
                            </div>
                    </div>
                    </Modal>
                </>
            
        )
    }
}

export default Registration;