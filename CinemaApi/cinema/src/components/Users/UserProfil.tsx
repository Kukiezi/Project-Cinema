import * as React from "react";
import './UserProfil.css';
import { Tabs, Tab, TabList, TabPanel } from 'react-tabs';
import Reservations from '../Users/UserReservations';
import UserEvents from '../Users/UserEvents';
export default class UserProfil extends React.Component<any, any>{

    constructor(props: any) {
        super(props)
        this.onChange = this.onChange.bind(this);
        this.performChange = this.performChange.bind(this);
        this.updateStorage = this.updateStorage.bind(this);
        this.state = {
            reservations:[],
            events:[],
            credentials: {
                firstName: "",
                lastName: "",
                username: ""
            },
            res: [],
            valid: false,
            message: "",
            loading: false,
            User:{
                firstName: "",
                lastName: "",
                email: ""
              },
        }
    }

    public async componentDidMount(){
        const userStorage = localStorage.getItem("User");
        let user;
      if (userStorage !== null){
         user = JSON.parse(userStorage);
         console.log(user.response.id)
      }
        const result = await fetch('https://localhost:44371/api/GetUserReservations?userId=' + user.response.id);
        const reservations = await result.json();
        const result4 = await fetch('https://localhost:44371/api/GetEvents?userId=' + user.response.id);
        const events = await result4.json();
        console.log(events);

        const result2 = await fetch('https://localhost:44371/cinema/GetUser?id=' + user.response.id);
        const User = await result2.json();
        console.log(reservations);
        console.log(events);
        console.log(User)
        // console.log(seatsReservation[0])
        await this.setState({User, reservations, events})
        console.log(this.state.seatsReservation)
        // console.log(this.state.seatsReservation.reservation)
    }

    public onChange = (e: React.FormEvent<HTMLInputElement>) => {

        const credentialsCopy = JSON.parse(JSON.stringify(this.state.credentials));
        credentialsCopy[e.currentTarget.name] = e.currentTarget.value;
        this.setState({ credentials: credentialsCopy});
        // console.log(credentialsCopy);
    }

    public async performChange() {
        this.setState({ loading: true });

        let user;
        const userStorage = localStorage.getItem("User");
        if (userStorage != null) {
            user = JSON.parse(userStorage);
            console.log(user.response.lastName);
            if (this.state.credentials.firstName === "") {
                const credentialsCopy = JSON.parse(JSON.stringify(this.state.credentials));
                credentialsCopy.firstName = user.response.firstName;
                await this.setState({ credentials: credentialsCopy })


            }
            if (this.state.credentials.lastName === "") {
                const credentialsCopy = JSON.parse(JSON.stringify(this.state.credentials));
                credentialsCopy.lastName = user.response.lastName;
                await this.setState({ credentials: credentialsCopy })
            }
            if (this.state.credentials.username === "") {
                const credentialsCopy = JSON.parse(JSON.stringify(this.state.credentials));
                credentialsCopy.username = user.response.username;
                await this.setState({ credentials: credentialsCopy })
            }

            await fetch('https://localhost:44371/api/update', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json',
                    'Authorization': "Bearer " + user.response.token
                },
                body: JSON.stringify({
                    id: user.response.id, firstName: this.state.credentials.firstName, lastName: this.state.credentials.lastName,
                    username: this.state.credentials.username
                })
            }).then(res2 => res2.json())
                // .then(res2 => console.log(res2))
                .then(res2 => this.setState({ res: res2 }));
            this.updateStorage();
        }


    }

    public updateStorage() {
        const userStorage = localStorage.getItem("User");
        if (userStorage != null) {
            localStorage.setItem("User", JSON.stringify(this.state.res))
            window.location.reload();
        }
    }


    public render() {

        let user;
        const userStorage = localStorage.getItem("User");
        if (userStorage != null) {
            user = JSON.parse(userStorage);
        }


        return (
            <div className="form ">
                <div className="inner-details">
                    <div className="profile">
                        <div className="username">
                            {user.response.username}
                        </div>
                    </div>
                    <div className="info">

                        <Tabs>
                            <TabList className='menu-user'>
                                <Tab>Dane</Tab>
                                <Tab>Rezerwacje</Tab>
                                <Tab>Wydarzenia</Tab>

                            </TabList>

                            <TabPanel>
                                <div className="form-inner">
                                    <div className="form-item">
                                        <label htmlFor="firstName-id" className="block text-sm font-bold mb-2">IMIĘ</label>
                                        <input onChange={this.onChange} placeholder="Podaj imię " defaultValue={user.response.firstName} id="firstName-id" name="firstName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="lastName-id" className="block text-sm font-bold mb-2">NAZWISKO</label>
                                        <input onChange={this.onChange} placeholder="Podaj nazwisko " defaultValue={user.response.lastName} id="lastName-id" name="lastName" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                                    </div>
                                    <div className="form-item">
                                        <label htmlFor="username-id" className="block text-sm font-bold mb-2">LOGIN</label>
                                        <input onChange={this.onChange} placeholder="Podaj login " defaultValue={user.response.username} id="username-id" name="username" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-800 leading-tight focus:text-blue focus:outline-none focus:shadow-outline" />
                                    </div>

                                    <div className="form-actions text-center pt-4">
                                        <button onClick={this.performChange} className="button bg-red hover:bg-red-dark text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mt-4">Zapisz zmiany</button><br /><br />
                                    </div>

                                </div>
                            </TabPanel>
                            <TabPanel>
                                {/* <p className="mt-12"> Nie dokonałeś jeszcze żadnych rezerwacji</p> */}
                                <div className="content-center">
                               
                                <h3 className="white2">Twoje Rezerwacje:</h3>
                                    {this.state.reservations.map(reservations =>
                                        <Reservations key={reservations} reservations={reservations} />)}
                                </div>
                            </TabPanel>
                            <TabPanel>
                                {/* <p className="mt-12"> Nie dokonałeś jeszcze żadnych rezerwacji</p> */}
                                <div className="content-center">
                               
                                <h3 className="white2">Twoje Wydarzenia:</h3>
                                    {this.state.events.map(events =>
                                        <UserEvents key={events.idSigningIn} events={events} />)}
                                </div>
                            </TabPanel>

                        </Tabs>
                    </div>
                </div>
            </div>
        );


    }
}