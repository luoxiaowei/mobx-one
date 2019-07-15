import React, { Component } from 'react';
import ReactDOM from 'react-dom';
let Dom = document.body;
const leaveTime = 201;

const ToastsStatics = {
    info(message, duration = 3, onCallback, showClose = true, options = {}) {
		const div = document.createElement('div');
		Dom.appendChild(div);
		options = {
			...options,
			message,
			duration: duration == 0 ? 1 * 60 * 60 * 24	 : duration,
			onCallback,
			showClose,
			onCloseSoon: () => {
				ReactDOM.unmountComponentAtNode(div);
				Dom.removeChild(div);
			},
			onClose: () => {
				options.onCloseSoon();
			},
		};
		return ReactDOM.render(<Toast {...options} />, div);
	},
}

class Toast extends Component {
    static info = ToastsStatics.info;
    constructor(props) {
		super(props);
	}
    componentWillMount() {
		this.duration = setTimeout(() => {
			// 主线程
			this.handleClose();
		}, Number(this.props.duration) * 1000 - leaveTime);
    }
    handleClose = (e) => {
		e && e.preventDefault();
		e && e.stopPropagation();
		this.refs.fixed.classList.add("_leave");
		this.duration && clearTimeout(this.duration);
		this.timer = setTimeout(() => {
			this.close();
		}, leaveTime);
    }
    
    close = () => {
		// 主动触发，如果有回调就执行回调
		this && this.props.onCallback && this.props.onCallback();
		// 移除弹窗
		this && this.props.onClose && this.props.onClose();
	}
	handlePress = (event, atIndex) => {
		// 关闭
		this.handleClose();
	}
    render() {
		const {
			className = "",
			style = {},
			message,
			showClose
		} = this.props;
		return (
			<div className={'toast'} style={{ ...style }}>
				{showClose && <div className={'_bg'} ref={`bg`} onClick={this.handleClose}/>}
				<div className={'_fixed'} ref={`fixed`}>
					{message}
				</div>
			</div>
		);
		
	}
};

export default Toast;