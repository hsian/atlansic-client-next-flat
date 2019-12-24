import React, { Component } from 'react'
import { Grid, Responsive, Container } from 'semantic-ui-react'
import { ToastContainer, Flip, toast } from 'react-toastify';

import  Header from "../header"
import  Footer from "../footer"
import  styles  from './index.less';

export default class AppContainer extends Component {
    render() {
        const {
            children, 
            showHeader = true, 
            showFooter = true
        } = this.props;

        return <div className={styles.container}>
            { showHeader && <Header/>}
            <Responsive >
                <Grid padded centered>
                    <Container textAlign="left">
                        {children}
                    </Container>
                </Grid> 
            </Responsive>
            { showFooter && <Footer/>}
            <ToastContainer 
            transition={Flip}
            position="top-center"
            autoClose={1500}/>
        </div>
    }
}