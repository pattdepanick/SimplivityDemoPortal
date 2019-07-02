import React from "react";


class StatusCode extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            statusCode: this.props.data.statusCode
        };
    }

    render() {
        const statusCode = this.state.statusCode;
        if (statusCode === 400) {
            return (
                <div>
                    <p>Error: {statusCode}</p>
                    <p>Wrong Username / Email</p>
                </div>
            );
        } else if (statusCode === 401) {
            return (
                <div>
                    <p>Error: {statusCode}</p>
                    <p>Unauthorized, You submitted an invalid access token or the access token has expired. Tokens expire after 24 hours or after 10 minutes of inactivity.</p>
                </div>
            );
        } else if (statusCode === 403) {
            return (
                <div>
                    <p>Error: {statusCode}</p>
                    <p>Forbidden</p>
                </div>
            );
        } else if (statusCode === 404) {
            return (
                <div>
                    <p>Error: {statusCode}</p>
                    <p>Not found</p>
                </div>
            );
        } else {
            return (
                <p>test {statusCode}</p>
                )
        }
    }
}

export default StatusCode;