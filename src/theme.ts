import { createSystem, defaultConfig, defineTokens } from "@chakra-ui/react";

const tokens = defineTokens({
  fontSizes: {
    xs: { value: "10px" },
    sm: { value: "11px" },
    md: { value: "13px" },
    lg: { value: "16px" },
  },
});

export const feltTheme = createSystem(defaultConfig, {
  theme: { tokens },
});
