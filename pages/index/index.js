import React, { Component } from 'react'
import cls from "classnames"
import Header from "../../components/header"

export default class IndexView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <Header />

            <div className={cls('ui grid padded centered')}>
                    <div className="ui container secondary pointing menu">
                        <a className="item active">Home </a>
                        <a className="item">Messages </a>
                        <a className="item">好友 </a>
                    </div>
                    
                    <div class="ui large feed container">
                        <div class="event">
                            <div class="label">
                                <img src="https://semantic-ui.com/images/avatar/small/elliot.jpg"/>
                            </div>
                            <div class="content">
                                <div class="summary"><a class="user"> Elliot Fu </a> added you as a friend <div class="date">1 小时前 </div>
                            </div>
                            <div class="meta">
                                <a class="like"><i class="like icon"></i> 4 Likes </a>
                            </div>
                            </div>
                        </div>

                        <div class="event">
                            <div class="label">
                                <i class="pencil icon"></i>
                            </div>
                            <div class="content">
                                <div class="summary">
                                    <a class="ui orange label">Orange</a>
                                    你提交了一个新的主题 <div class="date">3 天前 </div>
                                </div>
                                <div class="extra text">这周末打算举办BBQ，如果你能参加，下午4点来吧 </div>
                                <div class="meta">
                                    <a class="like"><i class="like icon"></i> 11 Likes </a>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    }
}