import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      injectRegister: "auto",
      strategies: "generateSW",
      devOptions: { enabled: true },
      manifest: {
        name: "GreatGreen",
        short_name: "GG",
        start_url: "./",
        display: "standalone",
        background_color: "#1b5e20",
        description:
          "Great-Green is a pioneering web application designed to address the critical challenges of desertification, particularly in desert belts like the Sahel, through innovative reforestation and sustainable land management efforts.",
        theme_color: "#1b5e20",

        icons: [
          {
            src: "public/pwa-64x64.png",
            sizes: "64x64",
            type: "image/png",
          },
          {
            src: "public/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "public/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
          {
            src: "public/maskable-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "maskable",
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ url }) => {
              return url.pathname.includes("images");
            },
            handler: "CacheFirst",
            method: "GET",
            options: {
              cacheName: "static-assets",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
          {
            urlPattern: ({ url }) => {
              return url.pathname.includes("journeys");
            },
            handler: "CacheFirst",
            method: "GET",
            options: {
              cacheName: "journeys-cache",
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24,
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },
    }),
  ],
});
