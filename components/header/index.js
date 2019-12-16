import React, { Component } from 'react'
import cls from "classnames"
import Link from 'next/link'
import { Dropdown } from 'semantic-ui-react'
import { Grid } from 'semantic-ui-react'
import Router from 'next/router'

import styles from "./index.less"

const categories = [
    { name: 'vue' },
    { name: 'typescript' },
    { name: 'node' },
    { name: 'react' },
]

const DropdownCategories = () => {

    const navigatorToPost = (v) => {
        Router.push({
            pathname: '/post',
            query: { category: v.name }
        })
    }

    return <Dropdown text='教程' className={styles.dropdown}>
        <Dropdown.Menu>
            {
                categories && categories.map((v, i) => {
                    return <Dropdown.Item key={i} onClick={ () => {navigatorToPost(v)} }>
                        {v.name}
                    </Dropdown.Item>
                })
            }
        </Dropdown.Menu>
    </Dropdown>
}

export default class IndexView extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return <div>
            <div className="min768">
                <Grid className={styles.header_wrapper} padded centered>
                    <Grid className={styles.main} padded container stackable textAlign="left">
                        <div className="column eleven wide row">
                            <Grid.Column width={5}>
                                <Link href="/">
                                    <a><img src="/static/logo.png" style={{width: "100px"}}/></a>
                                </Link>
                                
                                </Grid.Column>
                            <Grid.Column width={11}>
                                <DropdownCategories />
                            </Grid.Column>
                        </div>
                        <Grid.Column width={5} textAlign="right">
                            <Link href="/login"><a>登录 <span>/</span> 注册</a></Link>
                        </Grid.Column>
                    </Grid>
                </Grid>
            </div>

            <div className="max768">
                <Grid className={styles.header_wrapper} padded >
                    <Grid.Column floated='left' width={5} >
                        <Dropdown icon='bars'>
                            <Dropdown.Menu>
                                <Dropdown.Item text='New' />
                                <Dropdown.Item text='Open...' description='ctrl + o' />
                                <Dropdown.Item text='Save as...' description='ctrl + s' />
                                <Dropdown.Item text='Rename' description='ctrl + r' />
                                <Dropdown.Item text='Make a copy' />
                                <Dropdown.Item icon='folder' text='Move to folder' />
                                <Dropdown.Item icon='trash' text='Move to trash' />
                                <Dropdown.Divider />
                                <Dropdown.Item text='Download As...' />
                                <Dropdown.Item text='Publish To Web' />
                                <Dropdown.Item text='E-mail Collaborators' />
                            </Dropdown.Menu>
                        </Dropdown>
                    </Grid.Column>
                    <Grid.Column floated='right' width={5} textAlign="right" verticalAlign="middle">
                        <Link href="/">
                            <a><img src="static/logo.png" className={styles.mobileLogo}/></a>
                        </Link>
                    </Grid.Column>
                </Grid>
            </div>
        </div>
    }
}