import React from 'react';
import axios from 'axios';
import MainImage from './components/mainImage.jsx';
import SideImages from './components/sideImages.jsx';

class App extends
React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 1,
            numOfImgs: 2,
            itemName: "",
            numOfVids: 0,
            imageNumber: 1
        }
        this.getImageData.bind(this);
        this.onClickSide.bind(this);
        this.onClickMain.bind(this);
    }

    componentDidMount() {
        this.getImageData();
    }

    getImageData() {
        axios.get(`/${this.state.selectedItem}`)
        .then( (response) => {
            const data = response.data[0];
            this.setState({
                numOfImgs: data.images,
                itemName: data.name,
                numOfVids: data.videos
            })
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    onClickSide(event) {
        const id = parseInt(event.target.src.split('Image-')[1].split('.')[0]);
        for (var i = 1; i < this.state.numOfImgs + 1; i++) {
            if (i === id) {
                const borderable = document.getElementsByClassName(`side${i}`);
                borderable[0].attributes[0].nodeValue = `side side${i} bordered`;
            } else {
                const notBorderable = document.getElementsByClassName(`side${i}`);
                notBorderable[0].attributes[0].nodeValue = `side side${i}`;
            }
        }
        this.setState({
            imageNumber: id,
        })
    }

    onClickMain() {
        //This should throw up a modal with all images
    }

    render() {
        return (
            <div id="m_main_container">
                <div id="m_side_images">
                <SideImages imgId={this.state.selectedItem} onClick={this.onClickSide.bind(this)} numOfImgs={this.state.numOfImgs} imgNum={this.state.imageNumber} />
                </div>
                <div id="m_main_image">
                <MainImage onClick={this.onClickMain.bind(this)} imgId={this.state.selectedItem} imgNum={this.state.imageNumber}/>
                </div>
            </div>
        )
    }
}

export default App;