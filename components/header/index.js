import React, {Component} from 'react'
import cls from "classnames"
import styles from "./index.less"

export default class IndexView extends Component{
    constructor(props){
        super(props);
    }
    
    render(){
        return <div className={cls('ui grid padded centered',styles.header_wrapper)}>
            <div className={cls('ui grid padded container stackable', styles.main)}>        
                <div className="column eleven wide left aligned row">
                    <div className="column five wide left aligned">logo</div>
                    <div className="column eleven wide left aligned">menus</div>
                </div>
                
                <div className="column five wide right aligned">accounts</div>
            </div>
        </div>  
    }
}