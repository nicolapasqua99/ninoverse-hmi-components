/* CSS custom property names for the configured font stacks.
   Use `var(${fonts.quicksand})` in styled CSS, or read imperatively via getComputedStyle. */

export const fonts = {
    quicksand: '--font-quicksand',
    oxanium: '--font-oxanium',
    rubikGlitch: '--font-rubik-glitch',
    pressStart2p: '--font-press-start-2p',
    pixelifySans: '--font-pixelify-sans',
} as const;

export type FontToken = keyof typeof fonts;

export const googleFontsHref =
    'https://fonts.googleapis.com/css2?family=Quicksand:wght@300..700&family=Oxanium:wght@200..800&family=Rubik+Glitch&family=Press+Start+2P&family=Pixelify+Sans:wght@400..700&display=swap';
