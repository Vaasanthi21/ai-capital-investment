import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

import fs from 'fs'

// Certificate Copy Plugin
function copyCertificatesPlugin() {
  return {
    name: 'copy-certificates',
    buildStart() {
      const downloadsDir = 'C:\\Users\\vasan\\Downloads'
      const targetDir = path.resolve(__dirname, 'public/certificates')

      if (!fs.existsSync(targetDir)) {
        fs.mkdirSync(targetDir, { recursive: true })
      }

      const certFiles = [
        { src: 'Ankush Jain_NISM V.pdf', dest: 'ankush_jain_nism_va_mutual_funds.pdf' },
        { src: 'NISM_XV_Ankush jain.pdf', dest: 'ankush_jain_nism_xv_research_analyst.pdf' },
        { src: 'NSIM_XXIA_Ankush Jain.pdf', dest: 'ankush_jain_nism_xxia_pms_advisor.pdf' },
        { src: 'NSIM_VA_Anant Jain.pdf', dest: 'anant_jain_nism_va_mutual_funds.pdf' },
        { src: 'NSIM_XVI_Anant Jain.pdf', dest: 'anant_jain_nism_xvi_commodity_derivatives.pdf' }
      ]

      certFiles.forEach(file => {
        const srcPath = path.join(downloadsDir, file.src)
        const destPath = path.join(targetDir, file.dest)
        if (fs.existsSync(srcPath)) {
          fs.copyFileSync(srcPath, destPath)
          console.log(`[Vite Certificate Plugin] Copied ${file.src} -> ${file.dest}`)
        }
      })
    }
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), copyCertificatesPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
      },
    },
  },
  build: {
    sourcemap: true,
    modulePreload: false,
  },
})

