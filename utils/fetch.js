import unfetch from 'isomorphic-unfetch';
import {BASE_URL} from '../config';
import Router from 'next/router'

async function fetch(config){
    let { 
        url, 
        body, 
        headers, 
        ...baseConfig} = config;

    if(!/^http+/.test(url)){
        url = BASE_URL + url;
    }

    baseConfig = {
        ...baseConfig,
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    }

    const res = await unfetch(url, baseConfig);
    const resJson = await res.json();
    

    // errors
    // if(res.status === 200){
    //     return await res.json();
    // }

    // if(res.status === 401 || res.status === 403 ){
    //     Router.push()
    // }

    return resJson;
    
}

export default fetch;