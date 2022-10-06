import Vue from 'vue'
import axios from 'axios'

Vue.use({
    install(Vue){
        const axiosCustom = axios.create({
            baseURL: process.env.VUE_APP_API_URL,
            headers: { 'token': localStorage.getItem("token") }
        });
        axiosCustom.interceptors.request.use(config => {
            NProgress.start()
            return config
        })
        axiosCustom.interceptors.response.use(response => {
            NProgress.done()
            return response
        })

        Vue.prototype.$clubApi = axiosCustom
    }
})