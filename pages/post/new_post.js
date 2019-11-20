import {Component} from 'react'
import 'react-quill/dist/quill.snow.css'

const modules = {
    toolbar: [
        [{ header: '1' }, { header: '2' }, { font: [] }],
        [{ size: [] }],
        ['bold', 'italic', 'underline', 'strike', 'blockquote'],
        [
        { list: 'ordered' },
        { list: 'bullet' },
        { indent: '-1' },
        { indent: '+1' },
        ],
        ['link', 'image', 'video'],
        ['clean'],
    ],
    clipboard: {
        // toggle to add extra line breaks when pasting HTML:
        matchVisual: false,
    },
}

export default class IndexView extends Component{
    constructor(props){
        super(props);
        this.state = {
            ReactQuill: null
        }
    }
    componentDidMount(){   
        this.setState({
            ReactQuill: require('react-quill')
        })
    }

    componentDidUpdate(){
        console.log(this.quill)
    }
    render(){
        const {ReactQuill} = this.state;
        return <div>
            {ReactQuill && <ReactQuill 
            ref={(el) => { this.quill = el }}
            modules={modules} 
            theme="snow" />}
        </div>
    }
}