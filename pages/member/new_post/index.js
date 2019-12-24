import React, {Component} from 'react';
import { Grid, Dropdown, Header, Divider, Form, Input, Icon, Button, Message } from 'semantic-ui-react'
import Router from 'next/router'
import { toast } from 'react-toastify';

import fetch from "../../../utils/fetch"
import {BASE_HOST} from '../../../config';
import AppContainer from "../../../components/container"
import AsideMenu from "../components/aside_menu"
import styles from "./index.less"
import 'react-quill/dist/quill.snow.css'

const data = [
    {
        name: 'vue',
        id: 1,
        children: [
            {
                name: 'v-html',
                id: 2,
                children: [
                    {
                        name: 'v-html111',
                        id: 7
                    },
                    {
                        name: 'v-text222',
                        id: 8
                    }
                ]
            },
            {
                name: 'v-text',
                id: 3
            }
        ]
    },
    {
        name: 'react',
        id: 4,
        children: [
            {
                name: 'jsx',
                id: 5,
                children: [
                    {
                        name: 'children',
                        id: 7
                    },
                    {
                        name: 'props',
                        id: 8
                    }
                ]
            },
            {
                name: 'react-router',
                id: 6
            }
        ]
    }
]

const toolbarContainer = [
    [{ header: '1' }, { header: '2' }],
    [{ size: [] }],
    ['bold', 'italic', 'underline', 'strike'],
    [
    { list: 'ordered' },
    { list: 'bullet' },
    ],
    ["code-block"],
    ['image']
]

export default class NewPost extends Component{

    state = {
        options: [],
        currentValue: [],
        // 查找数组的层级
        level: 0,
        ReactQuill: null,

        title: "",
        body: "",
        messageTxt: "",
        formError: false
    }

    componentDidMount(){
        const {options} = this.state;

        options.push(data.map(v => {
            return {
                key: v.id,
                value: v.id,
                text: v.name
            }
        }))

        this.setState({
            options,
            ReactQuill: require('react-quill')
        });
    }

    uploadFile = async (formData) => {
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

        if(res.error){
            this.setState({
                formError: true,
                messageTxt: "上传失败，" + res.message
            })
        }else{
            return res.url;
        }
    }

    imageHandler = async () => {
        this.quillEditor = this.quillRef.getEditor()
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()
        input.onchange = async () => {
            const file = input.files[0]
            const formData = new FormData()
            formData.append('file', file)

            const url = await this.uploadFile(formData) 
            const range = this.quillEditor.getSelection()
    
            this.quillEditor.insertEmbed(range.index, 'image', BASE_HOST + url)
        }
    }

    // 可以使用level优化查找方式
    handleFindChildren = (options, value) => {
        let arr = [];

        for(let i = 0, item; item = options[i++];){
            if(item.id === value){
                if(item.children && Array.isArray(item.children)){
                    arr = item.children;
                }
                break;
            }
            
            if(item.children && Array.isArray(item.children)){
                const _arr = this.handleFindChildren(item.children, value);
                if(_arr.length){
                    arr = _arr;
                }
            }
        }
        return arr;
    }

    handleCategory = (event, {value}, index) => {    
        let {options, currentValue} = this.state; 
        let arr = this.handleFindChildren(data, value);

        // 修改选择框数量
        options.length = index + 1;
        currentValue.length = index;
        
        // 取数组最后一个值是当前选中的
        if(value){
            currentValue.push(value);
        }
        
        arr = arr.map(v => {
            return {
                key: v.id,
                value: v.id,
                text: v.name
            }
        })
        arr.length && options.push(arr);

        this.setState({
            // 用于快速查找子元素children
            //level: 0,
            currentValue,
            options
        })
    }

    handleChangeDetail = (body) => {
        this.handleChange(null, { 
            name: 'body', 
            value: body 
        })
    }

    handleChange = (e, {name, value}) => {
        this.setState({
            [name]: value
        })
    }

    handleSubmit = async () => {
        const {currentValue, title, body} = this.state;
        if(title.trim() === ""){
            return this.setState({
                formError: true,
                messageTxt: "标题不能为空"
            })
        }

        if(currentValue.length === 0){
            return this.setState({
                formError: true,
                messageTxt: "请选择栏目"
            })
        }

        if(body.trim() === ""){
            return this.setState({
                formError: true,
                messageTxt: "内容不能为空"
            })
        }

        const res = await fetch({
            url: "/new_post/",
            method: "POST",
            body: {
                title,
                body,
                category_id: currentValue[currentValue.length - 1]
            },
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })

        if(!res.error){
            toast("发布成功");
            setTimeout(() => {
                Router.replace("/member/posts")
            }, 1000)
            
        }
    }
    
    render(){
        const {options, ReactQuill, messageTxt, formError} = this.state;

        return <AppContainer>
            <Grid padded stackable className={styles.page}> 
                <Grid.Column mobile={16} tablet={16} computer={4}>
                    <AsideMenu/>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={12}>
                    <Header as="h3">新建文章</Header>
                    <Form error={formError}>
                        <Message
                            error
                            header=''
                            content={messageTxt}
                            />
                        <Form.Field>
                            <Input placeholder='请输入标题' 
                            fluid 
                            className={styles.formField}
                            name="title"
                            onChange={this.handleChange}
                            />
                        </Form.Field>
                        <Form.Field inline >
                            {
                                !!options.length && options.map((v, i) => {
                                    return <Dropdown placeholder='选择栏目'
                                    key={i}
                                    selection
                                    options={v}
                                    clearable
                                    className={styles.dropdown}
                                    onChange={(event, data) => {this.handleCategory(event, data, i)}}/>
                                })
                            }
                        </Form.Field>
                        <Form.Field>
                            {
                                ReactQuill && <ReactQuill 
                                ref={(el) => { this.quillRef = el }}
                                modules={{
                                    toolbar: {
                                        container: toolbarContainer,
                                        handlers: {
                                            image: this.imageHandler
                                        }
                                    },
                                }} 
                                theme="snow" 
                                placeholder="请输入内容"
                                onChange={this.handleChangeDetail}
                                />
                            }
                        </Form.Field>
                        <Form.Field>
                            <Button type='submit' 
                            primary
                            onClick={this.handleSubmit}>发布</Button>
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid>
        </AppContainer>
    }
}