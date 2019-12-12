import {Component} from 'react'
import 'react-quill/dist/quill.snow.css'

const toolbarContainer = [
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
]

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
        // const editor = this.quill.getEditor();
        // editor.on('editor-change', (delta, oldDelta) => {
        //     const newDel = delta.ops && delta.ops
        // })
    }

    imageHandler = () => {
        this.quillEditor = this.quillRef.getEditor()
        const input = document.createElement('input')
        input.setAttribute('type', 'file')
        input.setAttribute('accept', 'image/*')
        input.click()
        input.onchange = async () => {
            const file = input.files[0]
            const formData = new FormData()
            formData.append('quill-image', file)
            console.log(formData)
            // const res = await uploadFile(formData) 
            const range = this.quillEditor.getSelection()
            // const link = res.data[0].url
            const link = 'https://www.baidu.com/img/baidu_jgylogo3.gif'
    
            // this part the image is inserted
            // by 'image' option below, you just have to put src(link) of img here. 
            this.quillEditor.insertEmbed(range.index, 'image', link)
        }
    }

    render(){
        const {ReactQuill} = this.state;
        return <div>
            {
                ReactQuill && <ReactQuill 
                ref={(el) => { this.quillRef = el }}
                modules={{
                    toolbar: {
                        container: toolbarContainer,
                        handlers: {
                            image: this.imageHandler
                        }
                    },

                }} 
                theme="snow" 
                value={this.state.detailTpl}
                onChange={this.handleChangeDetail}
                />
            }
        </div>
    }
}