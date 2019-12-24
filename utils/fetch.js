import unfetch from 'isomorphic-unfetch';
import {BASE_URL} from '../config';
import Router from 'next/router'

async function fetch(config){
    let { 
        url, 
        body, 
        parseBody,
        headers, 
        NO_MATTER,
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

    fetch.proxyPools.forEach(fn => {
        fn(baseConfig);
    })

    const res = await unfetch(url, baseConfig);
    const resJson = await res.json();

    if(res.status === 401 || res.status === 403 && !NO_MATTER ){
        if(resJson.error && resJson.error === 'unauthorized' && process.browser){
            Router.push({
                pathname: "/login",
                query: {
                    backurl: Router.asPath
                }
            })
        }
    }

    return resJson;
}

fetch.proxyPools = [];

fetch.use = (callback) => {
    fetch.proxyPools.push(callback);
    return fetch.pool.length - 1;
}

fetch.remove = (id) => {
    fetch.proxyPools.splice(id, 1);
}

export default fetch;

// 关淑怡《深夜港湾》陈慧娴《孤单背影》邝美云《堆积情感》叶倩文《情人知己》林忆莲《词不达意》