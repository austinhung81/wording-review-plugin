const React = require("react");

const styles = require("./Wording.css");

const Wording = (props) => (
    <h3 className={styles.wording}>{`Wording: ${props.text}`}</h3>
);

module.exports = Wording;