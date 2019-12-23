import React, { Component } from 'react'
import Router from 'next/router'
import { Grid, Image, Header, Divider, List, Button } from 'semantic-ui-react'
import moment from "moment";
import 'moment/locale/zh-cn'

import styles from "./index.less"
import AppContainer from "../../components/container"
import AsideMenu from "./components/aside_menu"
import fetch from "../../utils/fetch"
import {BASE_HOST} from '../../config';

export default class IndexView extends Component {

    static async getInitialProps(data){
        // 获取token
        let res = {}
        let token = "";

        if(!process.browser){
            const {cookie} = data.req.headers;
            const cookies = {};
            cookie.split(";").forEach(v => {
                const arr = v.split("=");
                cookies[arr[0]] = arr[1];
            });
            token = 'Bearer ' + cookies['TOKEN'];
        }else{
            token = 'Bearer ' + localStorage.getItem('token')
        }

        res = await fetch({
            url: "/user_self/",
            headers: {
                Authorization: token
            }
        })

        return {
            user: res
        };
    }
    
    componentDidMount(){

        // 可封装, 适用需要登录权限的所有页面
        const {user} = this.props;

        if(user.error && user.error === 'unauthorized'){
            Router.push({
                pathname: "/login",
                query: {
                    backurl: Router.asPath
                }
            })
        }
    }

    navigatorToEdit = () => {
        Router.push({
            pathname: '/member/edit_profile',
        })
    }

    render() {
        const {user} = this.props;
        return <AppContainer>
            <Grid padded stackable className={styles.page}>
                <Grid.Column mobile={16} tablet={16} computer={4}>
                    <AsideMenu/>
                </Grid.Column>

                <Grid.Column mobile={16} tablet={16} computer={12}>
                    <Header as="h3">个人资料</Header>
                    <Divider fitted />
                    <Grid padded stackable>
                        <Grid.Column width={12} floated="left">
                            <List className={styles.profileList} size="large">
                                <List.Item>
                                    <List.Content verticalAlign="middle">
                                        头像：
                                        <Image size="tiny" 
                                        avatar 
                                        className={styles.avatar} 
                                        src={BASE_HOST + (user.avatar || '/static/default.png')} />
                                    </List.Content>
                                </List.Item>
                                <List.Item>用户名：{user.username} </List.Item>    
                                <List.Item>昵称：{user.name} </List.Item>
                                <List.Item>邮箱：{user.email}</List.Item>
                                <List.Item>上次登录：{moment(user.last_seen).fromNow()}</List.Item>
                            </List>
                        </Grid.Column>
                        <Grid.Column width={4} floated="right" textAlign="right">
                            <Button content='修改' primary icon='pencil alternate' onClick={this.navigatorToEdit}/>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid>
        </AppContainer>
    }
}