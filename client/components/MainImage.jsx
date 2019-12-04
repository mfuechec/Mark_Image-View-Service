import React from 'react';

function MainImage(props) {
    const image = `https://mark-ikea-image-view.s3.us-east-2.amazonaws.com/${props.imgId}/Image-${props.imgNum}.jpeg`
    return(
        <div id="mainImgContainer">
            <svg onClick={props.onScroll} id="leftSvg" className="left" ><path className="left" onClick={props.onScroll} d="M11.7,18.22,6.43,13H20V11H6.4l5.31-5.37L10.29,4.22,2.59,12l7.71,7.64Z"></path></svg>
            <img onClick={props.onClick} id="main" src={image} />
            <svg onClick={props.onScroll} id="rightSvg" className="right" ><path className="right" onClick={props.onScroll} d="M12.29,18.37l1.42,1.4L21.41,12,13.7,4.36,12.3,5.78,17.57,11H4v2H17.6Z"></path></svg>
        </div>
    );
};

export default MainImage;