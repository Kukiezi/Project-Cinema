import * as React from 'react';
import './Newsletter.css';
import { Row, Col } from 'antd';
import NewsletterForm from './NewsletterForm';
import Loading from './Loading';
import axios from 'axios';
import { apiUrl, notify } from './Helpers/indeks';

class Newsletter extends React.Component<any, any> {
//   constructor(props) {
//     super(props);
//     this.state = {
//       email: '',
//       loading: false
//     }
//   }

public state: IState = {
    email: '',
    loading: false,
};

constructor(props: IState) {
    super(props);
  
  } 

  handleLoadingState = loading => {
    //Set loading flag
    this.setState({ loading: loading });
  }

  handleSendEmail = email => {
    this.handleLoadingState(true);
    axios.post(`${apiUrl}/subscribe`, {
      email: email
    }).then(res => {
      if(res.data.success) {
        //If the response from MailChimp is good...
        notify('success', 'Subscribed!', res.data.success);
        this.setState({ email: '' });
        this.handleLoadingState(false);
      } else {
        //Handle the bad MailChimp response...
        notify('error', 'Unable to subscribe!', res.data.error);
        this.handleLoadingState(false);
      }
    }).catch(error => {
      //This catch block returns an error if Node API returns an error
      notify('error', 'Error. Please try again later.', error.message);
      this.handleLoadingState(false);
    });
  }

  handleOnChangeEmail = email => {
    this.setState({
      email: email
    })
  }

  render() {
    return (
      <div className="App">
        <header className="newsletter-header">
          <Row>
            <i className="material-icons">email</i>
            <h1>Simple React Newsletter Tutorial</h1>
          </Row>
        </header>
        <section className="newsletter-content">
          <Row>
            <Col span={24}>
              <p className="lead-txt">Subscribe to my awesome newsletter or <span className="txt-highlight">suffer</span>! Mwhahaha! Just kidding lolz :)</p>
              {this.state.loading
                ? <Loading message="Working on it..." />
                : <NewsletterForm handleSendEmail={this.handleSendEmail} handleOnChangeEmail={this.handleOnChangeEmail} email={this.state.email} />
              }
            </Col>
          </Row>
        </section>
        <footer className="newsletter-footer">
          Newsletter
        </footer>
      </div>
    );
  }
}

export default Newsletter;

export interface IState {
    email: string,
    loading: boolean
   }
   

// OLD VERSION

// import * as React from 'react';
// import 'src/assets/css/Spinner.css';
// import './Newsletter.css'
// // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// // import { NavLink } from 'react-router-dom';
// import Modal from 'react-modal';



// class Newsletter extends React.Component<{}, {isActive: boolean}> {
//     constructor(props:any){
//         super(props)

//         this.state = {
//             isActive: false
//         }
//     }

//     public componentWillMount(){
//         Modal.setAppElement('body');
//     }

//    public toggleModal = () => {
//         this.setState({
//             isActive:!this.state.isActive
//         })
//     }

//     public render() {

//         return (
//             <div className="login-form">
//             <button className="news-btn" onClick={this.toggleModal}>Newsletter</button>
//                 <Modal className="modal-style"isOpen={this.state.isActive} onRequestClose={this.toggleModal}>
//                 <div className="login-form-inner">
//                     <h2 className="form-title">Zapisz się do Newslettera</h2>
//                     <form>
//                         <div className="news-desc">Jeśli chcesz na bieżąco otrzymywać informacje o naszych najnowszych seansach i planowanych wydarzeniach, zapisz się do naszego Newslettera! Czekają na ciebe niezapomniane przeżycia i atrakcyjne promocje!</div>
//                         <button className="close-btn" onClick={this.toggleModal}>Zamknij</button>
//                         <div className="form-item">
//                             <label htmlFor="email-id" className="block text-sm font-bold mb-2">EMAIL</label>
//                             <input placeholder="Podaj email " id="email-id" type="email" name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
//                         </div>
//                         <div className="form-actions text-center pt-4">
//                             <button className="button bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Zapisz się!</button>
//                         </div>
//                     </form>
//                  </div>
//                  </Modal>
//             </div>
//         )
//     }
// }

// export default Newsletter;