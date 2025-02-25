# Static Assets Directory

This directory is for static assets that will be served at the root path of your application.

## Usage

Place static files like images, fonts, or other assets in this directory, and they will be accessible at the root URL of your application.

For example:
- An image placed at `public/ai-hero-image.jpg` will be accessible at `/ai-hero-image.jpg`
- A font placed at `public/fonts/custom-font.woff2` will be accessible at `/fonts/custom-font.woff2`

## Hero Image for AI Page

To add a custom hero image for the AI page:
1. Add your image to this directory (e.g., `ai-hero-image.jpg`)
2. Update the `heroImageUrl` in `src/pages/AI.tsx` to point to your image:
   ```typescript
   const heroImageUrl = '/ai-hero-image.jpg'
   ```

Currently, the AI page is using a placeholder image from Unsplash. Replace it with your own image for production use.