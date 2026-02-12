import "./globals.css";

export const metadata = {
  title: "Robot Dashboard",
  description: "Control system",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
