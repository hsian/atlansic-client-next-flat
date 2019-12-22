import React, { Component } from 'react'
import Router from 'next/router'
import Link from 'next/link'
import { Grid, Form, Icon, Button, Segment, Label, Popup, Message } from 'semantic-ui-react'
import fetch from '../../utils/fetch';
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
        captcha: "",
        messageTxt: "",
        formError: false,
        formSuccess: false,
        isLoading: false
    }

    handleToggleMail = () => {
        const {isMail} = this.state;
        this.setState({
            isMail: !isMail
        })
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
        const {isMail, username, password, captcha} = this.state;
        
        this.setState({
            isLoading: true
        })

        let res, body;
        // 密码登录
        if(!isMail){
            body = {
                username,
                password
            }
        }else{
            body = {
                username,
                captcha
            }
        }   

        res = await fetch({
            url: '/login/',
            method: 'POST',
            body
        });

        if(res.error){
            this.setState({
                formError: true,
                messageTxt: res.message
            })
        }else{
            const {token} = res;
            window.localStorage.setItem('token', token);
            // 保存到cookie给getInitialProps来使用
            const cookies = document.cookie.split(";").filter(v => {
                const arr = v.split('=');
                return arr[0] !== 'TOKEN';
            }).join(";")
            
            document.cookie = cookies;
            document.cookie = "TOKEN=" + token;
            
            const {backurl} = Router.router.query;
            Router.replace(backurl || "/")
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
        const {isMail, isSendMail, sendMailCount, messageTxt, isLoading, formError, formSuccess} = this.state;
        return <div className={styles.page}>
            <Grid padded stackable centered>
                <Grid.Column style={{maxWidth: '500px'}}>
                    <Segment padded>
                        <Label as='a' color='blue' corner='right' size="large" onClick={this.handleToggleMail}>   
                            <Popup 
                            content={!isMail && '短信登录' || '密码登录'} 
                            trigger={<Icon name={!isMail && 'mail' || 'lock'} />} />
                        </Label>
                        
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
                            <Form.Field>
                                <Form.Input iconPosition='left' 
                                fluid 
                                placeholder='请输入手机号码' 
                                onChange={this.handleChange}
                                name="username">
                                    <Icon name='user' />
                                    <input />
                                </Form.Input>
                            </Form.Field>
                            {
                                !isMail && <Form.Field>
                                    <Form.Input iconPosition='left' 
                                    fluid 
                                    placeholder='请输入密码'
                                    onChange={this.handleChange}
                                    name="password" >
                                        <Icon name='lock' />
                                        <input type="password"/>
                                    </Form.Input>
                                </Form.Field>
                            }
                            {
                                isMail && <Form.Field>
                                    <Form.Input iconPosition='left' 
                                    fluid 
                                    action 
                                    placeholder='请输入验证码'
                                    onChange={this.handleChange}
                                    name="captcha">
                                        <Icon name='mail' />
                                        <input/>
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
                                <Button loading={isLoading} 
                                primary 
                                fluid 
                                size="large" 
                                type="submit"
                                onClick={this.handleSubmit}>登录</Button>
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
