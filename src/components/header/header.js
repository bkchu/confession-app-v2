import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import cx from "classnames";

import {
  closeSideDrawer,
  openSideDrawer,
  setScrollStatus,
  setIsScrollingDown,
  setVersion,
} from "../../redux/reducer";
import { ReactComponent as BurgerMenu } from "../../assets/svgs/burger-menu.svg";
import { ReactComponent as ConfessionLogo } from "../../assets/svgs/logo_without-text.svg";

import styles from "./header.module.scss";
import { VERSIONS } from "../../services/verse-parser";
import ClickAwayListener from "@mui/base/ClickAwayListener";

const delta = 10; //how far it needs to be scrolled to be considered changed
const navbarHeight = 45; //height of navbar

class Header extends Component {
  state = {
    lastScrollTop: 0,
    isVersionSelectorOpen: false,
  };

  componentDidMount() {
    setInterval(() => {
      if (this.props.didScroll) {
        const st = window.scrollY;
        if (Math.abs(this.state.lastScrollTop - st) <= delta) return;
        if (st > this.state.lastScrollTop && st > navbarHeight) {
          // Scroll Down
          this.props.setIsScrollingDown(true);
        } else {
          // Scroll Up
          // If did not scroll past the document (possible on mac)...
          if (st + window.innerHeight < document.body.clientHeight) {
            this.props.setIsScrollingDown(false);
          }
        }
        this.props.setScrollStatus(false);
        this.setState({ lastScrollTop: st });
      }
    }, 250);
  }

  onOutsideClick = () => {
    this.setState({ isVersionSelectorOpen: false });
  };

  onOpenVersionSelector = () => {
    this.setState({
      isVersionSelectorOpen: true,
    });
  };

  onVersionSelect = (version) => {
    this.props.setVersion(version);
    this.setState({ isVersionSelectorOpen: false });
  };

  render() {
    const {
      closeSideDrawer,
      openSideDrawer,
      showSideDrawer,
      isScrollingDown,
      version,
      location,
      history,
    } = this.props;

    const { isVersionSelectorOpen } = this.state;

    const headerClasses = cx(
      styles.header,
      { [styles["header--hidden"]]: isScrollingDown },
      { [styles["header--primary"]]: location.pathname === "/" },
      { [styles["header--secondary"]]: location.pathname !== "/" }
    );

    return (
      <>
        <nav className={headerClasses}>
          <div className={styles["header__left"]}>
            <ConfessionLogo
              onClick={() => history.push("/")}
              className={styles["header__logo"]}
            />
            <h1
              onClick={() => history.push("/")}
              className={styles.header__brandname}
            >
              Confession
            </h1>
            <button
              onClick={this.onOpenVersionSelector}
              className={styles["header__version-selector-btn"]}
            >
              {version}
            </button>
          </div>
          <BurgerMenu
            style={{ cursor: "pointer" }}
            onClick={showSideDrawer ? closeSideDrawer : openSideDrawer}
          />
        </nav>

        {isVersionSelectorOpen && (
          <ClickAwayListener onClickAway={this.onOutsideClick}>
            <div
              className={cx(styles["header__version-selector"], {
                [styles["header__version-selector--shown"]]:
                  isVersionSelectorOpen,
              })}
            >
              {Object.keys(VERSIONS).map((version) => (
                <button
                  key={version}
                  onClick={() => this.onVersionSelect(version)}
                  className={styles["header__version"]}
                >
                  {version}
                </button>
              ))}
            </div>
          </ClickAwayListener>
        )}
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    showSideDrawer: state.showSideDrawer,
    didScroll: state.didScroll,
    isScrollingDown: state.isScrollingDown,
    version: state.version,
  };
};

export default withRouter(
  connect(mapStateToProps, {
    openSideDrawer,
    closeSideDrawer,
    setScrollStatus,
    setIsScrollingDown,
    setVersion,
  })(Header)
);
