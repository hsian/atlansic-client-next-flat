import unfetch from 'isomorphic-unfetch';
import {BASE_URL} from '../config';
import Router from 'next/router'

async function fetch(config){
    let { 
        url, 
        body, 
        parseBody,
        headers, 
        ...baseConfig} = config;

    if(!/^http+/.test(url)){
        url = BASE_URL + url;
    }

    baseConfig = {
        ...baseConfig,
        headers: {
            'Content-Type': 'application/json',
            ...headers
        },
        body: parseBody || JSON.stringify(body)
    }

    fetch.pool.forEach(fn => {
        fn(baseConfig);
    })

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

fetch.pool = [];

fetch.use = (callback) => {
    fetch.pool.push(callback);
    return fetch.pool.length - 1;
}

fetch.remove = (id) => {
    fetch.pool.splice(id, 1);
}

export default fetch;