import React from 'react';
import { Link } from 'react-router-dom';
import './Reader.css';
import cData from './data/chapterData';
import Page from './Page';
// import Image from './Image';
import genLib from './lib/generalLibrary';
import ReactDisqusComments from 'react-disqus-comments';
import Transition from 'react-transition-group/Transition';
import MdClose from 'react-icons/lib/md/close';
import MdChatBubbleOutline from 'react-icons/lib/md/chat-bubble-outline';
import MdChatBubble from 'react-icons/lib/md/chat-bubble';
import MdInfoOutline from 'react-icons/lib/md/info-outline';
import MdInfo from 'react-icons/lib/md/info';

// TODO:
// mobile support//reader (30% of readers are mobile)
  // single page support
  // automatically make it one page on mobile
// irc link doesn't work
// like feature
// check firefox, safari
// add google analytics

// title of the page should change
// finish adding chapters/volume covers/reader links/purchase links
// announcements
// convert modal to resize upon window change
// switch chapter inside reader
// a visual indicator appears on mouseover on a left or right page
// being able to look through all volume covers
// give random series
// remove the history part of going back 1 page
// optimize spread checking
// Settings
// supporting other types of page names, e.g. '00.png'
// load all pages at once/vertical scroll webcomic style/load as you scroll
// svg the logo

class Reader extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      pageMode: localStorage.getItem('pageMode'),
      leftPgCount: '000001',
      leftPgType: 'png',
      leftShow: false,
      leftWidth: 0,
      rightPgCount: '000000',
      rightPgType: 'png',
      rightWidth: 0,
      rightShow: false,
      spread: false,
      goBack: false,
      lastPg: 1000,
      showDisqus: false,
      showInfo: false,
      firstLoad: false,
      pageStyle: {
        marginLeft:'0',
        transition:'75ms ease-in'
      },
      windowWidth: document.documentElement.clientWidth
    }
    this.selection = this.props.match.params.series;
    this.chapter = this.props.match.params.chapter;
    this.TABLET = 1024;
    this.DESKTOP = 1440;

    this.handleRightError = this.handleRightError.bind(this);
    this.handleRightLoaded = this.handleRightLoaded.bind(this);
    this.handleLeftError = this.handleLeftError.bind(this);
    this.handleLeftLoaded = this.handleLeftLoaded.bind(this);
    this.handlePages = this.handlePages.bind(this);
    this.handleSpread = this.handleSpread.bind(this);
    this.loadPages = this.loadPages.bind(this);
    this.buffer = this.buffer.bind(this);
    this.nextPage = this.nextPage.bind(this);
    this.prevPage = this.prevPage.bind(this);
    this.handleDisqus = this.handleDisqus.bind(this);
    this.handleInfo = this.handleInfo.bind(this);
    this.handlePagesKey = this.handlePagesKey.bind(this);
    this.checkAltImageTypes = this.checkAltImageTypes.bind(this);
    this.handleResize = this.handleResize.bind(this);
  }

  componentDidMount() {
    // initial load
    this.loadPages(this.props.match.params.page);
    this.unlisten = this.props.history.listen((location, action) => {
      this.loadPages(location.pathname.split(/(.+)\//)[2]);
    });
    document.addEventListener('keydown', this.handlePagesKey);
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handlePagesKey);
    window.removeEventListener('resize', this.handleResize);
    // removes the listener on browser routing
    this.unlisten();
  }

  handleResize() {
    this.setState((prevState) => {
      let currWidth = document.documentElement.clientWidth;
      prevState.windowWidth = currWidth;
      if (currWidth > this.DESKTOP && prevState.showDisqus) {
        prevState.pageStyle.marginLeft = '400px';
        prevState.pageStyle.transition = '75ms ease-in';
      }
      if (currWidth < this.DESKTOP) {
        prevState.pageStyle.marginLeft = '0';
      }
    });
  }

  handlePagesKey(e) {
    console.log(e.key);
    switch (e.key) {
      case 'ArrowLeft':
        this.nextPage();
        break;
      case 'ArrowRight':
        this.prevPage();
        break;
      case 'Escape':
        this.props.history.push(`/r/${this.selection}`);
        break;
      case 'c':
        this.handleDisqus();        
        break;
      default:
        break;
    }
  }

  loadPages(page) {
    this.setState((prevState) => {
      prevState.rightPgCount = genLib.padZero(page);
      prevState.rightPgType = 'png';
      prevState.leftWidth = 0;
      prevState.rightShow = false;
      prevState.leftPgCount = genLib.padZero('' + (Number(page) + 1));
      prevState.leftPgType = 'png';
      prevState.rightWidth = 0;
      prevState.leftShow = false;
      prevState.spread = false;
    })
    setTimeout(()=> {
      this.setState((prevState) => {
        prevState.rightShow = true;
        prevState.leftShow = true;
        if (!prevState.goBack) {
          this.buffer(4);
        }
      })
    }, 300)
  }

  buffer(size) {
    let chapterObj = cData.series[this.selection][this.chapter];
    let originPg = this.state.leftPgCount;

    for (let i = 0; i < size; i++) {
      let pageNum = Number(originPg) + i + 1;
      const bufferImg = new Image();
      let nextPg = genLib.padZero('' + pageNum);
      let bufferImgType = 'png';
      bufferImg.onerror = function() {
        if (bufferImgType === 'jpg') {
          bufferImgType = 'jpeg';
          bufferImg.src=`${chapterObj.src}/img${nextPg}.${bufferImgType}`;
        } else if (bufferImgType === 'png') {
          bufferImgType = 'jpg';
          bufferImg.src=`${chapterObj.src}/img${nextPg}.${bufferImgType}`;
        }
      }
      bufferImg.src=`${chapterObj.src}/img${nextPg}.${bufferImgType}`;
    }
  }

  handleSpread(imgObj) {
    let nextPg = Number(this.props.match.params.page)-1;
    // if not a spread, go back another page
    if (!imgObj.spread && this.state.goBack) {
      this.props.history.push({
        pathname: `/r/${this.selection}/${this.chapter}/${nextPg}`
      });
      this.setState({goBack:false, rightWidth: imgObj.width});
    } else {
      this.setState({spread: imgObj.spread, rightWidth: imgObj.width});
    }
  }

  checkAltImageTypes(pageType) {
    this.setState((prevState => {
      if (prevState[pageType] === 'jpg') {
        prevState[pageType] = 'jpeg';
      } else if (prevState[pageType] === 'png') {
        prevState[pageType] = 'jpg';
      } else {
        if (pageType === 'leftPgType') {
          prevState.lastPg = Number(prevState.leftPgCount);
        }
      }
    }));
  }

  handleLeftLoaded() {
    // console.log('left')
  }

  handleRightLoaded() {
    // console.log('right')
    document.addEventListener('keydown', this.handlePagesKey);
  }

  handleLeftError() {
    // console.log('error')
    this.checkAltImageTypes('leftPgType');
  }

  handleRightError() {
    // console.log('error')
    this.checkAltImageTypes('rightPgType');
  }

  nextPage() {
    let currPg = this.props.match.params.page;
    let nextPg = Number(currPg) + (this.state.spread ? 1 : 2);

    if (nextPg > -1 && nextPg < this.state.lastPg) {  
      document.removeEventListener('keydown', this.handlePagesKey);
      this.setState({goBack: false});
      this.props.history.push({
        pathname: `/r/${this.selection}/${this.chapter}/${nextPg}`
      });
    }
  }
  
  prevPage() {
    let currPg = this.props.match.params.page;
    let nextPg = Number(currPg) - 1;

    if (nextPg > -1 && nextPg < this.state.lastPg) {  
      document.removeEventListener('keydown', this.handlePagesKey);
      this.setState({goBack: true});
      this.props.history.push({
        pathname: `/r/${this.selection}/${this.chapter}/${nextPg}`
      });
    }
  }

  handlePages(e) {
    // e.persist();
    // currentTarget grabs pages div
    // target grabs the respective Image component

    if (e.target.className) {
      if (!this.state.spread) {
        let pgClicked = e.target.className;
        if (pgClicked === 'leftPg') {
          this.nextPage();
        } else if (pgClicked === 'rightPg') {
          this.prevPage();
        }
      } else {
        let midPoint = e.target.width/2;
        let clickLoc = e.nativeEvent.offsetX;
        let currPg = this.props.match.params.page;
        let nextPg = undefined;

        if (clickLoc < midPoint) {
          nextPg = Number(currPg) + (this.state.spread ? 1 : 2);
          this.setState({goBack: false});
        }
        else if (clickLoc > midPoint) {
          nextPg = Number(currPg) - 1;
          this.setState({goBack: true});
        }
        if (nextPg > -1 && nextPg < this.state.lastPg) {
          this.props.history.push({
            pathname: `/r/${this.selection}/${this.chapter}/${nextPg}`
          });
        }
      }
    }
  }

  handleDisqus() {
    this.setState((prevState) => {
      prevState.firstLoad = true;
      prevState.showDisqus = (prevState.showDisqus === false ? true : false);
      if (prevState.windowWidth <= this.DESKTOP)
        prevState.pageStyle = {marginLeft: '0'};
      else {
        prevState.pageStyle = {
          marginLeft: (prevState.pageStyle.marginLeft === '400px' ? '0' : '400px'),
          transition: '75ms ease-in'
        }
      }
    });
  }

  handleInfo() {
    this.setState((prevState) => {
      prevState.showInfo = (prevState.showInfo === false ? true : false);
    });
  }

  render() {
    // window.scrollTo(0,0);
    let chapterObj = cData.series[this.selection][this.chapter];
    let currPg = this.props.match.params.page;

    const duration = 75;
    const defaultStyle = {
      transition: `${duration}ms ease-in`,
    }
    let transitionStyles = {
      entering: {
        visibility:'visible',
        transform: 'translateX(0%)',
      },
      entered: {
        visibility:'visible',
        transform: 'translateX(0%)',
      },
      exiting: {
        transform: 'translateX(-100%)',
      },
      exited: {
        transform: 'translateX(-100%)',
      }
    }

    return (
      <div className='reader-container' tabIndex='0'>
        <div className='reader'>

          <div className='controls'>
            <div className='ctrl-left'>
              {this.state.windowWidth > this.TABLET &&
              <div>
                {this.state.showDisqus ?
                <MdChatBubble className='action-icon' onClick={this.handleDisqus} size={24} />
                :
                <MdChatBubbleOutline className='action-icon' onClick={this.handleDisqus} size={24} />
                }
              </div>
              }
            </div>
            <div className='ctrl-center'>
              <div className='ctrl-title'><strong>{this.selection}</strong> - Chapter {this.chapter}</div>
            </div>
            <div className='ctrl-right'>
                {this.state.showInfo ?
                <MdInfo className='action-icon' onClick={this.handleInfo} size={24} />
                :
                <MdInfoOutline className='action-icon' onClick={this.handleInfo} size={24} />
                }
              <Link to={`/r/${this.selection}`}><MdClose className='action-icon' size={30} /></Link>
            </div>
            {this.state.showInfo &&
            <div className='info'>
              <div className='credit'>
              <small>TRANSLATED BY</small>
              <h4>{chapterObj.trans}</h4>
              </div>
              <div className='credit'>
              <small>LETTERED BY</small>
              <h4>{chapterObj.let}</h4>
              </div>
              {chapterObj.red &&
              <div className='credit'>
              <small>REDRAWN BY</small>
              <h4>{chapterObj.red}</h4>
              </div>
              }
            </div>
            }
          </div>

          {(this.state.firstLoad && this.state.windowWidth > this.TABLET) &&
          <Transition in={this.state.showDisqus} timeout={duration}>
            {(state) => (
            <div style={{
                ...defaultStyle,
                ...transitionStyles[state]
              }} className='disqus-container'>
              <div className='disqus'>
              <ReactDisqusComments shortname='maigo'
                identifier={`${this.selection}_${this.chapter}`}
                url={`http://maigo.us/#/${this.selection}/${this.chapter}`} />
              </div>
            </div>
            )}
          </Transition>
          }

          <div className='pages-container' style={this.state.pageStyle}>
          <div className='pages'>

            {(!this.state.spread && (Number(currPg) + 1) !== this.state.lastPg) &&
            <Page containerClass={'pgContainer leftPgCont'} imgClass={'leftPg'} 
            src={`${chapterObj.src}/img${this.state.leftPgCount}.${this.state.leftPgType}`} 
            loaded={this.handleLeftLoaded} 
            error={this.handleLeftError}
            show={this.state.leftShow}
            imgWidth={this.state.leftWidth}
            spread={this.handleSpread}
            click={this.handlePages} />
            }
            {((Number(currPg) + 1) === this.state.lastPg) &&
            
            <div className='chapterEnds'>
              <h1>Thanks for reading!</h1>
              <small>That was the last page.</small>
            </div>
            }

            {currPg > '0' ?
            <Page containerClass={'pgContainer rightPgCont ' + (this.state.spread ?'spread':'')} imgClass={'rightPg'} 
              src={`${chapterObj.src}/img${this.state.rightPgCount}.${this.state.rightPgType}`} 
              loaded={this.handleRightLoaded} 
              error={this.handleRightError}
              show={this.state.rightShow}
              imgWidth={this.state.rightWidth}
              spread={this.handleSpread}
              click={this.handlePages} />
            :
            <div className='chapterEnds'>
            nothing
            </div>
            }
          </div>
          </div>
        </div>

        {this.state.windowWidth <= this.TABLET &&
          <div className='disqus-container'>
            {!this.state.showDisqus &&
              <button onClick={this.handleDisqus}>Show Comments</button>
            }
            {this.state.showDisqus &&
              <div className='disqus'>
              <ReactDisqusComments shortname='maigo'
                identifier={`${this.selection}_${this.chapter}`}
                url={`http://maigo.us/#/${this.selection}/${this.chapter}`} />
              </div>
            }
          </div>
        }
      </div>
    );
  }
}

export default Reader;