import React, { Component } from 'react'
import cls from "classnames"
import styles from "./index.less"

import AppContainer from "../../components/container"

export default class IndexView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <AppContainer>
            <div className={styles.page}>
                <div className={cls('ui grid padded centered')}>

                    <div className={cls('ui grid padded container')}>
                        <div className={cls('column eleven wide row left floated')}>

                            <div className="ui container secondary pointing menu">
                                <a className="item active">Home </a>
                                <a className="item">Messages </a>
                                <a className="item">好友 </a>
                            </div>

                            <div className="ui large feed container">
                                <div className="event">
                                    <div className="label">
                                        <img src="https://semantic-ui.com/images/avatar/small/elliot.jpg" />
                                    </div>
                                    <div className="content">
                                        <div className="summary">
                                            <a className="user"> Elliot Fu </a>
                                            added you as a friend 
                                            <div className="date">1 小时前 </div>
                                        </div>
                                        <div className="meta">
                                            <a className="like"><i className="like icon"></i> 4 Likes </a>
                                        </div>
                                    </div>
                                </div>

                                <div className="event">
                                    <div className="label">
                                        <i className="pencil icon"></i>
                                    </div>
                                    <div className="content">
                                        <div className="summary">
                                            <a className="ui orange label">Orange</a>
                                            你提交了一个新的主题 <div className="date">3 天前 </div>
                                        </div>
                                        <div className="extra text">这周末打算举办BBQ，如果你能参加，下午4点来吧 </div>
                                        <div className="meta">
                                            <a className="like"><i className="like icon"></i> 11 Likes </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>


                        <div className={cls('column four wide right floated row')}>

                            <div className={cls("ui vertical menu", styles.asideMenu)}>
                                <a className="item">
                                    <h4 className="ui header">Promotions</h4>
                                    <p>看看我们新的进步</p>
                                </a>
                                <a className="item">
                                    <h4 className="ui header">优惠券</h4>
                                    <p>看看我们的优惠券集合</p>
                                </a>
                                <a className="item">
                                    <h4 className="ui header">折扣</h4>
                                    <p>Visit our rebate forum for information on claiming rebates</p>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppContainer>
    }
}