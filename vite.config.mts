// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// export default defineConfig({
//   plugins: [react()],
//   server: {
//     proxy: {
//       '/api': {
//         target: 'http://localhost:5000', 
//         changeOrigin: true,
//         // Optional: rewrite path if your backend doesn't expect '/api' prefix
//         // rewrite: (path) => path.replace(/^\/api/, '')
//       }
//     }
//   }
// })

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // 1. OPEN THE DOORS: This allows your Windows browser to see the container
    host: true, 
    port: 5173,
    strictPort: true,
    
    // 2. WINDOWS WATCHER: Required for 'Hot Reload' to work on Windows Docker
    watch: {
      usePolling: true,
    },

    // 3. YOUR PROXY: Keep this so your Frontend can talk to Nginx/Backend
    proxy: {
      '/api': {
        target: 'http://localhost:5000', 
        changeOrigin: true,
      },
      // If you are using Socket.io, add this too:
      '/socket.io': {
        target: 'http://localhost:5000',
        ws: true,
      }
    }
  }
})