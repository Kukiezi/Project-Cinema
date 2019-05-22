import * as React from "react";
import './Events.css'
import Modal from 'react-modal';
import Moment from 'react-moment';


export default class CulturalEvents extends React.Component<any, any>{

    constructor(props:any) {
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
    public signFor =() => {
        const userStorage = localStorage.getItem("User");
        const user = JSON.parse(userStorage);
        fetch('https://localhost:44371/cinema/AddSignFor?idEvent=' + this.props.culturalevent.idCulturalEvent + "&idUser=" + user.response.id);
       // console.log(this.props);
    }

    public render(){

        return(

            <div className='event-wrap'>
                <div className='event-title text-lg '>                    
                        {this.props.culturalevent.eventName}
                </div>
                <div className="event-date">
                    <Moment format="YYYY/MM/DD">
                        {this.props.culturalevent.eventDate}
                    </Moment>
                </div>
                <div className='event-details'>
                <button className="details-btn text-sm" onClick={this.toggleModal}>Zobacz szczegóły</button>
                <Modal className='modal-events' isOpen={this.state.isActive} onRequestClose={this.toggleModal}>
                    
                    <button className="details-btn-inner text-sm"onClick={this.toggleModal}>Zamknij</button>
                    <div className="title">
                      <h2>  {this.props.culturalevent.eventName} </h2>
                    </div>
                   
                    <div className="event-description text-sm">
                        {this.props.culturalevent.eventDescription}
                    </div>
                    <div className="event-more-details">
                         <div className="date">
                            <h3 className="mb-2">Kiedy ?<br/></h3>
                            
                            <Moment format="YYYY-MM-DD">
                                {this.props.culturalevent.eventDate}
                            </Moment>
                            </div>
                        <div className="event-time">
                            <h3 className="mb-2">O której ?<br/></h3>
                            <Moment format=" kk:mm">
                                {this.props.culturalevent.eventDate}
                            </Moment>
                        
                        </div> 
                        <div className="seats">
                            <h3 className="mb-2">Liczba miejsc:<br/></h3>
                            {this.props.culturalevent.seatsLimit}
                        </div>
                        <button className="details-btn text-sm" onClick={this.signFor}>Zapisz się</button>
                    </div>
                    
                    
                </Modal>
            </div>
                          
            </div>
        );
    }
    
}
