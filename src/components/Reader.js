import React from "react";
import { Link } from "react-router-dom";
import MdClose from "react-icons/lib/md/close";
import MdInfoOutline from "react-icons/lib/md/info-outline";
import MdInfo from "react-icons/lib/md/info";
import MdSettings from "react-icons/lib/md/settings";

import genLib from "../lib/generalLibrary";
import Page from "./Page";
import Dropdown from "./Dropdown";
import DropdownItem from "./DropdownItem";

import "./Reader.css";

// TODO:
// check firefox, safari
// switch chapter inside reader
// finish adding chapters/volume covers
// announcements
// convert modal to resize upon window change
// a visual indicator appears on mouseover on a left or right page
// being able to look through all volume covers
// give random series
// remove the history part of going back 1 page
// optimize spread checking
// supporting other types of page names, e.g. '00.png'
// load all pages at once/vertical scroll webcomic style/load as you scroll
// svg the logo

const MOBILE = 425;
const TABLET = 1024;
const DESKTOP = 1440;

class Reader extends React.Component {
  constructor(props) {
    super(props);

    this.selection = this.props.match.params.series;
    this.chapter = this.props.match.params.chapter;
    this.cData = window.chapterData;

    this.state = {
      pageMode: localStorage.getItem("pageMode") ? localStorage.getItem("pageMode") : "Double Page",
      leftPgCount: "001",
      leftPgType: "png",
      leftShow: false,
      leftWidth: 0,
      rightPgCount: "000",
      rightPgType: "png",
      rightWidth: 0,
      rightShow: false,
      spread: false,
      goBack: false,
      lastPg: this.cData.series[this.selection][this.chapter].pgCount
        ? this.cData.series[this.selection][this.chapter].pgCount + 1
        : 1000,
      showDisqus: false,
      showInfo: false,
      firstLoad: false,
      pageStyle: {
        transition: "150ms cubic-bezier(0.4, 0.0, 0.6, 1)",
      },
      singlePgMode:
        localStorage.getItem("pageMode") === "Single Page" ||
        document.documentElement.clientWidth <= MOBILE
          ? true
          : false,
      windowWidth: document.documentElement.clientWidth,
      resizeImages: localStorage.getItem("resizeImages") == "Match Window",
      resizeImageMode: localStorage.getItem("resizeImages") ? localStorage.getItem("resizeImages") : "Match Window"
    };
  }

  componentDidMount() {
    // initial load
    // fixes the scroll on iOS... dumb
    document.documentElement.style.overflow = "visible";
    document.body.style.overflow = "visible";

    if (this.state.singlePgMode && this.props.match.params.page === "0") {
      this.resetChapterToStart();
    } else {
      this.loadPages(this.props.match.params.page);
    }
    this.unlisten = this.props.history.listen((location, action) => {
      this.loadPages(location.pathname.split(/(.+)\//)[2]);
    });
    document.addEventListener("keydown", this.handlePagesKey);
    window.addEventListener("resize", this.handleResize);

    document.title = `${this.selection} - ${this.chapter} - Maigo`;
  }

  componentWillUnmount() {
    clearTimeout(this.loadPagesTimeout);

    document.removeEventListener("keydown", this.handlePagesKey);
    window.removeEventListener("resize", this.handleResize);

    // removes the listener on browser routing
    this.unlisten();

    document.title = `${this.selection} - Maigo`;
  }

  render() {
    let chapterObj = this.cData.series[this.selection]
      ? this.cData.series[this.selection][this.chapter]
      : {};
    let currPg = this.props.match.params.page;

    let actionIconSize = this.state.windowWidth > MOBILE ? 24 : 18;

    // Scroll back to the top of the page before anything is rendered
    // window.scrollTo({ top: "30", behavior: "smooth" });

    return (
      <div className="reader-container" tabIndex="0">
        <div className="controls-container">
          <div className="controls">
            <div className="ctrl-left">
              <div className="ctrl-title">
                <strong>{this.selection}</strong> - {this.chapter}
              </div>
            </div>
            <div className="ctrl-center"></div>
            <div className="ctrl-right">
              <div className="info-cont">
                <Dropdown
                  attach={
                    <MdInfoOutline
                      className="action-icon"
                      onClick={this.handleInfo}
                      size={actionIconSize}
                    />
                  }
                >
                  <div className="info">
                    <div className="credit">
                      <small className="credit-title">GROUP</small>
                      <span className="credit-name">{chapterObj.group || "maigo"}</span>
                    </div>
                    {chapterObj.trans && (
                      <div className="credit">
                        <small className="credit-title">TRANSLATION</small>
                        <span className="credit-name">{chapterObj.trans}</span>
                      </div>
                    )}
                    {chapterObj.let && (
                      <div className="credit">
                        <small className="credit-title">LETTERING</small>
                        <span className="credit-name">{chapterObj.let}</span>
                      </div>
                    )}
                    {chapterObj.red && (
                      <div className="credit">
                        <small className="credit-title">REDRAWS</small>
                        <span className="credit-name">{chapterObj.red}</span>
                      </div>
                    )}
                  </div>
                </Dropdown>
              </div>
              <Dropdown attach={<MdSettings className="action-icon" size={actionIconSize} />}>
                <DropdownItem
                    text={"Page Display"}
                    header={true}
                />
                <DropdownItem
                  name={"pageMode"}
                  icon={""}
                  selection={this.state.pageMode}
                  text={"Single Page"}
                  handle={this.handlePageMode}
                />
                <DropdownItem
                  name={"pageMode"}
                  icon={""}
                  selection={this.state.pageMode}
                  text={"Double Page"}
                  handle={this.handlePageMode}
                />

                <DropdownItem
                    text={"Image Height"}
                    header={true}
                />
                <DropdownItem
                  name={"resizeImages"}
                  icon={""}
                  selection={this.state.resizeImageMode}
                  text={"Match Window"}
                  handle={this.handleImageResize}
                />
                <DropdownItem
                  name={"resizeImages"}
                  icon={""}
                  selection={this.state.resizeImageMode}
                  text={"Full Size"}
                  handle={this.handleImageResize}
                />
              </Dropdown>

              <div>
                <Link to={`/r/${this.selection}`}>
                  <MdClose className="action-icon" size={actionIconSize} />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="pages-container" style={this.state.pageStyle}>
          <div className="pages">
            {!this.state.spread &&
              !this.state.singlePgMode &&
              Number(currPg) + 1 !== this.state.lastPg && (
                <Page
                  containerClass={"pgContainer leftPgCont " + (this.state.resizeImages ? "resize" : "")}
                  imgClass={"leftPg"}
                  src={`${chapterObj.src}/${this.state.leftPgCount}.${this.state.leftPgType}`}
                  loaded={this.handleLeftLoaded}
                  error={this.handleLeftError}
                  show={this.state.leftShow}
                  imgWidth={this.state.leftWidth}
                  spread={this.handleSpread}
                  click={this.handlePages}
                />
              )}
            {Number(currPg) + 1 === this.state.lastPg && (
              <div className="chapterEnds">
                {/* <h1>Thanks for reading!</h1> */}
                {/* <small>That was the last page.</small> */}
              </div>
            )}

            {currPg > "0" ? (
              <Page
                containerClass={
                  "pgContainer " +
                  (this.state.singlePgMode ? "" : "rightPgCont ") +
                  (this.state.spread ? "spread" : "") +
                  (this.state.resizeImages ? "resize" : "")
                }
                imgClass={"rightPg"}
                src={`${chapterObj.src}/${this.state.rightPgCount}.${this.state.rightPgType}`}
                loaded={this.handleRightLoaded}
                error={this.handleRightError}
                show={this.state.rightShow}
                imgWidth={this.state.rightWidth}
                spread={this.handleSpread}
                click={this.handlePages}
                singlePgMode={this.state.singlePgMode}
              />
            ) : (
              <div className="chapterEnds">{/* <h1>Enjoy!</h1> */}</div>
            )}
          </div>
        </div>
      </div>
    );
  }

  resetChapterToStart = () => {
    this.props.history.push(`/r/${this.selection}/${this.chapter}/1`);
    this.loadPages("1");
  };

  handleResize = () => {
    this.setState((prevState) => {
      let currWidth = document.documentElement.clientWidth;
      prevState.windowWidth = currWidth;

      if (currWidth <= MOBILE) {
        prevState.singlePgMode = true;
      }
      if (prevState.singlePgMode && this.props.match.params.page === "0") {
        this.resetChapterToStart();
      }
      return prevState;
    });
  };

  handlePagesKey = (e) => {
    // console.log(e.key);
    switch (e.key) {
      case "ArrowLeft":
        this.nextPage();
        break;
      case "ArrowRight":
        this.prevPage();
        break;
      case "Escape":
        this.props.history.push(`/r/${this.selection}`);
        break;
      default:
        break;
    }
  };

  loadPages = (page) => {
    this.setState((prevState) => {
      prevState.rightPgCount = genLib.padZero(page);
      prevState.rightPgType = "png";
      prevState.leftWidth = 0;
      prevState.rightShow = false;
      prevState.leftPgCount = genLib.padZero("" + (Number(page) + 1));
      prevState.leftPgType = "png";
      prevState.rightWidth = 0;
      prevState.leftShow = false;
      prevState.spread = false;
      return prevState;
    });

    this.loadPagesTimeout = setTimeout(() => {
      this.setState((prevState) => {
        prevState.rightShow = true;
        prevState.leftShow = true;
        if (!prevState.goBack) {
          this.buffer(4);
        }
        return prevState;
      });
    }, 400);
  };

  buffer = (size) => {
    let chapterObj = this.cData.series[this.selection]
      ? this.cData.series[this.selection][this.chapter]
      : {};
    let startPg = Number(this.state.leftPgCount);
    let errorCount = 0;
    for (let i = 0; i < size; i++) {
      let pageNum = startPg + i + 1;
      const bufferImg = new Image();
      let nextPg = genLib.padZero("" + pageNum);
      let bufferImgType = "png";
      bufferImg.onerror = () => {
        if (bufferImgType === "jpg") {
          bufferImgType = "jpeg";
          bufferImg.src = `${chapterObj.src}/${nextPg}.${bufferImgType}`;
        } else if (bufferImgType === "png") {
          bufferImgType = "jpg";
          bufferImg.src = `${chapterObj.src}/${nextPg}.${bufferImgType}`;
        } else {
          errorCount++;
        }
        if (this.state.lastPg === 1000 && errorCount === 2) {
          this.setState({ lastPg: pageNum - errorCount + 1 });
        }
      };
      bufferImg.src = `${chapterObj.src}/${nextPg}.${bufferImgType}`;
    }
  };

  handleSpread = (imgObj) => {
    let nextPg = Number(this.props.match.params.page) - 1;
    // if not a spread, go back another page
    if (!imgObj.spread && this.state.goBack) {
      this.props.history.push({
        pathname: `/r/${this.selection}/${this.chapter}/${nextPg}`,
      });
      this.setState({ goBack: false, rightWidth: imgObj.width });
    } else {
      this.setState({ spread: imgObj.spread, rightWidth: imgObj.width });
    }
  };

  checkAltImageTypes = (pageType) => {
    this.setState((prevState) => {
      if (prevState[pageType] === "jpg") {
        prevState[pageType] = "jpeg";
      } else if (prevState[pageType] === "png") {
        prevState[pageType] = "jpg";
      } else {
        if (pageType === (this.state.singlePgMode ? "rightPgType" : "leftPgType")) {
          prevState.lastPg = Number(prevState.leftPgCount) - (this.state.singlePgMode ? 1 : 0);
        }
      }
      return prevState;
    });
  };

  handleLeftLoaded = () => {
    // console.log('left')
  };

  handleRightLoaded = () => {
    // console.log('right')
    setTimeout(() => document.addEventListener("keydown", this.handlePagesKey), 700);
  };

  handleLeftError = () => {
    // console.log('error')
    this.checkAltImageTypes("leftPgType");
  };

  handleRightError = () => {
    // console.log('error')
    this.checkAltImageTypes("rightPgType");
  };

  nextPage = () => {
    let currPg = this.props.match.params.page;
    let nextPg = Number(currPg) + (this.state.singlePgMode ? 1 : this.state.spread ? 1 : 2);
    if (nextPg > -1 && nextPg < this.state.lastPg) {
      document.removeEventListener("keydown", this.handlePagesKey);
      this.setState({ goBack: false });
      this.props.history.push({
        pathname: `/r/${this.selection}/${this.chapter}/${nextPg}`,
      });
    }
  };

  prevPage = () => {
    let currPg = this.props.match.params.page;
    let nextPg = Number(currPg) - 1;

    if (nextPg > (this.state.singlePgMode ? 0 : -1) && nextPg < this.state.lastPg) {
      document.removeEventListener("keydown", this.handlePagesKey);
      this.setState({ goBack: true });
      this.props.history.push({
        pathname: `/r/${this.selection}/${this.chapter}/${nextPg}`,
      });
    }
  };

  // activated when clicking on a page
  handlePages = (e) => {
    // e.persist();
    // currentTarget grabs pages div
    // target grabs the respective Image component

    if (e.target.className) {
      if (!this.state.spread && !this.state.singlePgMode) {
        let pgClicked = e.target.className;
        if (pgClicked === "leftPg") {
          this.nextPage();
        } else if (pgClicked === "rightPg") {
          this.prevPage();
        }
      } else {
        let midPoint = e.target.width / 2;
        let clickLoc = e.nativeEvent.offsetX;

        if (clickLoc < midPoint) {
          this.nextPage();
        } else if (clickLoc > midPoint) {
          this.prevPage();
        }
      }
    }
  };

  handleInfo = () => {
    this.setState((prevState) => {
      prevState.showInfo = prevState.showInfo === false ? true : false;
      return prevState;
    });
  };

  handlePageMode = (e) => {
    let value = e.currentTarget.attributes.value.value;

    this.setState((prevState) => {
      localStorage.pageMode = value;
      prevState.pageMode = value;
      if (value === "Single Page") {
        prevState.singlePgMode = true;
        if (this.props.match.params.page === "0") {
          this.resetChapterToStart();
        }
      } else {
        prevState.singlePgMode = false;
      }
      return prevState;
    });
  };

  handleImageResize = (e) => {
    let value = e.currentTarget.attributes.value.value;

    this.setState((prevState) => {
      localStorage.resizeImageMode = value;
      prevState.resizeImageMode = value;
      if (value === "Match Window") {
        prevState.resizeImages = true;
        if (this.props.match.params.page === "0") {
          this.resetChapterToStart();
        }
      } else {
        prevState.resizeImages = false;
      }
      return prevState;
    });
  };
}

export default Reader;
