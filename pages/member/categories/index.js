import React, {Component, useState } from 'react';
import { Grid, List, Header, Divider, Form, Input, Icon, Button } from 'semantic-ui-react'
import Link from 'next/link'
import AppContainer from "../../../components/container"
import AsideMenu from "../components/aside_menu"
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

function CategoriesItem(props){
    const [expend, setExpend] = useState(false);

    const {v = {}} = props;

    const handleClick = () =>{
        setExpend(!expend)
    };

    return <List.Item>
        <div className={styles.categoryItem}>
            
            <span onClick={handleClick}>
                <Icon name={
                    v.children ? 
                    expend ? "triangle down" : "triangle right" 
                    : ""
                }></Icon>
                
                {v.name}
            </span>
            <Link href={{
                pathname: "/member/edit_category",
                query: {id : v.id, name: v.name}
            }}>
                <a>修改</a>
            </Link>
            <Link href={{
                pathname: "/member/new_category",
                query: {id : v.id, name: v.name}
            }}>
                <a>新增</a>
            </Link>
        </div>
        <div style={{display: expend ? 'block' : 'none'}}>
            {
                v.children && <CategoriesList data={v.children}/>
            }
        </div>
    </List.Item>
}

function CategoriesList(props){
    const {data = []} = props;

    return <List>
        {
            data && data.map(v => {
                return <CategoriesItem v={v}  key={v.id}/>
            })
        }
    </List> 
}

export default class Categories extends Component{

    state = {
        data
    }

    componentDidMount(){

    }
    
    render(){
        const {data} = this.state;
        return <AppContainer>
            <Grid padded stackable className={styles.page}> 
                <Grid.Column mobile={16} tablet={16} computer={4}>
                    <AsideMenu/>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={12}>
                    <Header as="h3">栏目列表</Header>
                    <CategoriesList data={data}/>
                </Grid.Column>
            </Grid>
        </AppContainer>
    }
}