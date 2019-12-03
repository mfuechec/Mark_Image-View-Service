import React from 'react';
import axios from 'axios';
import MainImage from './components/mainImage.jsx';
import SideImages from './components/sideImages.jsx';

class App extends
React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 1
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
                <MainImage />
                <SideImages />
            </div>
        )
    }
}

export default App;