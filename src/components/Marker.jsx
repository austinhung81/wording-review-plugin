const React = require("react");
const styles = require("./Marker.css");

class Marker extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {

    }

    update() {

    }
    handleChange(event){
        this.props.passValue(event.target.value);
    }
    render() {
        return (
            <div>
                <span>Mark for</span>
                <select className="mark-type" onChange={this.handleChange} value={this.props.value}>
                    <option value="0">Wording</option>
                    <option value="1">Wording with parms</option>
                </select>
            </div>
        )
    }
}

module.exports = Marker;