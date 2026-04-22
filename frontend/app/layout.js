import "./globals.css";

export const metadata = {
  title: "AI Chatbot Demo",
  description: "Starter demo app with simple auth and placeholder chat",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
