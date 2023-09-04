export const MODE = {
  grey: {
    10: "f0f0f0",
    50: "#fafafa",
    100: "#EEEEEE",
    200: "#ffffff",
    300: "#75777c",
    400: "#474950",
    500: "#191c24",
    600: "#14161d",
    700: "#0f1116",
    800: "#0a0b0e",
    900: "#050607",
  },

  primary: {
    100: "#e2d9f3",
    200: "#c5b3e6",
    300: "#a98eda",
    400: "#8c68cd",
    500: "#6f42c1",
    600: "#59359a",
    700: "#432874",
    800: "#2c1a4d",
    900: "#160d27",
  },

  secondary: {
    100: "#cce5ff",
    200: "#99caff",
    300: "#66b0ff",
    400: "#3395ff",
    500: "#007bff",
    600: "#0062cc",
    700: "#004a99",
    800: "#003166",
    900: "#001933",
  },

  teal: {
    100: "#ccf5f5",
    200: "#99ebeb",
    300: "#66e0e0",
    400: "#33d6d6",
    500: "#00cccc",
    600: "#00a3a3",
    700: "#007a7a",
    800: "#005252",
    900: "#002929",
  },

  blue: {
    100: "#cff4fc",
    200: "#9eeaf9",
    300: "#6edff6",
    400: "#3dd5f3",
    500: "#0dcaf0",
    600: "#0aa2c0",
    700: "#087990",
    800: "#055160",
    900: "#032830",
  },

  green: {
    100: "#d1ecf1",
    200: "#a2dae3",
    300: "#74c7d4",
    400: "#45b5c6",
    500: "#17a2b8",
    600: "#128293",
    700: "#0e616e",
    800: "#09414a",
    900: "#052025",
  },
};

export const themeSetting = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            primary: {
              ...MODE.primary,
              light: MODE.primary[300],
              main: MODE.primary[500],
              dark: MODE.primary[800],
            },
            secondary: {
              ...MODE.secondary,
              light: MODE.secondary[300],
              main: MODE.secondary[500],
              dark: MODE.secondary[800],
            },
            accentColor: {
              teal: MODE.teal[500],
              blue: MODE.blue[500],
              green: MODE.green[500],
            },
            background: {
              default: MODE.grey[800],
              alt: MODE.grey[500],
            },
          }
        : {
            primary: {
              ...MODE.primary,
              light: MODE.primary[300],
              main: MODE.primary[500],
              dark: MODE.primary[800],
            },
            secondary: {
              ...MODE.secondary,
              light: MODE.secondary[300],
              main: MODE.secondary[500],
              dark: MODE.secondary[800],
            },
            accentColor: {
              teal: MODE.teal[500],
              blue: MODE.blue[500],
              green: MODE.green[500],
            },
            background: {
              default: MODE.grey[100],
              alt: MODE.grey[200],
            },
          }),
    },
  };
};
