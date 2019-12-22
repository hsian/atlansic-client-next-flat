import React, {Component} from 'react';
import Router from 'next/router'
import { Grid, Form, Input, Header, Button } from 'semantic-ui-react'

import AppContainer from "../../../components/container"
import AsideMenu from "../components/aside_menu"
import styles from './index.less'

export default class NewCategory extends Component{

    constructor(props){
        super(props)

        this.state = {
            id: "",
            name: ""
        }
    }

    componentDidMount(){
        const { id, name} = Router.router.query;
        this.setState({
            id, name
        })
    }

    render(){
        const {name} = this.state;
        return <AppContainer>
            <Grid padded stackable className={styles.page}> 
                <Grid.Column mobile={16} tablet={16} computer={4}>
                    <AsideMenu/>
                </Grid.Column>
                <Grid.Column mobile={16} tablet={16} computer={12}>
                    <Header as="h3">新增栏目</Header>
                    <Form>
                        <Form.Field inline>
                            <label>父级栏目：</label>
                            <p>{name}</p>
                        </Form.Field>
                        <Form.Field inline>
                            <label>栏目名称：</label>
                            <Input placeholder="请输入栏目名称"></Input>
                        </Form.Field>
                        <Button primary type="submit">提交</Button>
                    </Form>
                </Grid.Column>
            </Grid>
        </AppContainer>
    }
}