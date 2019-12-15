import React, { Component } from 'react'
import Router from 'next/router'
import { Grid, Image, Header, Divider, List, Button } from 'semantic-ui-react'
import styles from "./index.less"

import AppContainer from "../../components/container"
import AsideMenu from "./components/aside_menu"

export default class IndexView extends Component {

    navigatorToEdit = () => {
        Router.push({
            pathname: '/member/edit_profile',
        })
    }

    render() {
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
                                        <Image size="tiny" avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
                                    </List.Content>
                                </List.Item>
                                <List.Item>用户名：嘻嘻嘻 </List.Item>    
                                <List.Item>昵称：嘻嘻嘻 </List.Item>
                                <List.Item>邮箱：xxxx@163.com</List.Item>
                                <List.Item>Oranges</List.Item>
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