import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';

import 'vuetify/styles';
import { createVuetify } from 'vuetify';
import * as components from 'vuetify/components';
import * as directives from 'vuetify/directives';

import '@mdi/font/css/materialdesignicons.css';

import router from './router';
import httpPlugin from './plugins/http';

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        colors: {
          primary: '#1C1C1C',
          secondary: '#2E2E2E',
          tertiary: '#EE8F90',
        },
      },
    },
  },
});

const pinia = createPinia();
const app = createApp(App);

app.use(vuetify);
app.use(router);
app.use(httpPlugin);
app.use(pinia);
app.mount('#app');
