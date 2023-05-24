import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import reactRefresh from '@vitejs/plugin-react-refresh';
import legacy from '@vitejs/plugin-legacy';
import path from 'path';

// // https://vitejs.dev/config/
export default defineConfig(({ command, mode, ssrBuild }) => {
  if (mode === "production") {
    if (command === "build") {
      return {
        plugins: [react()],
        base: "/",
      };
    } else if (command === "serve"){
      return {
        plugins: [react()],
        base: "/",
      };
    }else if (command === "lint"){
      return {
        plugins: [react()],
        base: "/",
      };
    }
    else if (command === "test"){
      return {
        plugins: [react()],
        base: "/",
      };
    }
  } 
  else if (mode === "test"){
    return {
      plugins: [react()],
      base: "/",
    };
  }
  else {
    const isProduction = mode === 'production';
    return {
      plugins: [
        react(),
        reactRefresh(),
        legacy({
          targets: ['defaults', 'not IE 11'],
          polyfills: ['es.promise', 'es.array.iterator', 'es.object.assign'],
        }),
      ],
      base: "/",
      clearSreen: false,
      logLevel: "info",
      publicDir: 'public',
      root: path.resolve(__dirname, './'),
      // envDir: "direnv",
      build: {
        outDir: 'dist',
        assetsDir: 'assets',
        minify: isProduction,
        sourcemap: !isProduction,
        rollupOptions: {
          external: ['react', 'react-dom'],
          output: {
            globals: {
              react: 'React',
              'react-dom': 'ReactDOM',
            },
          },
        },
      },
      server: {
        port: 5173,
        strictPort: true,
        open: true,
        proxy: {
          '/api': {
            target: 'http://localhost:8000',
            changeOrigin: true,
          },
        },
        hmr: {
          overlay: true,
        },
      },
      preview: {
        port: 8000,
      },
      optimizeDeps: {
        exclude: ['lodash'],
      },
    };
  }
});
