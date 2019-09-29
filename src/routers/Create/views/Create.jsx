import React, { Component } from 'react';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        };
    }

    async componentDidMount() {
        // const run = async () => {
        //     const result = await this.getInfo();
        //     console.log(result, 'run');
        //     if (result > 50) {
        //         return await run();
        //     } else {
        //         return result;
        //     }
        // }
        // this.run().then(res => {
        //     console.log(res, 'result');
        // }).catch(err => {
        //     console.log(err);
        // });
        
    }
    run = () => {
        return new Promise((resolve) => {
            this.getInfo().then(result => {
                console.log(result);
                if (result > 50) {
                    resolve(result);
                    return result;
                } else {
                    return new Promise((resolve) => {
                        setTimeout(() => {
                            this.run()
                        }, 1000);
                    })
                }
            });
            
        })
    }
    // 异步得到结果
    getInfo = () => {
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(Math.ceil(Math.random() * 100));
            }, 1000);
        })
        
    }

    handleReady = () => {
        
    }

    handleChange = (value) => {
        this.setState({value});
    }

    render() {
        return (
            <div style={{ height: 2000 }} className={'flexac flex w1'}>
                create哈哈d
            </div>
        );
    }
}