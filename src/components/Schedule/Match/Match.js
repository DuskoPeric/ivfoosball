import React, { Component } from "react";
import Aux from "../../../hoc/Aux";

class Match extends Component {

    render() {
        let match = this.props.match.map((item, index) => {
            return (<div className="resultHolder" key={index}>
                <div>
                    <p className='p1'>{item.p1}</p>
                    <p className='p2' key={index}>{item.p2}</p>
                </div>

                <p className={!item.played ? 'vs showFlex' : 'vs hide'}>VS</p>
                <p className={item.played ? 'result show' : 'result hide'}><span>{item.p1r}</span><span>{item.p2r}</span></p>


            </div>)
        })
        let activeTab = this.props.show ? match : null;
        return (
            <Aux>
                {activeTab}
            </Aux>

        )
    }
}

export default Match;