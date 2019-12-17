import React, { Component } from "react";

class AdminTeam extends Component {
    render() {
        return (
            <div className="game-holder">
                <p>{this.props.team.p1} <span>{this.props.team.p1r}</span></p>
                <p>{this.props.team.p2} <span>{this.props.team.p2r}</span></p>
                {!this.props.team.played ? <button onClick={this.props.clicked}>Edit</button> : null}

            </div>
        )
    }
}

export default AdminTeam;