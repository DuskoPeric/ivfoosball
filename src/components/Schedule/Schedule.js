import React, { Component } from "react";
import Match from "./Match/Match";

class Schedule extends Component {
    state = {
        active: '0'
    }

    changeTab = (i) => {
        this.setState({ active: i })
    }

    render() {
        let tabs = this.props.results.map((item, index) => {
            return <span className={index == this.state.active ? 'tab active' : 'tab'} key={index} onClick={() => this.changeTab(index)}>{index + 1}</span>
        })
        let results = this.props.results.map((item, index) => {
            return <Match key={index} match={item} show={this.state.active == index} />
        })
        return (
            <div className="results">
                <p>Results</p>
                <div className="tabsHolder">
                    {tabs}
                </div>

                <div className="holdResult">
                    {results}
                </div>

            </div>
        )
    }
}

export default Schedule;