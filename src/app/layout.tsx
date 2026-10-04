import type { Metadata } from "next";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "교실 자리 배치",
  description: "자리뽑기",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
      {/* <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body> */}
    </html>
  );
}
