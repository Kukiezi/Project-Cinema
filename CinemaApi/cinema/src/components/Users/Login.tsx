import * as React from 'react';
import 'src/assets/css/Spinner.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import * as jwtDecode from 'jwt-decode';

class Login extends React.Component<any, any> {
    constructor(props:any){
        super(props)
        this.onChange = this.onChange.bind(this);
        this.performLogin = this.performLogin.bind(this);
        this.logState = this.logState.bind(this);
        this.state = {
            isActive: false,
            credentials:{
                login: "",
                password:"",
            },
            res: []
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

    
    public async performLogin(){
        await fetch('https://localhost:44371/api/login', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({usernameOrEmail: this.state.credentials.login, password: this.state.credentials.password})
          }).then(res2=>res2.json())
            // .then(res2 => console.log(res2))
            .then(res2 => this.setState({res: res2}));

            const decoded: string = jwtDecode(this.state.res.response.token)
            console.log(this.state.res)
            console.log(this.state.res.response.token);
           
            console.log(decoded);
        }

        public logState(){
            console.log(this.state.res);
        }
            

     public onChange = (e: React.FormEvent<HTMLInputElement>) => {
      
        const credentialsCopy = JSON.parse(JSON.stringify(this.state.credentials));
        credentialsCopy[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ credentials: credentialsCopy});
    }

    public render() {

        return (
            <div className="form monte text-white text-center text-xl lg:flex-grow">
            <button className="login-btn block no-underline mt-4 lg:inline-block lg:mt-0 text-white mr-6" onClick={this.toggleModal}>Zaloguj</button>
                <Modal className="modal-style"isOpen={this.state.isActive} onRequestClose={this.toggleModal}>
                <div className="form-inner">
                    <h2 className="form-title">Logowanie</h2>
                
                        <button className="close-btn" onClick={this.toggleModal}>x</button>
                        <div className="form-item">
                            <label htmlFor="email-id" className="block text-sm font-bold mb-2">EMAIL</label>
                            <input onChange={this.onChange} placeholder="Podaj email " id="email-id" type="email" name="login" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="form-item">
                            <label htmlFor="password-id" className="block text-sm font-bold mb-2">HASŁO</label>
                            <input onChange={this.onChange} placeholder="Podaj hasło "id="password-id" type="password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="form-actions text-center pt-4">
                            <button onClick={this.performLogin} className="button bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Zaloguj się</button>
                        </div>
                        {/* <div className="form-description text-center pt-16">
                            <NavLink to="/ResetPassword" className="no-underline hover:text-red-dark text-white font-bold focus:outline-none focus:shadow-outline ">Zapomniałeś/aś hasła?</NavLink>
                        </div> */}
                 
                 </div>
                 </Modal>
            </div>
        )
    }
}

export default Login;