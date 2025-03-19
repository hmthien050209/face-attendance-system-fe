import './assets/main.css'

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import { definePreset } from '@primeuix/themes'
import Aura from '@primeuix/themes/aura'
import { ToastService } from 'primevue'
import PrimeVue from 'primevue/config'
import App from './App.vue'
import router from './router'
import 'primeicons/primeicons.css'
import { generateData } from './testData'

// Define PrimeVue preset
const MyPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '{sky.50}',
      100: '{sky.100}',
      200: '{sky.200}',
      300: '{sky.300}',
      400: '{sky.400}',
      500: '{sky.500}',
      600: '{sky.600}',
      700: '{sky.700}',
      800: '{sky.800}',
      900: '{sky.900}',
      950: '{sky.950}',
    },
  },
})

const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: MyPreset,
    options: {
      cssLayer: {
        name: 'primevue',
        order: 'theme, base, primevue',
      },
    },
  },
})
app.use(ToastService)
app.use(createPinia())
app.use(router)

app.mount('#app')

generateData()
