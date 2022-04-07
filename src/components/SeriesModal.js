import React, { Component } from "react";
import { Link } from "react-router-dom";
import Image from "./Image";
import sData from "../data/seriesData";
import genLib from "../lib/generalLibrary";

import "./SeriesModal.css";

class SeriesModal extends Component {
  constructor(props) {
    super(props);

    this.chData = window.chapterData;
    this.selection = this.props.match.params.series;
    this.selInfo = sData.series[this.selection];
    this.selChaps = this.chData.series[this.selection]
      ? Object.keys(this.chData.series[this.selection])
          .sort((a, b) => {
            if (Number(a) < Number(b)) {
              return -1;
            } else if (Number(a) > Number(b)) {
              return 1;
            }

            return 0;
          })
          .reverse()
      : [];

    this.state = {
      showDisqus: false,
      expandChapters: this.selChaps.length < 4 ? false : true,
    };

    this.handleKey = this.handleKey.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    document.addEventListener("keydown", this.handleKey);
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "scroll";
    document.title = `${this.selection} - Maigo`;
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKey);
    document.documentElement.style.overflow = "initial";
    document.body.style.overflow = "initial";
    document.title = "Maigo";
  }

  closeModal() {
    document.removeEventListener("keydown", this.handleKey);
    this.props.history.push("/");
  }

  handleKey(e) {
    if (e.key === "Escape") {
      this.closeModal();
    }
  }

  render() {
    return (
      <div>
        <div className="modal">
          {this.selInfo.cover && (
            <Image containerClass={"modal-img-container"} src={this.selInfo.cover[0]} alt="cover" />
          )}

          <div className="modal-right">
            <div className="modal-text">
              <h1 className="modal-header">{this.selection}</h1>
              <h4 className="header-lead">{this.selInfo.author}</h4>
              <hr />
              <div className="modal-synopsis">
                {this.selInfo.synopsis.map((e, index) => (
                  <p key={index}>{e}</p>
                ))}
              </div>
              {this.selChaps.length > 0 && <hr />}

              <div className="modal-chapters-container">
                {this.selChaps.length > 0 &&
                  this.selChaps.map((e, index) => {
                    if (index < (this.state.expandChapters ? 4 : Infinity)) {
                      return (
                        <Link key={index} to={`/r/${this.selection}/${e}/0`}>
                          <div className="modal-chapter">
                            <div className="modal-chapter-num">Chapter {e}</div>
                            <div className="modal-chapter-date">
                              {genLib.howLongAgo(this.chData.series[this.selection][e].date)} ago
                            </div>
                          </div>
                        </Link>
                      );
                    }
                    return "";
                  })}
                {this.state.expandChapters && (
                  <div
                    className="show-more"
                    onClick={() => {
                      this.setState({ expandChapters: false });
                    }}
                  >
                    SHOW MORE
                  </div>
                )}

                <hr />
                <div className="modal-link-section">
                  {this.selInfo.licensed ? (
                    <small>
                      Licensed and distributed in English by{" "}
                      <strong>{this.selInfo.licensed}</strong>
                    </small>
                  ) : (
                    <div>
                      <small>
                        <a
                          className="modal-links"
                          href="https://www.dropbox.com/s/uwxkqshyxmct83z/Maigo%20Repository.txt?dl=0"
                        >
                          Download
                        </a>
                        <a className="modal-links" href="https://www.amazon.co.jp/">
                          Amazon
                        </a>{" "}
                        <a className="modal-links" href="http://www.cdjapan.co.jp/">
                          CDJapan
                        </a>{" "}
                        <a className="modal-links" href="http://www.hmv.co.jp/en/">
                          HMV
                        </a>{" "}
                        <a className="modal-links" href="http://www.yesasia.com/us/en/home.html">
                          YesAsia
                        </a>
                      </small>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="modalBG" onClick={this.closeModal}></div>
      </div>
    );
  }
}

export default SeriesModal;
