# A Little Universe — Birthday Website

A responsive React + Vite birthday surprise website. It opens with a scattered memory-photo wall, then reveals the supplied Hubble image with the message:

> You make my little universe beautiful.

## Run locally

1. Install Node.js (18+ recommended).
2. In this folder, run `npm install`.
3. Run `npm run dev` and open the local URL Vite prints.
4. To create a production build, run `npm run build`.

## Add your couple photos

Put your photos in `public/photos/` and name them exactly:

- `photo-1.jpg`
- `photo-2.jpg`
- `photo-3.jpg`
- `photo-4.jpg`
- `photo-5.jpg`
- `photo-6.jpg`
- `photo-7.jpg`
- `photo-8.jpg`

The opening page has graceful placeholders until you add the photos. JPG, PNG or WebP are fine if you update the filenames in `src/main.jsx` to match.

## Hubble image

Your uploaded image is already included at `public/hubble.jpg`.

## Music

The reveal screen has a sound toggle. Browsers require a user gesture before audio can start, so the soft ambient tones begin only when he taps **SOUND OFF**. The ambient sound is synthesised in the browser; no external audio file or copyrighted song is bundled.

## Personalise

The name field was left blank, so the website uses a name-free message. Edit the text in `src/main.jsx` if you'd like to change it.
