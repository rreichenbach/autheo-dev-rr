# Static Assets Directory

This directory is for static assets that will be served at the root path of your application.

## Usage

Place static files like images, fonts, or other assets in this directory, and they will be accessible at the root URL of your application.

For example:
- An image placed at `public/ai-hero-image.jpg` will be accessible at `/ai-hero-image.jpg`
- A font placed at `public/fonts/custom-font.woff2` will be accessible at `/fonts/custom-font.woff2`

## Hero Images for Pages

### AI Page
To add a custom hero image for the AI page:
1. Add your image to this directory (e.g., `ai-hero-image.jpg`)
2. Update the `heroImageUrl` in `src/pages/AI.tsx` to point to your image:
   ```typescript
   const heroImageUrl = '/ai-hero-image.jpg'
   ```

### DeFi Page
To add a custom hero image for the DeFi page:
1. Add your image to this directory (e.g., `defi-hero-image.jpg`)
2. Update the `heroImageUrl` in `src/pages/DeFi.tsx` to point to your image:
   ```typescript
   const heroImageUrl = '/defi-hero-image.jpg'
   ```

### Hardware Page
To add a custom hero image for the Hardware page:
1. Add your image to this directory (e.g., `hardware-hero-image.jpg`)
2. Update the `heroImageUrl` in `src/pages/Hardware.tsx` to point to your image:
   ```typescript
   const heroImageUrl = '/hardware-hero-image.jpg'
   ```

### DnA Page
To add a custom hero image for the DnA page:
1. Add your image to this directory (e.g., `dna-hero-image.jpg`)
2. Update the `heroImageUrl` in `src/pages/DnA.tsx` to point to your image:
   ```typescript
   const heroImageUrl = '/dna-hero-image.jpg'
   ```

### Software Page
To add a custom hero image for the Software page:
1. Add your image to this directory (e.g., `software-hero-image.jpg`)
2. Update the `heroImageUrl` in `src/pages/Software.tsx` to point to your image:
   ```typescript
   const heroImageUrl = '/software-hero-image.jpg'
   ```

Currently, all pages are using placeholder images. Replace them with your own images for production use.