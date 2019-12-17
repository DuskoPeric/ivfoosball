import React, { Component } from "react";
import Aux from '../../hoc/Aux'

class Layout extends Component {
    render() {
        return (
            <Aux>
                <main>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
}

export default Layout;