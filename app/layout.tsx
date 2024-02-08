import '@/app/ui/global.css';
import {inter} from "@/app/ui/fonts";
import {Metadata} from "next";

export const metadata:Metadata = {
  title: {
    template: '%s | Smoksy',
    default: 'Smoksy',
  },
  description: 'Świat smoksów.',
  metadataBase: new URL('https://solopreneur-desktop.vercel.app/')
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
