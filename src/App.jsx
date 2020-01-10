const React = require('react');
const uuidv4 = require('uuid/v4');

const styles = require('./App.css');

const Marker = require('./components/Marker');
const Warning = require('./components/Warning');

class App extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            markFor: '0',
            selectedText: false,
            selectTextConetent: ''
        };

        this.panel = React.createRef();
        this.documentStateChanged = this.documentStateChanged.bind(this);
        this.handleMarkerChanged = this.handleMarkerChanged.bind (this);
    }

    documentStateChanged(selection) {
        const { Text } = require('scenegraph');
        if (!selection || !(selection.items[0] instanceof Text)) {
            this.setState({
                selectedText: false
            });
        } else {
            this.setState({
                selectedText: true,
                markFor: '0',
            });
        }
    }

    handleMarkerChanged(value) {
        this.setState({
            markFor: value
        }, () => {
            if(this.state.markFor === '0') {
                const { editDocument } = require("application");
                const { selection, root } = require("scenegraph");
                const id = uuidv4();

                editDocument({ editLabel: "Mark wording text" }, () => {
                    if(!root.pluginData) {
                        root.pluginData = {
                            root: 'root'
                        }
                    }
                    if(!selection.items[0].pluginData) {
                        selection.items[0].pluginData =  {
                            id: id,
                            wording: [{text: selection.items[0].text, type: 'wording'}]
                        }
                    }
                    console.log(root.pluginData);
                    console.log(selection.items[0].pluginData);
                })
            }
            if(this.state.markFor === '1') {
                const { selection } = require("scenegraph");
                this.setState({
                    selectTextConetent: selection.items[0].text
                })
            }
        })
    }

    render() {
        const { selection } = this.props;
        const { selectedText, markFor } = this.state;
        const MarkerPanel = () => (
            <div>
                <Marker value={markFor} text={selectTextConetent} passValue={this.handleMarkerChanged}/>
            </div>
        );
        let panel;
        if(!selectedText) {
            panel = <Warning/>
        } else {
            panel = <MarkerPanel/>
        }
        return (
            <panel className={styles.panel}>
                {panel}
            </panel>
        );
    }
}

module.exports = App;
