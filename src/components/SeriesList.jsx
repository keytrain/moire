import React from "react";
import { Link } from "react-router-dom";

import genLib from "../lib/generalLibrary";
import Image from "./Image";

import "./SeriesList.css";

export default function SeriesList({ list }) {
  return (
    <div className="slist-category">
      {list.map((e, index) => (
        <Link to={`/r/${e.title}`} key={index}>
          <div className="sitem">
            <div className="sitem-img-container">
              <Image imgClass={"sitem-img"} src={e.cover} alt={e.title} />
            </div>
            <div className="sitem-text">
              <div className="sitem-title">{e.title}</div>
              {/*<div className='sitem-status'>{e.completed === undefined ? 'Ongoing' : (e.completed ? 'Completed' : 'Dropped')}</div>*/}
              <div className="sitem-date">{genLib.howLongAgo(e.updated)} ago</div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
