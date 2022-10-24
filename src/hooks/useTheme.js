import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

export const useTheme = () => {
  const context = useContext(ThemeContext);

  if (context == undefined) {
    throw new console.error("Context erişimi gerçekleşmedi");
  }
  return context;
};
