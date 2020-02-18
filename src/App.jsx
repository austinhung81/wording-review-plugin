const React = require('react');
const uuidv4 = require('uuid/v4');

const styles = require('./App.css');

const Marker = require('./components/Marker');
const ContentParser = require('./components/ContentParser');
const Warning = require('./components/Warning');
const Wording = require('./components/Wording');

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			markFor: '0',
			isSelectedText: false,
			selectTextConetent: ''
		};

		this.panel = React.createRef();
		this.documentStateChanged = this.documentStateChanged.bind(this);
		this.handleMarkerChanged = this.handleMarkerChanged.bind(this);
	}

	documentStateChanged(selection) {
		const { Text } = require('scenegraph');
		if (!selection || !(selection.items[0] instanceof Text)) {
			this.setState({
				isSelectedText: false,
				selectTextConetent: ''
			});
		} else {
			this.setState({
				isSelectedText: true,
				markFor: '0',
				selectTextConetent: 'Please select a Text block'
			});
		}
	}

	handleMarkerChanged(value) {
		const { editDocument } = require("application");
		const { selection, root } = require("scenegraph");
		const id = uuidv4();
		editDocument({ editLabel: "Mark wording text" }, () => {
			selection.items[0].pluginData = {};
		})
		this.setState({
			markFor: value,
			selectTextConetent: selection.items[0].text
		}, () => {
			if (this.state.markFor === '1') {

			}
			if (this.state.markFor === '2') {
			}
		})
	}

	render() {
		const { selection } = this.props;
		const { isSelectedText, markFor, selectTextConetent } = this.state;
		const MarkerPanel = () => (
			<div>
				<Wording text={selectTextConetent} />
				<Marker value={markFor} passValue={this.handleMarkerChanged} />
				{markFor === '2' && <ContentParser text={selectTextConetent} />}
			</div>
		);
		const panel = !isSelectedText ? <Warning /> : <MarkerPanel />;
		return (
			<panel className={styles.panel}>
				{panel}
			</panel>
		);
	}
}

module.exports = App;
