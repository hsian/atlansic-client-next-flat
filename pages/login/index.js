import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Grid, Form, Input, Icon, Button, Segment, Label, Popup } from 'semantic-ui-react'
import fetch from 'isomorphic-unfetch';
import config from '../../config'
import styles from "./index.less"

export default class IndexView extends Component {
    state = {
        isMail: false,
        isSendMail: false,
        sendMailCount: 60,
        timer: null,

        username: "",
        password: "",
        captcha: ""
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

    handleSubmit = async () => {
        const {isMail, username, password, captcha} = this.state;
        let res;
        // 密码登录
        if(!isMail){
            res = await fetch(config.BASE_URL + "/login/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    username,
                    password
                })
            });
        }
        
        const resJson = await res.json();
    }

    handleChange = (e, {name, value}) => {
        this.setState({
            [name]: value
        })
    }

    render() {
        const {isMail, isSendMail, sendMailCount} = this.state;

        return <div className={styles.page}>
            <Grid padded stackable centered>
                <Grid.Column style={{maxWidth: '500px'}}>
                
                    <Segment padded>
                        <Label as='a' color='blue' corner='right' size="large" onClick={this.handleToggleMail}>   
                            <Popup 
                            content={!isMail && '短信登录' || '密码登录'} 
                            trigger={<Icon name={!isMail && 'mail' || 'lock'} />} />
                        </Label>
                        
                        <Form onSubmit={this.handleSubmit}> 
                            <Form.Field>
                                <Form.Input iconPosition='left' 
                                fluid 
                                placeholder='请输入手机号码' 
                                onChange={this.handleChange}>
                                    <Icon name='user' />
                                    <input name="username" />
                                </Form.Input>
                            </Form.Field>
                            {
                                !isMail && <Form.Field>
                                    <Form.Input iconPosition='left' 
                                    fluid 
                                    placeholder='请输入密码'
                                    onChange={this.handleChange}>
                                        <Icon name='lock' />
                                        <input name="password" type="password"/>
                                    </Form.Input>
                                </Form.Field>
                            }
                            {
                                isMail && <Form.Field>
                                    <Form.Input iconPosition='left' 
                                    fluid 
                                    action 
                                    placeholder='请输入验证码'>
                                        <Icon name='mail' />
                                        <input name="captcha"/>
                                        <Button onClick={this.handleSendMail}  
                                        disabled={isSendMail ? true : false}
                                        className={styles.sendMailBtn}>
                                            {
                                                !isSendMail && '发送验证码' || sendMailCount + 'S'
                                            }
                                        </Button>
                                    </Form.Input>
                                </Form.Field>
                            }
                            <Form.Field>
                                <Button primary fluid size="large" type="submit">登录</Button>
                            </Form.Field>
                            <Form.Field>
                                <p className={styles.naviRegister}>
                                    <span title="点击右上角切换">忘记密码请使用短信登录</span>
                                    ，新用户请   
                                    <Link href="/register"><a> 注册</a></Link>
                                </p>
                            </Form.Field>
                        </Form>
                    </Segment>
                </Grid.Column>
                
            </Grid>
        </div>
    }
}
