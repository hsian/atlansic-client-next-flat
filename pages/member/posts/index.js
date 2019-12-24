import React, {Component} from 'react';
import { Grid, Header, Image, Item, Icon, Pagination, Divider } from 'semantic-ui-react'
import Link from 'next/link'
import Router from 'next/router'
import moment from "moment"
import 'moment/locale/zh-cn'

import fetch from "../../../utils/fetch"
import {BASE_HOST} from '../../../config';
import AppContainer from "../../../components/container"
import AsideMenu from "../components/aside_menu"
import styles from "./index.less"

export default class NewPost extends Component{

    state = {
        page: 1,
        pageSize: 2,
        data: {
            posts: []
        }
    }

    async componentDidMount(){
        this.getPosts();
    }

    getPosts = async () => {
        const {page, pageSize} = this.state;
        const res = await fetch({
            url: `/posts_self/?page=${page}&pageSize=${pageSize}`,
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })

        if(!res.error){
            this.setState({
                data: res
            })
        }
    }

    handlePageChange = async (e, {activePage}) => {
        this.setState({
            page: activePage
        },
        () => {
            this.getPosts();
        })
    }

    render(){
        const {data, page, pageSize} = this.state;

        return <AppContainer>
            <Grid padded stackable className={styles.page}> 
                <Grid.Column mobile={16} tablet={16} computer={4}>
                    <AsideMenu/>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={12}>
                    <Header as="h3">文章列表</Header>
                    <Item.Group>
                        {
                            data.posts && data.posts.map((v, i) => (
                                <Item key={i}>
                                    <Item.Content>
                                        <Item.Header as='a'>{v.title}</Item.Header>
                                        <Item.Meta>{moment(v.timestamp).fromNow()}</Item.Meta>       
                                        <Item.Extra className={styles.postExtra}>
                                            <Icon name='like' /><span>4 Likes </span>
                                            <Icon name='edit' />
                                            <Link href={'/member/edit_post?post_id=' + v.id}>
                                                <a>
                                                <span>编辑</span>
                                                </a>
                                            </Link>
                                        </Item.Extra>
                                        <Divider />
                                    </Item.Content>
                                    
                                </Item>
                            ))
                        }
                    </Item.Group>
                    {
                        data.posts && data.posts.length && 
                        <Pagination
                            defaultActivePage={page}
                            onPageChange={this.handlePageChange}
                            ellipsisItem={{ content: <Icon name='ellipsis horizontal' />, icon: true }}
                            firstItem={{ content: <Icon name='angle double left' />, icon: true }}
                            lastItem={{ content: <Icon name='angle double right' />, icon: true }}
                            prevItem={{ content: <Icon name='angle left' />, icon: true }}
                            nextItem={{ content: <Icon name='angle right' />, icon: true }}
                            totalPages={Math.ceil(data.count / pageSize)}
                        /> || null
                    }
                </Grid.Column>
            </Grid>
        </AppContainer>
    }
}