const withLess = require('@zeit/next-less')
const withCSS = require('@zeit/next-css')

module.exports = {
    publicRuntimeConfig: {
        // Will be available on both server and client
    },
    ...withCSS(withLess({
        cssModules: true,
        webpack(config) {
            config.module.rules.push({
                test: /\.(png|svg|eot|otf|ttf|woff|woff2)$/,
                use: {
                    loader: 'url-loader',
                    options: {
                        limit: 8192,
                        publicPath: '/_next/static/',
                        outputPath: 'static/',
                        name: '[name].[ext]',
                    },
                },
            });

            config.module.rules.forEach(rule => {    
                if(rule.test.toString().includes('.css')){
                    rule.use = rule.use.map(useRule => {
                        if(useRule.loader && useRule.loader.startsWith('css-loader')){
                            
                            useRule = {
                                loader: 'css-loader',
                                options:{ 
                                    modules: false,
                                    // localIdentName: "123"
                                } 
                            }
                        }
                        return useRule;
                    })
                }
            })

            // config.module.rules.forEach(rule => {
                
            //     if(rule.test.toString().includes('.less')){
            //         rule.use = rule.use.map(useRule => {
            //             if(useRule.loader && useRule.loader.startsWith('css-loader')){
            //                 console.log(123)
            //                 useRule = {
            //                     loader: 'css-loader',
            //                     options:{ 
            //                         modules: true,
            //                         localIdentName: "[name]__[local]___[hash:base64:5]"
            //                     } 
            //                 }
            //             }
            //             return useRule;
            //         })
            //     }
            // })

            return config
        },  
    })),
}