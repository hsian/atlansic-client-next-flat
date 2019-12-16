import React, {Component} from 'react';
import { Grid, Dropdown, Header, Divider, Form, Input, Icon, Button } from 'semantic-ui-react'

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
    ['image']
]

export default class NewPost extends Component{

    state = {
        options: [],
        currentValue: [],
        // 查找数组的层级
        level: 0,
        ReactQuill: null,
        content: ""
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

    imageHandler = () => {
        this.quillEditor = this.quillRef.getEditor()
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()
        input.onchange = async () => {
            const file = input.files[0]
            const formData = new FormData()
            formData.append('quill-image', file)
            console.log(formData)
            // const res = await uploadFile(formData) 
            const range = this.quillEditor.getSelection()
            // const link = res.data[0].url
            const link = 'https://www.baidu.com/img/baidu_jgylogo3.gif'
    
            // this part the image is inserted
            // by 'image' option below, you just have to put src(link) of img here. 
            this.quillEditor.insertEmbed(range.index, 'image', link)
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

    handleChangeDetail = (content) => {
        this.setState({
            content
        })
    }
    
    render(){
        const {options, ReactQuill} = this.state;

        return <AppContainer>
            <Grid padded stackable className={styles.page}> 
                <Grid.Column mobile={16} tablet={16} computer={4}>
                    <AsideMenu/>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={12}>
                    <Header as="h3">新建文章</Header>

                    <Form>
                        <Form.Field>
                            <Input placeholder='请输入标题' fluid className={styles.formField}/>
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
                            <Button type='submit' primary>发布</Button>
                        </Form.Field>
                    </Form>
                </Grid.Column>
            </Grid>
        </AppContainer>
    }
}