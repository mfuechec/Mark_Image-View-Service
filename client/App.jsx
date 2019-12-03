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
            numOfImgs: 6,
            itemName: "",
            numOfVids: 0,
            imageNumber: 2
        }
        this.get.bind(this);
    }

    get() {
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

    render() {
        this.get()
        return (
            <div id="Marks-main-container">
                <div id="Marks-side-images">
                <SideImages />
                </div>
                <div id="Marks-main-image">
                <MainImage imgId={this.state.selectedItem} imgNum={this.state.imageNumber}/>
                </div>
            </div>
        )
    }
}

export default App;