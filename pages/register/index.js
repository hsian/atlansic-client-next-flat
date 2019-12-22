import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Grid, Form, Input, Icon, Button, Segment, Label, Popup, Message } from 'semantic-ui-react'
import fetch from '../../utils/fetch';
import styles from "./index.less"

export default class IndexView extends Component {
    state = {
        isSendMail: false,
        sendMailCount: 60,
        timer: null,

        username: "",
        password: "",
        captcha: "",
        name: "",
        messageTxt: "",
        formError: false,
        formSuccess: false,
        isLoading: false
    }

    handleSendMail = async () => {
        const {sendMailCount, isSendMail, username} = this.state;
        let count = sendMailCount;

        if(isSendMail) return;

        if(!username){
            this.setState({
                messageTxt: "手机号码不能为空",
                formError: true
            });
            return;
        }

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

        const res = await fetch({
            url: "/captcha/",
            method: 'POST',
            body: {
                'mobile': username
            }
        })

        if(res.error){
            this.setState({
                messageTxt: res.message,
                formError: true
            })
        }else{
            this.setState({
                messageTxt: res.message,
                formSuccess: true,
                // 防止点击登录按钮再点击发送验证码按钮同时出现两个提示框
                formError: false
            })
        }

        this.setState({
            timer,
            isSendMail: true
        })
    }

    handleSubmit = async () => {
        const {username, password, captcha, name} = this.state;
        
        this.setState({
            isLoading: true
        })

        const res = await fetch({
            url: '/register/',
            method: 'POST',
            body: {
                username,
                password,
                captcha,
                name
            }
        });

        if(res.error){
            this.setState({
                formError: true,
                messageTxt: res.message
            })
        }else{
            this.setState({
                formSuccess: true,
                messageTxt: res.message + "，跳转到登录页"
            })

            setTimeout(v => {
                Router.replace("/login")
            }, 1500)
        }

        this.setState({
            isLoading: false
        })
    }

    handleChange = (e, {name, value}) => {
        const data = {
            [name]: value
        }

        if(this.state.messageTxt){
            data.messageTxt = "";
            data.formError = false;
            data.formSuccess = false;
        }
        this.setState(data)
    }

    render() {
        const {isSendMail, sendMailCount, messageTxt, isLoading, formError, formSuccess} = this.state;

        return <div className={styles.page}>
            <Grid padded stackable centered>
                <Grid.Column style={{maxWidth: '500px'}}>     
                    <Segment padded>      
                        <Form error={formError} success={formSuccess}>
                            <Message
                                error
                                header=''
                                content={messageTxt}
                                />
                            <Message
                                success
                                header=''
                                content={messageTxt}
                                />
                            <Form.Field required inline>
                                <Form.Input iconPosition='left' 
                                fluid 
                                placeholder='请输入手机号码'
                                onChange={this.handleChange}
                                name="username">
                                    <Icon name='user' />
                                    <input />
                                </Form.Input>
                            </Form.Field>
                            <Form.Field required>
                                <Form.Input iconPosition='left' 
                                fluid 
                                placeholder='请输入昵称 3~6位字符'
                                onChange={this.handleChange}
                                name="name">
                                    <Icon name='address card' />
                                    <input />
                                </Form.Input>
                            </Form.Field>
                            <Form.Field required>
                                <Form.Input iconPosition='left' 
                                fluid 
                                action 
                                placeholder='请输入验证码'
                                onChange={this.handleChange}
                                name="captcha">
                                    <Icon name='mail' />
                                    <input />
                                    <Button onClick={this.handleSendMail}  
                                    disabled={isSendMail ? true : false}
                                    className={styles.sendMailBtn}>
                                        {
                                            !isSendMail && '发送验证码' || sendMailCount + 'S'
                                        }
                                    </Button>
                                </Form.Input>
                            </Form.Field>
                            <Form.Field required>
                                <Form.Input iconPosition='left' 
                                fluid 
                                placeholder='请输入密码'
                                onChange={this.handleChange}
                                name="password">
                                    <Icon name='lock' />
                                    <input type="password"/>
                                </Form.Input>
                            </Form.Field>
                            <Form.Field>
                                <Button primary 
                                fluid 
                                size="large"
                                type="submit"
                                onClick={this.handleSubmit}>注 册</Button>
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