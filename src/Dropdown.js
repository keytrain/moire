import React, { Component } from "react";
import "./Dropdown.css";

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
    };
    this.handleClicked = this.handleClicked.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
    this.handleMouseDown = this.handleMouseDown.bind(this);
  }

  handleBlur(e) {
    this.setState({ open: false });
  }

  // mousedown fires before blur event, somehow causing blur to occur?
  // there needs to be a resource for events and their orders...
  handleMouseDown(e) {
    e.preventDefault();
  }

  handleClicked(e) {
    this.setState((prevState) => {
      prevState.open = prevState.open ? false : true;
      return prevState;
    });
  }

  render() {
    return (
      <div className="container" onBlur={this.handleBlur} tabIndex="0">
        <div onClick={this.handleClicked} className="attachPoint">
          {this.props.attach}
        </div>

        {this.state.open && (
          <div className="menu-container" onMouseDown={this.handleMouseDown}>
            <div className="menu-contents">{this.props.children}</div>
          </div>
        )}
      </div>
    );
  }
}

export default Dropdown;
