const React = require("react");
const styles = require("./ContentParser.css");
const type = ['wording', 'parameter', 'count', 'date']

class ContentParser extends React.Component {
	constructor(props) {
		super(props);
	}

	wordsElement(words) {
		return (
			<div>
				{
					words.map((value, index) => {
						return <div key={index}>{value}</div>
					})
				}
			</div>
		)
	}

	render() {
		const { text } = this.props;
		const words = text.split(' ');
		const panel = text.length > 0 ?
			<div className="content-parser-container">
				{
					words.map((value, index) => {
						return (
							<div className="marker-container" key={index}>
								<span className="mark-label">{value}</span>
								<select className="mark-type" onChange={this.handleChange}>
									{
										type.map((value, index) => {
											return <option value={value} key={index}>{value}</option>
										})
									}
								</select>
							</div>
						)
					})
				}
			</div>
			: '';
		return (
			<div>{panel}</div>
		)
	}
}

module.exports = ContentParser;