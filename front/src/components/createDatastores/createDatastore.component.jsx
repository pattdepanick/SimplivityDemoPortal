import React from "react";
import Footer from "../footer.component";
import Header from "../header.component";
import Loading from '../../assets/loading.gif';
import { Redirect } from 'react-router-dom';
import StatusCode from "./statusCode.component";

function printOptionsJSON(key, value) {
    return (
        key.map((key, i) =>
            < option key={key} value={key} > {value[i]}</option >
        )
    );
}

function findSameDataInList(volumelist, userinput) {
    var bool = volumelist.includes(userinput);
    return bool;
}

class createDatastore extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            IP: this.props.location.state.IP,
            username: this.props.location.state.username,
            password: this.props.location.state.password,
            namelist: "",
            clusterIDlist: "",
            clusterNamelist: "",
            policyIDlist: "",
            policyNamelist: "",
            name: "",
            size: "",
            clusterID: "",
            clusterName: "",
            policyID: "",
            policyName: "",
            statusCode: "",
            submitted: false,
            bistatus: true,
            newform: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const { IP, username, password } = this.state;
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ IP, username, password })
        };
        fetch('http://localhost:8080/getInfosDatastore', requestOptions)
            .then(response => response.json())
            .then(data => {
                if (data === 401 || data === 403 || data === 404 || data === 400) {
                    console.log(data);
                    this.setState({
                        statusCode: data,
                        submitted: true,
                        bistatus: false,
                    })
                } else {
                    this.setState({
                        namelist: data.name,
                        clusterIDlist: data.clusterID,
                        policyIDlist: data.policyID,
                        clusterNamelist: data.clusterName,
                        policyNamelist: data.policyName,
                        policyID: data.policyID[0],
                        clusterID: data.clusterID[0],
                        submitted: true,
                    })
                }
                console.log(this.state.statusCode);
            });
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({ [name]: value });
    }

    handleSubmit(e) {
        e.preventDefault();
        if (findSameDataInList(this.state.namelist, this.state.name)) {
            alert("ALERT ALERT - same Volume name detected, please change !!");
        } else {
            const { IP, username, password, name, size, clusterID, policyID } = this.state;
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ IP, username, password, name, size, clusterID, policyID })
            };
            fetch('http://localhost:8080/createDatastore', requestOptions)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    if (data === 401 || data === 403 || data === 404 || data === 400 || data === 415) {
                        console.log(data);
                        this.setState({
                            statusCode: data,
                            submitted: true,
                            bistatus: false,
                        })
                    } else {
                        this.setState({
                            statusCode: data.response,
                            newform: true
                        })
                    }
                    console.log(this.state.statusCode);
                });
        }
    }

    render() {
        const { username, password, name, size, clusterID, policyID, submitted, newform, statusCode } = this.state;
        const data = this.state;
        if (submitted === false && newform === false) {
            return (
                <div className="testt">
                    <h3> Si ca charge pendant trop longtemps, verifier que:</h3>
                    <ul>
                        <p>Vous etes connecte au demo center.</p>
                        <p>Vous ne vous etes pas trompe de username/password = {username} / {password}</p>
                        <br /><p>Si vous etes sure de vos reponses alors attendez une minute.</p>
                    </ul>
                    <img src={Loading} alt="Loading" />
                </div>
            );
        } else if (submitted === true && this.state.bistatus === false && newform === false) {
            return (
                <div>
                    <Header />
                    <div className="form-style-5">
                        <StatusCode data={data} />
                    </div>
                    <Footer />
                </div>
            );
        } else if (submitted === true && this.state.bistatus === true && newform === false) {
            return (
                <div>
                    <Header />
                    <div className="form-style-5">
                        <form onSubmit={this.handleSubmit}>
                            <fieldset>
                                <label>Nom Datastore : </label>
                                <input
                                    type="text"
                                    name="name"
                                    id="name"
                                    value={name}
                                    onChange={this.handleChange}
                                    required
                                />
                                <br />
                                <br />
                                <label>Size : </label>
                                <input
                                    type="number"
                                    name="size"
                                    id="size"
                                    value={size}
                                    onChange={this.handleChange}
                                    required
                                />
                                <br />
                                <br />
                                <label>Cluster :</label>
                                <select
                                    name="clusterID"
                                    id="clusterID"
                                    value={clusterID}
                                    onChange={this.handleChange}
                                >
                                    {printOptionsJSON(this.state.clusterIDlist, this.state.clusterNamelist)}
                                </select>
                                <p> Cluster ID : {clusterID}</p>
                                <br />
                                <br />
                                <label>Policy name :</label>
                                <select
                                    name="policyID"
                                    id="policyID"
                                    value={policyID}
                                    onChange={this.handleChange}
                                >
                                    {printOptionsJSON(this.state.policyIDlist, this.state.policyNamelist)}
                                </select>
                                <p> Policy ID : {policyID}</p>
                                <input type="submit" value="Submit" />
                            </fieldset>
                        </form>
                        <label>volume actuellement creee : </label>
                        <select
                            name="test"
                            id="test"
                        >
                            {printOptionsJSON(this.state.namelist, this.state.namelist)}
                        </select>
                    </div>
                    <Footer />
                </div>
            );
        } else if (newform) {
            return (
                < Redirect to={{
                    pathname: '/completed',
                    state: { name: name, statusCode: statusCode }
                }}
                />
            );
        }
    }
}

export default createDatastore;