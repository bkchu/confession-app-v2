import React, { Component } from "react";
import { connect } from "react-redux";
import { openSideDrawer } from "../../redux/reducer";
import { ReactComponent as Logo } from "../../assets/svgs/logo_with-text.svg";
import styles from "./landing.module.scss";

class Landing extends Component {
  render() {
    const { openSideDrawer } = this.props;

    return (
      <div className={styles.landing}>
        <Logo className={styles.landing__logo} />
        <h1 className={styles.landing__title}>
          New Creation Confessions
        </h1>
        <p className={styles.landing__quote}>
          “Death and life are in the power of the tongue.”
        </p>
        <button
          onClick={() => openSideDrawer()}
          className={styles.landing__cta}
        >
          Start Confessing
        </button>
      </div>
    );
  }
}

export default connect(null, { openSideDrawer })(Landing);
