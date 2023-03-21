import useMainStore from '@/stores/modules/main'
import axios from 'axios'
import { storeToRefs } from 'pinia'

import { BASE_URL, TIMEOUT } from './config'

const mainStore = useMainStore()
const { isLoading } = storeToRefs(mainStore)

class HYRequest {
  constructor(baseURL, timeout=10000) {
    this.instance = axios.create({
      baseURL,
      timeout
    })
    this.instance.interceptors.request.use(config => {
      isLoading.value = true;
      return config
    }, err => {
      return err
    })
    this.instance.interceptors.response.use(res => {
      isLoading.value = false;
      return res
    }, err => {
      isLoading.value = false;
      return err
    })
  }

  request(config) {
    // isLoading.value = true;
    return new Promise((resolve, reject) => {
      this.instance.request(config).then(res => {
        resolve(res.data)
        // isLoading.value = false;
      }).catch(err => {
        reject(err)
        // isLoading.value = false;
      })
    })
  }

  get(config) {
    return this.request({ ...config, method: "get" })
  }

  post(config) {
    return this.request({ ...config, method: "post" })
  }
}

export default new HYRequest(BASE_URL, TIMEOUT)


