import * as React from 'react';
import 'src/assets/css/Spinner.css';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { NavLink } from 'react-router-dom';
import Modal from 'react-modal';
import decode from 'jwt-decode';
import 'src/assets/css/Spinner.css';
// import { Redirect } from 'react-router';

class Login extends React.Component<any, any> {
    constructor(props:any){
        super(props)
        this.onChange = this.onChange.bind(this);
        this.performLogin = this.performLogin.bind(this);
        this.logState = this.logState.bind(this);
        this.checkToken = this.checkToken.bind(this);
        this.state = {
            isActive: false,
            credentials:{
                login: "",
                password:"",
            },
            res: [],
            valid: false,
            message: "",
            loading: false
    }
}

    public componentWillMount(){
        Modal.setAppElement('body');
        this.setState({message: ""});
    }

   public toggleModal = () => {
        this.setState({
            isActive:!this.state.isActive,
            message: ""
        })
    }

    public async performLogin(){
        this.setState({loading: true});
        // await this.dim(true);
        await fetch('https://localhost:44371/api/login', {
            method: 'post',
            headers: {
              'Accept': 'application/json, text/plain, */*',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({usernameOrEmail: this.state.credentials.login, password: this.state.credentials.password})
          }).then(res2=>res2.json())
             .then(res2 => console.log(res2))
            .then(res2 => this.setState({res: res2}));
         
            const tokenState = this.checkToken();
            const refreshTokenState = this.checkRefreshToken();
            if (tokenState && refreshTokenState){
                await localStorage.setItem("User", JSON.stringify(this.state.res))
                 window.location.reload();
            }
        }

        public checkToken(){
            try{
                if (this.state.res.errorMessage !== null){
                    console.log(this.state.res.errorMessage);
                    this.setState({message: this.state.res.errorMessage, loading: false});
                  
                    return false;
                }
                const { exp } = decode(this.state.res.response.token)
                console.log(exp);
                if (exp < new Date().getTime() / 1000){
                  return false;
                }
              } catch (e){
                return false;
              }

              return true;
        }

        public checkRefreshToken(){
            try{
                if (this.state.res.errorMessage !== null){
                    console.log(this.state.res.errorMessage);
                    this.setState({message: this.state.res.errorMessage, loading: false});
                    return false;
                }
                const { exp } = decode(this.state.res.response.refreshToken)
                console.log(exp);
                if (exp < new Date().getTime() / 1000){
                  return false;
                }
              } catch (e){
                return false;
              }

              return true;
        }

        public logState(){
            console.log(this.state.res);
        }
            

     public onChange = (e: React.FormEvent<HTMLInputElement>) => {
      
        const credentialsCopy = JSON.parse(JSON.stringify(this.state.credentials));
        credentialsCopy[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ credentials: credentialsCopy});
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
            <button className="user-options block mt-4 no-underline lg:inline-block lg:mt-0 text-white mr-6" onClick={this.toggleModal}>Zaloguj</button>
                <Modal className="modal-login"isOpen={this.state.isActive} onRequestClose={this.toggleModal}>
                <div className="form-inner">
                    <h2 className="form-title">Logowanie</h2>
                
                        <button className="close-btn" onClick={this.toggleModal}>x</button>
                        <div className="form-item">
                            <label htmlFor="email-id" className="block text-sm font-bold mb-2 w-1/4">LOGIN / EMAIL</label>
                            <input onChange={this.onChange} placeholder="Podaj login lub email " id="email-id" type="email" name="login" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="form-item">
                            <label htmlFor="password-id" className="block text-sm font-bold mb-2">HASŁO</label>
                            <input onChange={this.onChange} placeholder="Podaj hasło "id="password-id" type="password" name="password" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker mb-3 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                        </div>
                        <div className="text-center pt-4">
                            <button onClick={this.performLogin} className="button bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Zaloguj się</button><br/><br/>
                            {content}
                        </div>
                        {/* <div className="form-description text-center pt-16">
                            <NavLink to="/ResetPassword" className="no-underline hover:text-red-dark text-white font-bold focus:outline-none focus:shadow-outline ">Zapomniałeś/aś hasła?</NavLink>
                        </div> */}
                 
                 </div>
                 </Modal>
            </>
        )
    }
}

export default Login;