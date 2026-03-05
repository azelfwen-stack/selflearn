import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, loadEnv} from 'vite';

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, '.', '');
  return {
    plugins: [react(), tailwindcss()],
    define: {
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY),
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      // HMR is disabled in AI Studio via DISABLE_HMR env var.
      // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
      host: '0.0.0.0',
    port: 3000,
    cors: true,
    // 关键配置：允许 ngrok 域名访问
    allowedHosts: [
      'syenitic-lakisha-monobasic.ngrok-free.dev', // 你的 ngrok 域名
      'localhost',
      '127.0.0.1',
      '192.168.0.219' // 你的内网 IP（可选）
    ],
      hmr: process.env.DISABLE_HMR !== 'true',
    },
  };
});
