import "./globals.css";
import { QuizProvider } from "./context/quizContext";
import { ThemeProvider } from "./components/theme-provider";

import { Roboto } from 'next/font/google'

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
})

export const metadata = {
  title: "Quiz20",
  description: "A Next.js quiz application powered by Quiz20",
};

export default function RootLayout({ children }) {
  return (

    <QuizProvider>

      <html lang="en" suppressHydrationWarning>
        <body className={roboto.className}>
          <main className="flex-grow">
            <ThemeProvider
              attribute="class"
              defaultTheme="light"
            >
              {children}
            </ThemeProvider>
          </main>
        </body>
      </html>

    </QuizProvider>

  );
}
