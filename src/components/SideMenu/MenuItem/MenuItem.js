import React, { Component } from "react";

class MenuItem extends Component {
    render() {
        return (
            <div className={this.props.table === this.props.link ? 'active' : null} onClick={this.props.changeTab}>
                <img src={this.props.img} alt={this.props.alt} />
            </div>
        )
    }
}

export default MenuItem;