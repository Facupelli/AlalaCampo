import { AuthProvider } from "../context/AuthProvider";
import "../styles/globals.css";
import "../styles/calendar.css";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default MyApp;
