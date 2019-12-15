import React, { Component } from 'react'
import { Grid, Image, Header, Divider, Form, Input, Icon, Button } from 'semantic-ui-react'
import classnames from "classnames"
import styles from "./index.less"

import AppContainer from "../../../components/container"
import AsideMenu from "../components/aside_menu"

export default class IndexView extends Component {

    render() {
        return <AppContainer>
            <Grid padded stackable className={styles.page}> 
                <Grid.Column mobile={16} tablet={16} computer={4}>
                    <AsideMenu/>
                </Grid.Column>

                <Grid.Column mobile={16} tablet={16} computer={12}>
                    <Header as="h3">编辑资料</Header>
                    <Divider fitted />
                    <Grid padded stackable>
                        <Grid.Column width={16}>
                            <Form success>
                                <Form.Field inline>
                                    <label>头像：</label>
                                    <Image size="tiny" avatar src='https://react.semantic-ui.com/images/avatar/small/helen.jpg' />
                                    <span className={classnames('ml20', styles.uploadAvatar)}>
                                        <Icon className="" name='pencil alternate' content="修改" />
                                        <input type="file"></input>
                                    </span>
                                </Form.Field>
                                <Form.Input
                                    error={'昵称不合法'}
                                    fluid
                                    label='昵称：'
                                    placeholder='请输入昵称'
                                    />
                                <Form.Input
                                    error={'邮箱格式错误'}
                                    fluid
                                    label='邮箱：'
                                    placeholder='请输入邮箱'
                                    />
                                <Form.Field>
                                    <Button type='submit' primary>确定</Button>
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid>
        </AppContainer>
    }
}