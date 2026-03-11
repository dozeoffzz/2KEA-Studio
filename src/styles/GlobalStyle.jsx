import { Global, css } from "@emotion/react";
import { theme } from "./theme";

const globalStyles = css`
  * {
    box-sizing: border-box;
  }

  html,
  body {
    height: 100%;
  }

  body,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  p,
  blockquote,
  pre,
  code,
  dl,
  dt,
  dd,
  ol,
  ul,
  li,
  fieldset,
  legend,
  th,
  td,
  caption,
  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section,
  summary,
  time,
  mark,
  audio,
  video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  article,
  aside,
  details,
  figcaption,
  figure,
  footer,
  header,
  hgroup,
  menu,
  nav,
  section {
    display: block;
  }

  body {
    font-family: Pretendard, system-ui, Avenir, Helvetica, Arial, sans-serif;
    line-height: 1.5;
    color: ${theme.colors.text};
    transition:
      background-color 0.3s,
      color 0.3s;
  }
  ol,
  ul {
    list-style: none;
  }

  blockquote,
  q {
    quotes: none;
  }

  blockquote:before,
  blockquote:after,
  q:before,
  q:after {
    content: "";
    content: none;
  }

  table {
    border-collapse: collapse;
    border-spacing: 0;
  }

  input,
  textarea,
  select,
  button {
    font-family: inherit;
  }

  a {
    text-decoration: none;
    color: inherit;
  }

  button {
    border: none;
    cursor: pointer;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

export const GlobalStyles = () => <Global styles={globalStyles} />;
