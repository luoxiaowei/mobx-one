import React from 'react';

export default class Copy extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handleCopy = () => {
        const { callback } = this.props;
        if (window.getSelection && document.createRange) {
            const selection = window.getSelection();
            const range = document.createRange();
            range.selectNodeContents(this.urlSpan);
            selection.removeAllRanges();
            selection.addRange(range);
        } else if (document.selection && document.body.createTextRange) {
            const range = document.body.createTextRange();
            range.moveToElementText(this.urlSpan);
            range.select();
        }
        try {
            document.execCommand('copy');
            callback && callback(true, 'success');
        } catch (err) {
            callback && callback(false, err);
        }
    }

    render () {
        const { copyText, onClick, children } = this.props;
        return (
            <span
                onClick={(e) => {
                    e.stopPropagation();
                    e.preventDefault();
                    if (onClick) {
                        this.handleCopy();
                    }
                }}
                ref={ref => this.urlSpan = ref} 
            >{copyText}</span>
        );
    }
}

Copy.defaultProps = {
    copyText: 'copy!',
    onClick: false,
    callback: (status, res) => {
        console.log(status, res);
    }
};