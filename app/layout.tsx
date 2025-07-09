import './globals.css';
import type { Metadata } from 'next';
import { Providers } from '@/components/providers';


export const metadata: Metadata = {
  title: 'NYSC Portal - National Youth Service Corps',
  description: 'Official NYSC Portal for Corps Members',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}