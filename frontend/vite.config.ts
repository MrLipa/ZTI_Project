import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})


// export default defineConfig(({ command, mode, ssrBuild }) => {
//   if (mode === "production") {
//     if (command === "build" && ssrBuild) {
//       return {
//         plugins: [react()],
//         base: "/vite/",
//       };
//     } else {
//       return {
//         plugins: [react()],
//         base: "/vite/",
//       };
//     }
//   } else {
//     return {
//       plugins: [react()],
//       base: "/vite/",
//       clearSreen: false,
//       logLevel: "info",
//       envDir: "direnv",
//       server: {
//         port: 3000,
//         strictPort: true,
//       },
//       preview: {
//         port: 8000,
//       },
//     };
//   }
// });


// import { defineConfig } from 'vite';
// import reactRefresh from '@vitejs/plugin-react-refresh';
// import legacy from '@vitejs/plugin-legacy';
// import path from 'path';

// export default defineConfig(({ command, mode }) => {
//   const isProduction = mode === 'production';

//   return {
//     plugins: [
//       reactRefresh(),
//       legacy({
//         targets: ['defaults', 'not IE 11'],
//         polyfills: ['es.promise', 'es.array.iterator', 'es.object.assign'],
//       }),
//     ],
//     base: '/vite/',
//     publicDir: 'public',
//     root: path.resolve(__dirname, './'),
//     build: {
//       outDir: 'dist',
//       assetsDir: 'assets',
//       minify: isProduction,
//       sourcemap: !isProduction,
//       rollupOptions: {
//         external: ['react', 'react-dom'],
//         output: {
//           globals: {
//             react: 'React',
//             'react-dom': 'ReactDOM',
//           },
//         },
//       },
//     },
//     server: {
//       port: 3000,
//       open: true,
//       proxy: {
//         '/api': {
//           target: 'http://localhost:8000',
//           changeOrigin: true,
//         },
//       },
//       hmr: {
//         overlay: true,
//       },
//     },
//     optimizeDeps: {
//       exclude: ['lodash'],
//     },
//   };
// });