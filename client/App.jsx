import React from 'react';
import axios from 'axios';
import MainImage from './components/mainImage.jsx';
import SideImages from './components/sideImages.jsx';

class App extends
React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedItem: 5,
            previouslySelectedImageNumber: 1,
            numOfImgs: 2,
            itemName: "",
            numOfVids: 0,
            imageNumber: 1,
            dummy: true
        }
        this.getImageData.bind(this);
        this.onClickSide.bind(this);
        this.onClickMain.bind(this);
        this.setBorder.bind(this);
        this.animate.bind(this);
    }

    componentDidMount() {
        this.getImageData();
        this.setBorder();
        this.render();
    }

    animate() {
        var element = document.getElementById('mainImgGallery');
        element.style.animation = "";
        var sheet = document.styleSheets[0];
        var previous = this.state.previouslySelectedImageNumber;
        var current = this.state.imageNumber;
        for (var i = sheet.rules.length-1; i > -1; i--) {
            if (sheet.rules[i].name === "gallerymover" && sheet.deleteRule(i) !== undefined) {
                sheet.deleteRule(i)
                console.log(sheet)
            }
        }
        if (sheet.insertRule !== undefined) {
            sheet.insertRule(
                `
                @keyframes gallerymover {
                    0% {right: ${(previous * 488) - 488}px;}
                    100% {right: ${(current * 488) - 488}px;}
                }
                `
            )
        }
        element.style.animation = 'gallerymover 1s steps(10) forwards';
    }

    setBorder(selected) {
        selected = selected || 1;
        for (var i = 1; i < this.state.numOfImgs + 1; i++) {
            if (i === selected) {
                const borderable = document.getElementsByClassName(`side${i}`);
                borderable[0].attributes[0].nodeValue = `side side${i} bordered`;
            } else {
                const notBorderable = document.getElementsByClassName(`side${i}`);
                notBorderable[0].attributes[0].nodeValue = `side side${i}`;
            }
        }
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
        this.setBorder(id);
        var newPrev = 0;
        if (this.state.imageNumber !== id) {
            newPrev = this.state.imageNumber
        } else {
            newPrev = this.state.previouslySelectedImageNumber
        }
        this.setState({
            previouslySelectedImageNumber: newPrev,
            imageNumber: id,
        }, () => this.animate())
    }

    onClickMain() {
        //This should throw up a modal with all images
    }

    onClickArrow(event) {
        var currentImage = this.state.imageNumber;
        if (event.target.className.baseVal === "left") {
            if (this.state.imageNumber > 1) {
                this.setBorder(currentImage - 1);
                this.setState({
                    imageNumber: currentImage - 1,
                    previouslySelectedImageNumber: currentImage
                }, () => this.animate())
            } else {
                this.setBorder(this.state.numOfImgs);
                this.setState({
                    imageNumber: this.state.numOfImgs,
                    previouslySelectedImageNumber: 1
                }, () => this.animate())
            }
        } else if (event.target.className.baseVal === "right") {
            if (this.state.imageNumber === this.state.numOfImgs) {
                this.setBorder(1);
                this.setState({
                    imageNumber: 1,
                    previouslySelectedImageNumber: currentImage
                }, () => this.animate())
            } else {
                this.setBorder(currentImage + 1);
                this.setState({
                    imageNumber: currentImage + 1,
                    previouslySelectedImageNumber: currentImage
                }, () => this.animate())
            }
        }
    }

    render() {
        return (
            <div id="m_main_container">
                <div id="m_side_images">
                <SideImages selectedItemId={this.state.selectedItem} onClick={this.onClickSide.bind(this)} numOfImgs={this.state.numOfImgs} imgNum={this.state.imageNumber} />
                </div>
                <div id="m_main_image">
                <MainImage previousImage={this.state.previouslySelectedImageNumber} numOfImgs={this.state.numOfImgs} onScroll={this.onClickArrow.bind(this)} onClick={this.onClickMain.bind(this)} selectedItemId={this.state.selectedItem} imgNum={this.state.imageNumber}/>
                </div>
                {/* <div id="modal">
                <Modal onClick={this.onClickModal.bind(this)} />
                </div> */}
            </div>
        )
    }
}

export default App;