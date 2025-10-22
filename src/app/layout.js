import "./globals.css";
import "antd/dist/reset.css";
import { ConfigProvider } from "antd";

export const metadata = {
  title: "AbbyFashion",
  description: "Made by Abhirath",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <ConfigProvider
          theme={{
            token: {
              colorPrimary: "black",
              borderRadius: 10,
              fontSize: 16,
              
            },
          }}
        >
          {children}
        </ConfigProvider>
      </body>
    </html>
  );
}
