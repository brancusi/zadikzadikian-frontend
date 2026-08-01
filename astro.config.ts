import { defineConfig } from 'astro/config';

// Netlify serves this output directly from dist; no adapter means no runtime Function.
export default defineConfig({
  output: 'static',
  trailingSlash: 'always',
  build: {
    format: 'directory',
  },
});
