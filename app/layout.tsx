import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Navigation } from '@/components/Navigation';
import { AppProvider } from '@/contexts/AppContext';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'プロフィール自動登録アプリ',
  description: '個人情報の管理と外部サービスとの連携を自動化',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AppProvider>
          <Navigation />
          <main className="min-h-screen bg-gray-50 py-8 px-4">
            {children}
          </main>
        </AppProvider>
      </body>
    </html>
  );
}