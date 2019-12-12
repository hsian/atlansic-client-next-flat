import React, {Component} from 'react';
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css'

import getConfig from 'next/config'
const { serverRuntimeConfig, publicRuntimeConfig } = getConfig()
console.log(publicRuntimeConfig.staticFolder)

const QuillNoSSRWrapper = dynamic(import('react-quill'), {
    ssr: false,
    loading: () => <p>Loading ...</p>,
})


export default class Post extends Component{
    componentDidMount(){
        if(document){
            console.log(this.refs.quill)
        }
    }
    render(){
        return <div>
            <QuillNoSSRWrapper ref="quill"/>
        </div>
    }
}