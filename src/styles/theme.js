export const Theme = {
  colors: {
    redaccent: "#752323",
    greenaccent: "#898861",
    greentext: "#6A7620",
    yellowaccent: "#dda351",
    white: "#fafafa",
    black: "#0c0c0c",
    whitetext: "#fafafa",
    blacktext: "#0c0c0c",
    qrtext: "#2A1401",
    textsecondary: "#999999",
    overlay: "#0c0c0c30",
    grayline: "#dddddd",
    graybg: "#f5f5f3",
    qrbg: "#1B1918",
    qrimgbg: "rgba(215, 209, 202, 0.447)",
  },
  fontsize: {
    desktop: {
      title: "48px",
      section: "32px",
      content: "18px",
      medium: "16px",
      small: "14px",
      mini: "12px",
      main: {
        animationTitle: "80px",
        title: "40px",
        section: "28px",
      },
    },
    tablet: {
      title: "36px",
      section: "26px",
      content: "16px",
      medium: "15px",
      small: "14px",
      mini: "12px",
      main: {
        animationTitle: "56px",
        title: "26px",
        section: "18px",
      },
    },
    mobile: {
      title: "28px",
      section: "22px",
      content: "16px",
      medium: "15px",
      small: "14px",
      mini: "12px",
      main: {
        animationTitle: "32px",
        title: "16px",
        section: "12px",
      },
    },
  },
  // New
  fontweight: {
    qrweight: "700",
  },
  breakpoint: {
    mobile: 576,
    tablet: 768,
    desktop: 992,
  },
  media: {
    mobile: "@media (max-width: 767px)",
    tablet: "@media (min-width: 768px) and (max-width: 1024px)",
    desktop: "@media (min-width: 1025px)",
  },
};

export const animation = {
  duration: {
    mainTitle: 1000,
  },
  easing: {
    ease: "ease",
    easeInOut: "ease-in-out",
    none: "none",
  },
};
