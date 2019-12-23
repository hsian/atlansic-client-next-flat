import React, { Component } from 'react'
import Router from 'next/router'
import { Grid, Image, Header, Divider, Form, Input, Icon, Button, Message } from 'semantic-ui-react'
import classnames from "classnames"
import styles from "./index.less"
import fetch from "../../../utils/fetch"
import {BASE_HOST} from '../../../config';

import AppContainer from "../../../components/container"
import AsideMenu from "../components/aside_menu"

export default class IndexView extends Component {

    state = {
        form: {
            avatar: "",
            name: "",
            email: ""
        },
        rules: {
            name: {
                validator(value){
                    this.valid = /^[a-zA-Z0-9\w\u4e00-\u9fcc_]{2,6}$/.test(value);
                    return this.valid;
                },
                valid: false
            },
            email: {
                validator(value){
                    this.valid = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
                    .test(value);
                    return this.valid;
                },
                valid: false
            }
        },

        formError: false,
        messageTxt: ""
    }

    async componentDidMount(){
        const token = 'Bearer ' + localStorage.getItem('token');

        const user = await fetch({
            url: "/user_self/",
            headers: {
                Authorization: token
            }
        })

        if(user.error && user.error === 'unauthorized'){
            Router.push({
                pathname: "/login",
                query: {
                    backurl: Router.asPath
                }
            })
        }else{
            const {rules} = this.state;
            Object.keys(rules).forEach(key => {
                rules[key].validator(user[key]);
            })

            this.setState({
                form: user,
                rules
            })  
        }
    }

    handleAvatar = async (e) => {
        const file = e.currentTarget.files[0];

        let formData = new FormData();
        formData.append('file', file);
        //formData.append("name","laotie");

        const useCallback = fetch.use(config => {
            delete config.headers['Content-Type']
        })

        const res = await fetch({
            url: "/upload/",
            method: 'POST',
            parseBody: formData,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })

        fetch.remove(useCallback);

        if(res.error && res.error === 'unauthorized'){
            Router.push({
                pathname: "/login",
                query: {
                    backurl: Router.asPath
                }
            })
        }else{
            this.setState({
                form: {
                    ...this.state.form,
                    avatar: res.url
                }
            })
        }
    }

    handleChange = (e, {name, value}) => {
        const {form, rules} = this.state;

        rules[name].validator(value)
        this.setState({
            form: {
                ...form,
                [name]: value
            }
        })
    }

    handleSubmit = async () => {
        const res = await fetch({
            url: "/user_edit_profile/",
            method: 'POST',
            body: this.state.form,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })

        if(res.error){
            this.setState({
                messageTxt: res.message
            })
        }else{
            Router.replace("/member")
        }
    }

    render() {
        const {form, rules, formError, messageTxt} = this.state;

        console.log(rules)

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
                                <Message
                                    error
                                    header=''
                                    content={messageTxt}
                                    />
                                <Form.Field inline>
                                    <label>头像：</label>
                                    <Image size="tiny" 
                                    avatar 
                                    className={styles.avatar} 
                                    src={BASE_HOST + (form.avatar || '/static/default.png')} />
                                    <span className={classnames('ml20', styles.uploadAvatar)}>
                                        <Icon className="" name='pencil alternate' content="修改" />
                                        <input type="file" onChange={this.handleAvatar}></input>
                                    </span>
                                </Form.Field>
                                <Form.Input
                                    error={rules.name.valid ? false : 
                                        form.name ? '昵称不合法,输入3~6位字符' : false}
                                    fluid
                                    label='昵称：'
                                    placeholder='请输入昵称'
                                    onChange={this.handleChange}
                                    name="name"
                                    value={form.name || ''}
                                    />
                                <Form.Input
                                    error={rules.email.valid ? false : 
                                        form.email ? '邮箱格式错误' : false}
                                    fluid
                                    label='邮箱：'
                                    placeholder='请输入邮箱'
                                    onChange={this.handleChange}
                                    name="email"
                                    value={form.email || ''}
                                    />
                                <Form.Field>
                                    <Button type='submit' 
                                    primary
                                    onClick={this.handleSubmit}>确定</Button>
                                </Form.Field>
                            </Form>
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
            </Grid>
        </AppContainer>
    }
}