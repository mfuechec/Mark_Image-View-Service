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
            imagesOfSelectedItem: 6,
            imageNumber: 2
        }
        this.get.bind(this);
    }

    get() {
        axios.get('/')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
    }

    render() {
        this.get()
        return (
            <div>
                <div>App rendering</div>
                <MainImage imgId={this.state.selectedItem} imgNum={this.state.imageNumber}/>
                <SideImages />
            </div>
        )
    }
}

export default App;