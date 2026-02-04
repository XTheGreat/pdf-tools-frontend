import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      "reboant-delana-halest.ngrok-free.dev",
    ],
  },
});
