import {Component} from 'react'
import './index.css'
import css from './index.less'

import 'semantic-ui-css/semantic.min.css'
import { Button} from 'semantic-ui-react'

export default class IndexView extends Component{
    render(){
        return <div>
            <Button>Click Here</Button>
            <div className="red">45345</div>
            <div className={css.example}>345345</div>
        </div>
    }
}