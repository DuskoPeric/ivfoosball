import React, { Component } from "react";
import tableImg from '../../assets/images/tab.png'
import scheduleImg from '../../assets/images/sch.png'
import MenuItem from "./MenuItem/MenuItem";

class SideMenu extends Component {

    changeTabFunction = (tab) => {
        this.props.changeTabCallback(tab);
    }
    render() {
        return (
            <div className="side-menu">
                <MenuItem table={this.props.table} img={tableImg} alt="table" link="table" changeTab={() => this.changeTabFunction('table')} />
                <MenuItem table={this.props.table} img={scheduleImg} alt="schedule" link='schedule' changeTab={() => this.changeTabFunction('schedule')} />
            </div>
        )
    }
}

export default SideMenu;