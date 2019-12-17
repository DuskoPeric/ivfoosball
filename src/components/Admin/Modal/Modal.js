import React, { Component } from "react";
import Aux from "../../../hoc/Aux";

class Modal extends Component {

    render() {
        return (
            <Aux>
                <div
                    className="Modal"

                >
                    {this.props.children}
                </div>
            </Aux>
        );
    }
}

export default Modal;