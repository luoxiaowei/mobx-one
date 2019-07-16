import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { Iconfont } from '../index';
import styles from './Toast.less';
let Dom = document.body;
const leaveTime = 201;

const ToastsStatics = {
	div: document.createElement('div'),
	info(message, duration = 3, onCallback, showClose = true, options = {}) {
		const div = ToastsStatics.div;
		Dom.appendChild(div);
		options = {
			...options,
			message,
			duration: duration == 0 ? 1 * 60 * 60 * 24 : duration,
			onCallback,
			showClose,
			onClose: () => {
				ReactDOM.unmountComponentAtNode(div);
				Dom.removeChild(div);
			},
		};
		return ReactDOM.render(<Toast {...options} />, div);
	},
	loading(message, duration, onCallback, showClose, options = { type: "loading" }) {
		ToastsStatics.info(message, duration, onCallback, showClose, options);
	},
	success(message, duration, onCallback, showClose, options = { type: "success" }) {
		ToastsStatics.info(message, duration, onCallback, showClose, options);
	},
	fail(message, duration, onCallback, showClose, options = { type: "fail" }) {
		ToastsStatics.info(message, duration, onCallback, showClose, options);
	},
	hide() {
		
	}
}

class Toast extends Component {
	constructor(props) {
		super(props);
	}
	
	static info = (...options) => {
		this.init();
		ToastsStatics.info(...options);
	};
	static loading = (...options) => {
		this.init();
		ToastsStatics.loading(...options);
	};
	static success = (...options) => {
		this.init();
		ToastsStatics.success(...options);
	};
	static fail = (...options) => {
		this.init();
		ToastsStatics.fail(...options);
	};
	static init() {
		this.hide();
		this.div = ToastsStatics.div;
	}
	static hide = () => {
		if (this.div && this.div.innerHTML) {
			ReactDOM.unmountComponentAtNode(this.div);
			Dom.removeChild(this.div);
		}
		
	};

	componentWillMount() {
		this.duration = setTimeout(() => {
			this.handleClose();
		}, Number(this.props.duration) * 1000 - leaveTime);
	}
	handleClose = (e) => {
		e && e.preventDefault();
		e && e.stopPropagation();
		this.refs.fixed.classList.add(styles._leave);
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
		this.div = null;
	}
	handlePress = (event, atIndex) => {
		// 关闭
		this.handleClose();
	}
	render() {
		const {
			className = '',
			style = {},
			message,
			showClose,
			type,
		} = this.props;
		return (
			<div className={styles.toast} style={{ ...style }}>
				{showClose && <div className={styles._bg} ref={`bg`} onClick={this.handleClose} />}
				<div className={styles._fixed} ref={`fixed`} onClick={this.handleClose}>
					{type && <Iconfont className={styles[type]} type={type}  />}
					<span className={(type && message) ? styles.pl8 : ''}>{message}</span>
				</div>
			</div>
		);

	}
};

export default Toast;