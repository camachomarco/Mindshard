"use client";

import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
/* Import fonts */

/* 'truetype': for .ttf files
'opentype': for .otf files
'woff': for .woff files
'woff2': for .woff2 files */
@font-face {
  font-family: "prodisplay-first";
  src: url("/fonts/sfprodisplay/SF-PRO-DISPLAY-LIGHT.TTF") format("truetype");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: "inconsolata-first";
  src: url("/fonts/inconsolata/Inconsolata_expanded-bold.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

/* @font-face {
  font-family: "inconsolata-first";
  src: url("../../styles/inconsolata/Inconsolata_Condensed-Regular.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
} */

/* Variables */
:root {
  --first-color: #f4f4f4;
  --second-color: #18589e;
  --third-color: #e9f2fc;
  --fourth-color: #3d9ff5;
  --first-color-rgb: 255, 255, 255;
  --second-color-rgb: 24, 88, 158;
  --third-color-rgb: 233, 242, 252;
  --fourth-color-rgb: 61, 159, 245;
  --first-color-border: #ffffff;
  --second-color-border: 24, 88, 158;
  --third-color-border: 233, 242, 252;
  --fourth-color-border: 61, 159, 245;
  
  --first-highlight: #4ee77e;

  --primary-glow: conic-gradient(from 180deg at 50% 50%, #16abff33 0deg, #0885ff33 55deg, #54d6ff33 120deg, #ff00bf8d 160deg, transparent 360deg);
  --secondary-glow: radial-gradient(rgba(255, 255, 255, 1), rgba(255, 255, 255, 0));

  --black: #222222;
  --grey: #a9b2c5;

  --success-color: #28a745;
  --warning-color: #ffc107;
  --error-color: #dc3545;
  --info-color: #17a2b8;

  --first-font: "prodisplay-first";
  --second-font: "inconsolata-first";

  --first-fontsize: 1.25rem;
  --second-fontsize: 1rem;
  --third-fontsize: 0.8rem;

  --line-height: 1.5;

  --spacing-unit: 16px;

  --border-styles: solid;
  --first-borderradius: 16px;
  --second-borderradius: 16px;

  --breakpoint-sm: 576px;
  --breakpoint-md: 768px;
  --breakpoint-lg: 992px;
  --breakpoint-xl: 1200px;

  --box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  --text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);

  --icon-size-small: 1rem;
  --icon-size-base: 1.5rem;
  --icon-size-large: 2rem;

  --gap: 16px;
}

/* Reset/Normalization */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}

body {
  background-image: linear-gradient(to top right, var(--first-color), var(--third-color));
  background-position: center;
  background-repeat: no-repeat;
  font-family: var(--first-font), arial, sans-serif;
  width: 100vw;
  height: 100vh;


}



/* Utility Classes */
/* Commented out as styled-components doesn't support utility classes directly */
/* .u-float-right { float: right; }
  .u-display-none { display: none; } */

/* Animations */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Form Styles */
input,
textarea,
button {
  font-family: var(--first-font);
  border: 1px var(--border-styles) var(--border-color);
  border-radius: var(--border-radius);
}

/* Accessibility Styles */
:focus {
  outline: 2px solid var(--first-color);
}

/* Vendor Prefixes */
button {
  -webkit-appearance: none;
  -moz-appearance: none;
}

/* Print Styles */
@media print {
  body {
    color: var(--black);
  }
}

/* Common Component Styling */
/* .modal { } */
/* .tooltip { } */

/* State Classes */
/* .is-loading { opacity: 0.5; pointer-events: none; } */

/* Media Queries */
@media (min-width: var(--breakpoint-sm)) {
  /* styles for sm breakpoint */
}

/* Dark mode */
@media (prefers-color-scheme: dark) {
  /* :root {
    --primary-glow: radial-gradient(rgba(1, 65, 255, 0.4), rgba(1, 65, 255, 0));
    --secondary-glow: linear-gradient(to bottom right, rgba(1, 65, 255, 0), rgba(1, 65, 255, 0), rgba(1, 65, 255, 0.3));
  } */
}

`;

export default GlobalStyle;
