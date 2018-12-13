import * as React from "react";
import './Events.css'
import Modal from 'react-modal';



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

    public render(){

        return(
            <div className='event-wrap'>
                <div className='event-title text-lg'>                    
                        {this.props.culturalevent.eventName}
                </div>
                <div className='event-details'>
                <button className="details-btn text-sm" onClick={this.toggleModal}>Zobacz szczegóły</button>
                <Modal className='modal-style' isOpen={this.state.isActive} onRequestClose={this.toggleModal}>
                    
                    <button className="details-btn-inner text-sm"onClick={this.toggleModal}>Zamknij</button>
                    <div className="title">
                      <h2>  {this.props.culturalevent.eventName} </h2>
                    </div>
                   
                    <div className="event-description text-sm">
                        {this.props.culturalevent.eventDescription}
                    </div>
                    <div className="event-more-details">
                        <div className="date">
                            <h3>Kiedy?<br/></h3>
                            {this.props.culturalevent.eventDate}
                        </div>
                        <div className="seats">
                            <h3>Liczba miejsc:<br/></h3>
                            {this.props.culturalevent.seatsLimit}
                        </div>
                    </div>
                    <button className="sign-in-btn text-lg">Zapisz się</button>
                    
                    
                </Modal>
            </div>
                          
            </div>
        );
    }
    
}
