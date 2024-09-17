import axios from 'axios';

let baseURL = 'http://localhost:5000/black-ginger/us-central1';

if (!['localhost'].includes(window.location.hostname)) {
  baseURL = 'https://calculatedistance-kur5wvptnq-uc.a.run.app';
}

const httpPlugin = {
  install(Vue) {
    const instance = axios.create({
      baseURL,
      timeout: 10000,
    });

    Vue.config.globalProperties.$http = instance;
  },
};

export default httpPlugin;
