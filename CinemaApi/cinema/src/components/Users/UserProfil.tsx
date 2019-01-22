import * as React from "react";
import './UserProfil.css';
import {Tabs, Tab, TabList, TabPanel} from 'react-tabs';

export default class UserProfil extends React.Component<any,any>{

    constructor(props:any){
        super(props)
        this.onChange = this.onChange.bind(this);
        this.performChange= this.performChange.bind(this);
        this.state = {
          
          credentials:{
              firstName: "",
              lastName: "",
              username: ""
          },
          res: [],
          valid: false,
          message: "",
          loading: false
    }
      }

      public onChange = (e: React.FormEvent<HTMLInputElement>) => {
      
        const credentialsCopy = JSON.parse(JSON.stringify(this.state.credentials));
        credentialsCopy[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ credentials: credentialsCopy});
        console.log(credentialsCopy);
    }
    
    public async performChange(){
      this.setState({loading: true});
      await fetch('https://localhost:44371/api/update', {
          method: 'post',
          headers: {
            'Accept': 'application/json, text/plain, */*',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({firstName: this.state.credentials.firstName, lastName: this.state.credentials.lastName, 
              username: this.state.credentials.username})
        }).then(res2=>res2.json())
          // .then(res2 => console.log(res2))
          .then(res2 => this.setState({res: res2}));
    
    
      }


    public render() {

        let user;
        const userStorage = localStorage.getItem("User");
        if (userStorage != null){
           user = JSON.parse(userStorage);
        }

        return(
            <div className="form ">
                <div className="inner-details">
                    <div className="profile">
                        <div className="username">
                            {user.response.username}
                        </div>
                    </div>
                    <div className="info"> 

                        <Tabs>
                            <TabList className='menu'>
                                <Tab>Dane</Tab>
                                <Tab>Rezerwacje</Tab>

                            </TabList>
                    
                            <TabPanel>
                                <div className="form-inner">
                                    <div className="form-item">
                                        <label htmlFor="firstName-id" className="block text-sm font-bold mb-2">IMIÄ˜</label>
                                        <input onChange={this.onChange} placeholder="Podaj imiÄ™ "defaultValue={this.state.credentials.firstName} id="firstName-id"  name="firstName" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="lastName-id" className="block text-sm font-bold mb-2">NAZWISKO</label>
                                        <input onChange={this.onChange} placeholder="Podaj nazwisko " defaultValue={this.state.credentials.lastName}id="lastName-id" name="lastName" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="username-id" className="block text-sm font-bold mb-2">LOGIN</label>
                                        <input onChange={this.onChange} placeholder="Podaj login "defaultValue={this.state.credentials.userName} id="username-id" name="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-grey-darker leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                                    </div>

                                    <div className="form-actions text-center pt-4">
                                        <button onClick={this.performChange} className="button bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">Zapisz zmiany</button><br/><br/>
                                    </div>
                    
                                </div>
                            </TabPanel>
                            <TabPanel>
                            <p>
                                content 2
                            </p>
                            <p>
                                Source:{' '}
                                <a href="https://en.wikipedia.org/wiki/Luigi" target="_blank">
                                Wikipedia
                                </a>
                            </p>
                            </TabPanel>
                            
                        </Tabs>
                    </div>
                </div>
            </div>
        );

       
    }
}