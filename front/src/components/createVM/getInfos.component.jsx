import React from "react";
import Footer from "../footer.component";
import Header from "../header.component";
//import { Redirect } from 'react-router-dom';

class getInfos extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            ram: "",
            vcpu: "",
            size: "",
            policyName: "",
            submitted: false,
            test: ""
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        };
        fetch('http://localhost:8080/getListPolicy', requestOptions)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                this.setState({
                    test: data,
                })
            });
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
        const { name, ram, vcpu, size, policyName } = this.state;
        return (
            <div>
                <Header />
                <div className="form-style-5">
                    <p>{this.state.test}</p>
                    <form onSubmit={this.handleSubmit}>
                        <fieldset>
                            <legend>Create Virtual Machine</legend>
                            <label>Name : </label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                value={name}
                                onChange={this.handleChange}
                                required
                            />
                            <br />
                            <label>VCPU : </label>
                            <input
                                type="number"
                                name="vcpu"
                                id="vcpu"
                                value={vcpu}
                                onChange={this.handleChange}
                                required
                            />
                            <br />
                            <label>Ram : </label>
                            <input
                                type="number"
                                name="ram"
                                id="ram"
                                value={ram}
                                onChange={this.handleChange}
                                required
                            />
                            <br />
                            <label>Size in GB : </label>
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
                            <label>Policy name :</label>
                            <select
                                name="policyName"
                                id="policyName"
                                value={policyName}
                                onChange={this.handleChange}
                            >
                            </select>
                            <input type="submit" value="Submit" />
                        </fieldset>
                    </form>
                </div>
                <Footer />
            </div >
        );
    }
}

export default getInfos;