import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build :{
    outDir : "dist",
    sourcemap : false , // keeping it to false keeps the size of the dist bundle smaller,
    minify : "esbuild", //
    rollupOptions : {
      output : {
        manualChunks :{
          vendor : ["react" , "react-dom"],
          redux : [],
          router : ["react-router-dom"]
        }
      }
    },
  },
  base :"/",
  server : {port : 5173},
  preview : {port : 5173}
});
