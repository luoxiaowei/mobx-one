
import React from 'react';

export default class UploadImg extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            imgURL: props.defaultImg || []
        };
    }

    componentDidMount() {
        
    }

    handleChangeImg = (imgs) => {
        this.setState({
            imgURL: [...imgs]
        });
    }

    handleFile = async (event) => {
        const { limit } = this.props;
        let files = event.target.files;
        let length = files.length + this.state.imgURL.length;
        
        if (length > limit) {
            Toast.info(`最多上传${limit}张图`, 2);
            return false;
        }
        let ossUrl;
        let count = 0;
        let success = 0;
        let fail = 0;
        for (let i = 0; i < length; i++) {
            
            try {
                Toast.hide(); // hack
                Toast.loading(`${count++}/${length}`, 0);
                ossUrl = await this.promiseOss(files[i]);
                await this.promiseState(ossUrl);
                success++;
            } catch (err) {
                fail++;
                Toast.hide(); // hack
                Toast.info(`上传结果：失败`, 2);
            }
        }
        Toast.hide(); // hack
        Toast.info(`上传结果：成功`, 2);

    }
    promiseState = (ossUrl) => {
        return new Promise((resolve, reject) => {
            this.setState({
                imgURL: [...this.state.imgURL, ossUrl]
            }, () => {
                resolve();
                this.props.onChange && this.props.onChange(this.state.imgURL, 'add');
            });
        });
    }

    promiseOss = (file) => { // 先上传到oss
        return new Promise((resolve, reject) => {
            let reader = new FileReader();
            if (file.size > 5 * 1024 * 1024) {
                Toast.info('图片不能超过5M');
                // reject('error');
            } else {
                reader.onload = () => {
                    let formData = new FormData();
                    formData.append('file', file);
                    let xhr = new XMLHttpRequest();
                    xhr.open('POST', api.uploadImg, true);
                    xhr.send(formData);
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4) {
                            let res = JSON.parse(xhr.responseText);
                            if(xhr.status === 200) {
                                resolve(res.data.file_path);
                            } else{
                                Toast.info(res.errmsg, 2);
                                // reject('oss error');
                            } 
                        }
                    };             
                };
                reader.readAsDataURL(file);
            }
        });
    }

    handleDel = (index) => {
        let arr = [...this.state.imgURL];
        arr.splice(index, 1);
        this.setState({
            imgURL: [...arr]
        });
    }   

    render() {
        const { className, limit } = this.props;
        const { imgURL } = this.state;
        return (
            <div className={`${className} uplaod`}>
                {imgURL && imgURL.map((item, index) => {
                    return (
                        <div key={item + index} className={'_imgbox'}>
                            <img 
                                alt={''} 
                                src={item} 
                                className={'_img'} 
                                onClick={() => {
                                    window.WeixinJSBridge && window.WeixinJSBridge.invoke("imagePreview", {
                                        "urls": [item],
                                        "current": item
                                    });
                                }}
                            />
                            <Icon onClick={() => this.handleDel(index)} className={'_del'} type={'shangchu'} />
                        </div> 
                    );
                })}
                {imgURL.length < limit && <div className={'uploadImg'}>
                    <input
                        type="file"
                        accept="image/jpg,image/jpeg,image/png,image/gif,image/bmp"
                        onChange={this.handleFile}
                        onClick={(e) => e.stopPropagation()}
                        ref="upload"
                        className={'_input'}
                    />
                    <Icon type={'add1'} />
                </div>}
            </div>
        );
    }
}
UploadImg.defaultProps = {
    className: '',
    limit: 1,
    defaultImg: []
};
