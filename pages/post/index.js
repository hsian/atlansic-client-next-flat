import React, {Component, useState } from 'react';
import Router from 'next/router'
import { 
    Grid, 
    List, 
    Header, 
    Divider, 
    Form, 
    Input, 
    Icon, 
    Button, 
    Segment, 
    TextArea, 
    Comment,
    Pagination
 } from 'semantic-ui-react'
import Link from 'next/link'

import AppContainer from "../../components/container"
import styles from "./index.less"

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

const comments = [
    {
        content: "非常喜欢",
        children: [
            {
                content: "非常喜欢1",
            },
            {
                content: "非常喜欢2",
                children: [
                    {
                        content: "非常喜欢3",
                    }
                ]
            }
        ]
    },
    {
        content: "非常喜欢4",
    }
]

function CategoriesItem(props){
    const {v} = props;
    return <li>
        <div className={styles.categoryItem}>
            <span>
                <Link href={{
                    pathname: "/post",
                    query: {id : v.id, category: v.name}
                }}>
                    <a>{v.name}</a>
                </Link>
                
            </span>
        </div>
        <CategoriesList data={v.children}/>
    </li>
}

function CategoriesList(props){
    const {data = []} = props;

    return <ul className={styles.categoryList}>
        {
            data && data.map(v => {
                return <CategoriesItem v={v}  key={v.id}/>
            })
        }
    </ul> 
}

function CommentsList(props){
    const {data} = props;

    return <Comment.Group>
        {
            data && data.map((item, i) => {
                return <Comment key={i}>
                    <Comment.Avatar as='a' src='https://react.semantic-ui.com/images/avatar/small/jenny.jpg' />
                    <Comment.Content>
                        <Comment.Author as='a'>Jenny Hess</Comment.Author>
                        <Comment.Metadata>
                            <span>Just now</span>
                        </Comment.Metadata>
                            <Comment.Text>{item.content}</Comment.Text>
                        <Comment.Actions>
                            <a>回复</a>
                        </Comment.Actions>
                    </Comment.Content>
                    {
                        item.children && <CommentsList data={item.children}/>
                    }
                </Comment>
            })
        }
    </Comment.Group>
}

export default class Post extends Component{
    state = {
        data
    }

    render(){
        return <AppContainer>
            <Grid padded stackable className={styles.page}>
                <Grid.Column mobile={16} tablet={16} computer={12}>
                    <Segment>
                        <Header>Flask Web开发：基于Python的Web应用开发实战（第2版）</Header>
                        <Divider />
                        <div>
                            123123123123
                        </div>
                    </Segment>
                    <Form>
                        <Header as="h3">评论</Header>
                        <Form.Field>
                            <TextArea placeholder='说点什么...' className={styles.commentInput}/>
                        </Form.Field>
                        <Form.Field className={styles.commentSubmit}>
                            <Button primary>提交</Button>
                        </Form.Field>
                    </Form>
                    <CommentsList data={comments}/>
                    
                    <div className={styles.paginWrapper}>
                        <Pagination
                            boundaryRange={0}
                            defaultActivePage={1}
                            ellipsisItem={null}
                            firstItem={null}
                            lastItem={null}
                            siblingRange={1}
                            totalPages={10}
                        />
                    </div>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={4}>
                    <CategoriesList data={data}/>
                </Grid.Column>
            </Grid>
        </AppContainer>
    }
}