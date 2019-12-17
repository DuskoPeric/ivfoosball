import React, { Component } from "react";
import Team from "./Team/Team";

class Table extends Component {
    render() {
        let i = 0;
        const teamProp = this.props.teams;
        const teams = teamProp.map(item => {
            i++;
            return (
                <Team item={item} key={item.id} number={i} />
            )
        })

        return (
            <div className="table">
                <p>Table</p>
                <div className="order">
                    <div className='item-label'>
                        <p className="no">#</p>
                        <p className="name">Name</p>
                        <p className="noItem">M</p>
                        <p className="noItem">W</p>
                        <p className="noItem">L</p>
                        <p className="noItem ">P</p>
                    </div>
                    <div className="table-content">
                        {teams}
                    </div>


                </div>
            </div>
        )
    }
}

export default Table;