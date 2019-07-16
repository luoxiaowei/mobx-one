import React from 'react';

const Iconfont = (props) => {
	const { className, type, style, onClick } = props;
	return (
		<span onClick={onClick} style={style} className={`iconfont ${className} icon-${type}`} />
	);
};

Iconfont.propTypes = {

};

Iconfont.defaultProps = {
	className: '', 
	type: '',
	style: {},
	onClick: () => {
		
	}
}

export default Iconfont;
