import { ThemeProvider } from "next-themes";
import "katex/dist/katex.min.css";
import "@assets/main.css";

export default function App({ Component, pageProps }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
