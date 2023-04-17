const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    devServer: {
        proxy: 'http://80.210.18.189:4313/',
        headers: {"Access-Control-Allow-Origin": "*"}
    }
})
