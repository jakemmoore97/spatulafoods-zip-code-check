import App from './App.svelte'
import 'virtual:windi.css'
import 'virtual:windi-devtools'

const app = new App({
  target: document.getElementById('app'),
})

export default app
