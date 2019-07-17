import React from 'react';
export default class ImageBox extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isImg: false
        };
    }
    componentDidMount() {
        const { src } = this.props;
        let img = new Image();  
        img.src = src; 
        img.onload = () => {
            this.setState({ isImg: true });
        };  
        img.onerror = () => {
            this.setState({ isImg: false });
        };  
    }
    render() {
        const { src, alt } = this.props;
        return (
            <div style={{ width: '100px' }}>
                {this.state.isImg ?  <img src={src} alt={alt} /> : <img src={require('static/default.png')} alt={alt} />}
            </div>
        );
    }
}

Image.propTypes = {

};

Image.defaultProps = {
    src: '',
    alt: '默认图片'
}
