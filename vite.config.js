// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   base: 'CodeStream_Live_Project', // Set the repository name
// });


import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  // Remove base path unless you're using a subdirectory
  // base: '/CodeStream_Live_Project/', // Comment this out for now
  plugins: [react()],
});

