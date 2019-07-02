import React from "react";
import Footer from "../footer.component";
import Header from "../header.component";

class Completed extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: this.props.location.state.name,
            statusCode: this.props.location.state.statusCode
        };
    }

    render() {
        return (
            <div>
                <Header />
                <div className="form-style-5">
                    <p>You tried to create a volume named {this.state.name}</p>
                    <p>The answer was successful</p>
                    <br />
                    <h4>You can find bellow the exact answer of the ansible script.</h4>
                    <br />
                    <br />
                    <br />
                    <p>{this.state.statusCode}</p>
                </div>
                <Footer />
            </div >
        );
    }
}


export default Completed;