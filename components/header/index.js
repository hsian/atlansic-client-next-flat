import React, {Component} from 'react'
import cls from "classnames"
import Link from 'next/link'
import { Dropdown } from 'semantic-ui-react'
import { Grid, Responsive } from 'semantic-ui-react'

import styles from "./index.less"

const DropdownExampleDropdown = () => (
    <Dropdown text='教程' className={styles.dropdown}>
      <Dropdown.Menu>
        <Dropdown.Item icon='folder' text='Vue' />
        {/* <Dropdown.Divider /> */}
        <Dropdown.Item icon='trash' text='Typescript' />   
      </Dropdown.Menu>
    </Dropdown>
  )

export default class IndexView extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return <div>
            <div className="min768">
                <Grid className={styles.header_wrapper} padded centered>
                    <Grid className={styles.main} padded container stackable textAlign="left">
                            <div className="column eleven wide row">        
                                <Grid.Column width={5}>
                                    logo
                                </Grid.Column>
                                <Grid.Column width={11}>
                                    <DropdownExampleDropdown/>
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
                    <Grid.Column floated='right' width={5} textAlign="right">
                            logo
                    </Grid.Column>
                </Grid>
            </div>
        </div>
    }
}