import React from "react";

export default function DropdownItem({ name, handle, icon, selection, right, text }) {
  return (
    <div className="dropdown-row" name={name} value={text} onClick={handle}>
      <div className="dropdown-icon">{icon}</div>
      <div className={"dropdown-text " + (selection === text ? "dropdown-text-active" : "")}>
        {text}
      </div>
      <div className="dropdown-right">{right}</div>
    </div>
  );
}
