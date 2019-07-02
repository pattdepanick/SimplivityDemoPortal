import React from "react";
import Header from "./header.component";
import Footer from "./footer.component";

class choices extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="form-style-5">
                    <h2><a href="http://localhost:8081/getDatastoreInfos">Create Datastore</a></h2>
                    <h2><a href="http://localhost:8081/getInfos">Create VM</a></h2>
                    <h2><a href="url">Create Vm from template</a></h2>
                </div>
                <Footer />
            </div>
        );
    }
}

export default choices;