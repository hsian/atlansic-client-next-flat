import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Grid, Form, Input, Icon, Button, Segment, Label, Popup } from 'semantic-ui-react'
import styles from "./index.less"

export default class IndexView extends Component {
    state = {
        isMail: false,
        isSendMail: false,
        sendMailCount: 60,
        timer: null
    }

    handleToggleMail = () => {
        const {isMail} = this.state;
        this.setState({
            isMail: !isMail
        })
    }

    handleSendMail = () => {
        const {sendMailCount, isSendMail} = this.state;
        let count = sendMailCount;

        if(isSendMail) return;

        const timer = setInterval(() => {
            if(count === 0){
                clearInterval(this.state.timer)
                this.setState({
                    timer: null,
                    isSendMail: false,
                    sendMailCount: 60
                })
            }else{
                this.setState({
                    sendMailCount: --count
                })
            } 
        }, 1000);

        this.setState({
            timer,
            isSendMail: true
        })
    }

    render() {
        const {isMail, isSendMail, sendMailCount} = this.state;

        return <div className={styles.page}>
            <Grid padded stackable centered>
                <Grid.Column style={{maxWidth: '500px'}}>     
                    <Segment padded>      
                        <Form>
                            <Form.Field required inline>
                                <Input iconPosition='left' fluid placeholder='请输入手机号码'>
                                    <Icon name='user' />
                                    <input />
                                </Input>
                            </Form.Field>
                            <Form.Field required>
                                <Input iconPosition='left' fluid placeholder='请输入昵称 3~6位字符'>
                                    <Icon name='user' />
                                    <input />
                                </Input>
                            </Form.Field>
                            <Form.Field required>
                                <Input iconPosition='left' fluid action placeholder='请输入验证码'>
                                    <Icon name='mail' />
                                    <input />
                                    <Button onClick={this.handleSendMail}  
                                    disabled={isSendMail ? true : false}
                                    className={styles.sendMailBtn}>
                                        {
                                            !isSendMail && '发送验证码' || sendMailCount + 'S'
                                        }
                                    </Button>
                                </Input>
                            </Form.Field>
                            <Form.Field required>
                                <Input iconPosition='left' fluid placeholder='请输入密码'>
                                    <Icon name='lock' />
                                    <input />
                                </Input>
                            </Form.Field>
                            <Form.Field>
                                <Button primary fluid size="large" type="submit">注 册</Button>
                            </Form.Field>
                            <Form.Field>
                                <p className={styles.naviRegister}>
                                    已有账号？请<Link href="/login"><a> 登录</a></Link>
                                </p>
                            </Form.Field>
                        </Form>
                    </Segment>
                </Grid.Column>
                
            </Grid>
        </div>
    }
}