import React, { Component } from 'react'
import {  Menu, Divider, Icon, Accordion, Responsive } from 'semantic-ui-react'
import Link from 'next/link'
import Router from 'next/router'
import styles from "./index.less"

class MenuItem extends Component{
    state = { 
        activeItem: '',
        meunItems: [
            [
                { 
                    path: '/member', 
                    text: '我的资料',
                    permission: 1
                },
                {
                    path: "/member/comments",
                    text: '我的评论',
                    permission: 1
                },
                { 
                    path: '/member/messages', 
                    text: '我的消息',
                    permission: 1
                }
            ],
            [
                { 
                    path: '/member/posts', 
                    text: '我的文章',
                    permission: 2
                },
                { 
                    path: '/member/new_post', 
                    text: '发布文章',
                    permission: 2
                }
            ],
            [
                { 
                    path: '/member/categories', 
                    text: '栏目管理',
                    permission: 2
                }
            ],
            [
                { 
                    path: '/member/comments', 
                    text: '评论管理',
                    permission: 2
                }
            ],
        ]
    }

    componentDidMount(){
        const {meunItems} = this.state;
        let itemText = "我的资料";
        const {pathname} = Router.router;

        meunItems.forEach(subItems => {
            subItems.forEach(v => {
                if(v.path === pathname){
                    itemText = v.text;
                }
            }) 
        })

        this.setState({
            activeItem: itemText
        })
    }

    handleItemClick = (e, { name }) => this.setState({ activeItem: name })

    render(){
        const { activeItem, meunItems } = this.state
        return <Menu secondary vertical fluid>
            {
                (() => {
                    let views = []
                    meunItems.map((subItems, i) => {
                        const _subViews = subItems.map(v => {
                            // 有权限就返回Menu.Item，没有就返回null,, 2是模拟用户admin的权限
                            return 2 >= v.permission ?  <Menu.Item
                                key={v.text}
                                href={v.path}
                                active={activeItem === v.text}
                                onClick={this.handleItemClick}
                                >
                                {v.text}
                            </Menu.Item> : null     
                        })

                        if(_subViews.filter(v => !!v).length){
                            _subViews.push(<Divider fitted key={i}/>)
                        }
                        views = [...views, ..._subViews];
                    })
                    return views;
                })()
            }
            
        </Menu> 
    } 
}

export default class IndexView extends Component {
    state = { 
        activeItem: '我的资料',
        activeIndex: ""
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state
        
        return <div className={styles.aside}>
            <div className="min993">
                <MenuItem/>
            </div>
            <div className="max993">
                <Accordion styled fluid>
                    <Accordion.Title
                        active={activeIndex === 0}
                        index={0}
                        onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            菜单栏目
                    </Accordion.Title>
                    <Accordion.Content active={activeIndex === 0}>
                        <MenuItem/>
                    </Accordion.Content>
                </Accordion>
            </div>
        </div>
    }
}