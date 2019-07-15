import React from 'react';
export default class Image extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            isImg: false
        };
    }
    componentDidMount() {
        const { src } = this.props;
        var img = new Image();  
        img.onload = () => {
            this.setState({ isImg: true });
        };  
        img.onerror = () => {
            this.setState({ isImg: false });
        };  
        img.src = src;  
    }
    render() {
        const { src, alt } = this.props;
        return (
            <div className={'wh100'}>
                {this.state.isImg ?  <img src={src} alt={alt} /> : <img src={require('static/default.png')} />}
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
