import React from "react";
import Footer from "../footer.component";
import Header from "../header.component";
import { Redirect } from 'react-router-dom';

class getDatastoreInfos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IP: "10.13.20.61",
            username: "administrator@vsphere.local",
            password: "Hpinvent2012!",
            submitted: false,
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.setState({ submitted: true });
    }

    render() {
        const { IP, username, password, submitted } = this.state;
        if (submitted) {
            return (
                < Redirect to={{
                    pathname: '/createDatastore',
                    state: { username: username, password: password, IP: IP }
                }}
                />
            );
        } else {
            return (
                <div>
                    <Header />
                    <div className="form-style-5">
                        <form onSubmit={this.handleSubmit}>
                            <fieldset>
                                <legend>Choix du serveur Simplivity</legend>
                                <label>IP OVC SImplivity : </label>
                                <select
                                    name="IP"
                                    id="IP"
                                    value={IP}
                                    onChange={this.handleChange}
                                >
                                    <option value="10.13.20.61">Ulis-1</option>
                                </select>
                                <p>{IP}</p>
                                <br />
                                <label>Username Vcenter : </label>
                                <input
                                    type="text"
                                    placeholder="administrator@vshpere.local"
                                    name="username"
                                    id="username"
                                    value={username}
                                    onChange={this.handleChange}
                                    required
                                />
                                <label>Password Vcenter : </label>
                                <input
                                    type="text"
                                    name="password"
                                    id="password"
                                    value={password}
                                    onChange={this.handleChange}
                                    required
                                />
                                <br />
                                <input type="submit" value="Submit" />
                            </fieldset>
                        </form>
                    </div>
                    <Footer />
                </div>
            );
        }
    }
}

export default getDatastoreInfos;