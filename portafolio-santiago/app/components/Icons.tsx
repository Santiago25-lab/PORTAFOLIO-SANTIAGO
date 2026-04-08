import React from 'react';

export function IconGradient() {
  return (
    <svg width="0" height="0" style={{ position: 'absolute' }}>
      <defs>
        <linearGradient id="primary-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop stopColor="#3b82f6" offset="0%" />
          <stop stopColor="#8b5cf6" offset="100%" />
        </linearGradient>
      </defs>
    </svg>
  );
}

export function HtmlIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 384 512" fill="url(#primary-gradient)" width="48" height="48" {...props}>
      <path d="M0 32l34.9 395.8L191.5 480l157.6-52.2L384 32H0zm308.2 127.9H124.4l4.1 49.4h175.6l-13.6 148.4-97.9 27v.1h-.1l-98.7-27.9-6-75.8h47.7L138 320l53.5 14.5 53.7-14.5 6-62.2H84.3L71.5 112.2h241.1l-4.4 47.7z" />
    </svg>
  );
}

export function CssIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 384 512" fill="url(#primary-gradient)" width="48" height="48" {...props}>
      <path d="M0 32l34.9 395.8L192 480l157.1-52.2L384 32H0zm313.1 80l-4.8 47.3L193 208.6l-.3 .1h111.5l-12.8 146.6-98.2 28.7-98.8-29.2-6.4-73.9h48.9l3.2 38.3 52.6 13.3 54.7-15.4 3.7-41.6-167.3-16.6 9.3-107.2 183.1-41.6-3.3-38.1H95.5l-3.3-37.5H312l1.1-12.8z" />
    </svg>
  );
}

export function JsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 448 512" fill="url(#primary-gradient)" width="48" height="48" {...props}>
      <path d="M400 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zM243.8 381.4c0 43.6-25.6 63.5-62.9 63.5-33.7 0-53.6-17.4-56.7-44.4l33.8-5.3c2.7 13.7 12.3 22 24.3 22 13 0 22.8-6.1 22.8-22v-117.1h38.7v103.3zm120.5 48c-42.3 0-66.5-21.9-70.3-52l33.8-6c3.6 16.5 16 27.6 34.6 27.6 16.9 0 28.5-8.2 28.5-21 0-14.4-12.1-19.8-31.9-27.8l-12.7-5.1c-29.2-11.8-49-27.1-49-57 0-31.1 22.2-56 61.1-56 36 0 58.7 18.2 63.3 49.3l-33.6 5.8c-2.7-14.7-14.7-23.8-29.7-23.8-15.6 0-25.9 8.2-25.9 19.8 0 12.9 9.3 17.6 26.9 24.5l12.7 5c33 13.1 53 26 53 59 0 35.5-24 58.2-64.7 58.2z" />
    </svg>
  );
}

export function ReactIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="-11.5 -10.23174 23 20.46348" fill="none" stroke="url(#primary-gradient)" width="48" height="48" {...props} strokeWidth="1">
      <circle cx="0" cy="0" r="2.05" fill="url(#primary-gradient)"/>
      <g strokeWidth="1" stroke="url(#primary-gradient)">
        <ellipse rx="11" ry="4.2"/>
        <ellipse rx="11" ry="4.2" transform="rotate(60)"/>
        <ellipse rx="11" ry="4.2" transform="rotate(120)"/>
      </g>
    </svg>
  );
}

export function NodejsIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 448 512" fill="url(#primary-gradient)" width="48" height="48" {...props}>
      <path d="M224 0L19.4 116.7v278.5L224 512l204.6-116.7V116.7L224 0zM128 359l-11.3 6.6H76v-120.3L128 216v-34l-116.7 66.8v112.5l116.7 66.8L224 485.4l52.1-29.8v-17l-52.1 29.8L128 411.3V359zm192 11.5L224 430.7l-96-55.2V262v-34l-52 29.8v119.5L224 512l148-84.7V306h-52v64.5zm0-234.3l96 55.2v119.5h52V185.3L224 64 76 148.7v58l52-29.8V119l96-55.2 96 55.2v114.7l-52 29.8V232z" />
    </svg>
  );
}

export function GitIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 416 512" fill="url(#primary-gradient)" width="48" height="48" {...props}>
      <path d="M407.3 221.7L194.3 8.7c-11.6-11.6-30.5-11.6-42.1 0L8.7 152.3c-11.6 11.6-11.6 30.5 0 42.1l213 213c11.6 11.6 30.5 11.6 42.1 0l143.5-143.5c11.6-11.6 11.6-30.5 0-42.2zm-208 1.1l-25-25c-8.9-8.9-8.9-23.4 0-32.3s23.4-8.9 32.3 0l6.3 6.3V140c-17.5-3.3-30.6-18.7-30.6-37 0-21 17-38 38-38s38 17 38 38c0 15.6-9.5 29.1-23.1 35.1v73.1c13.6 5.9 23.1 19.5 23.1 35.1 0 21-17 38-38 38s-38-17-38-38c0-11 4.5-20.9 11.8-28.1s17.1-11.8 28.1-11.8v-20.2z" />
    </svg>
  );
}
