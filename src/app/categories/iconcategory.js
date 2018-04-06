import React from 'react';
import ShowCategory from "./showcategory";
import noImage from '../../images/missingCoverArt.png';

class IconCategory extends React.Component {
    constructor(props) {
        super(props);
        this.onClick = () => {
            props.pages.addPage(
                <ShowCategory category={props.category} Squadify={props.Squadify} socket={props.socket} pages={props.pages} />
            )
        }

    }
    render() {
        if (this.props.category != null) {
            return (
                <div className="eight wide column" style={column}>
                    <div style={categoryBox} onClick={this.onClick.bind()}>
                        <img style={image} className="tiny ui image" src={this.props.category.icons[0] != null ? this.props.category.icons[0].url : noImage} alt="Category" />
                        <span style={category}>{this.props.category.name}</span> <br />
                    </div>
                </div>
            );
        } else {
            return null;
        }
    }
}

var categoryBox = {
    textAlign: "center",
    textOverflow: "ellipsis",
    whiteSpace: "nowrap",
    overflow: "hidden"
}

var image = {
    margin: "0 auto",
    width: "125px"
}

var category = {
    margin: "0 auto",
    fontSize: "70%"
}

var column = {
    display: "inline-block",
    padding: "20px 10px 20px 10px",
    width: "150px",
    wordBreak: "normal"
}

export default IconCategory;