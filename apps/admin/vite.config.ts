import path from "path"
import tailwindcss from "@tailwindcss/vite"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

function getPort(): number | undefined {
  const NODE_ENV = process.env.VITE_NODE_ENV;
  if (!NODE_ENV) throw new Error(`❌ Missing required environment variable: NODE_ENV`);

  const value = process.env.VITE_ADMIN_PORT;

  if (!value && ["development", "test"].includes(NODE_ENV))
    throw new Error(`❌ Missing required VITE_ADMIN_PORT when NODE_ENV is ${NODE_ENV}`);
  if (value && isNaN(Number(value)))
    throw new Error(`❌ Invalid value for VITE_ADMIN_PORT: "${value}" is not a number`);

  return Number(value) || undefined;
}


// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

    server: {
    port: getPort(),
    host: "0.0.0.0", // allow external access (needed in Docker)
    allowedHosts: ["*"],
  },
})
