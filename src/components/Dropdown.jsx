import React, { useState } from "react";
import "./Dropdown.css";

function Dropdown({ attach, children, position }) {
  const [open, setOpen] = useState(false);

  const handleBlur = (e) => {
    setOpen(false);
  };

  // mousedown fires before blur event, somehow causing blur to occur?
  // there needs to be a resource for events and their orders...
  const handleMouseDown = (e) => {
    e.preventDefault();
  };

  const handleClicked = (e) => {
    setOpen(!open);
  };

  const positioning =
    position === "top"
      ? {
          bottom: "30px",
        }
      : {};

  return (
    <div className="container" onBlur={handleBlur} tabIndex="0">
      <div onClick={handleClicked} className="attachPoint">
        {attach}
      </div>

      {open && (
        <div style={positioning} className="menu-container" onMouseDown={handleMouseDown}>
          <div className="menu-contents">{children}</div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
