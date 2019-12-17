import React, { Component } from "react";

class Team extends Component {
    render() {
        return (
            <div className='item'>
                <p className="no">{this.props.number}</p>
                <p className="name">{this.props.item.name}</p>
                <p className="noItem">{this.props.item.wins + this.props.item.lose}</p>
                <p className="noItem ">{this.props.item.wins}</p>
                <p className="noItem ">{this.props.item.lose}</p>
                <p className="noItem ">{this.props.item.score}</p>
            </div>
        )
    }
}

export default Team;