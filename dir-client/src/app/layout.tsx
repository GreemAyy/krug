import type { Metadata } from 'next'
import { Montserrat_Alternates as FontSans } from 'next/font/google'
import index from '@/styles/index.module.scss'
import '@/styles/global.scss'

const font = FontSans({
  subsets:['cyrillic','latin'],
  variable:'--font-sans',
  weight:['300','400','500','600','700','800','900']
})

export const metadata: Metadata = {
  title: 'Круг. Доставка еды',
  description: 'Круг. Доставка еды',
  icons:'https://www.emojiall.com/en/svg-to-png/twitter/1920/1f7e0.png'
}

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html style={{scrollBehavior:'smooth'}} lang="en" suppressHydrationWarning>
      <body className={`${font.className} ${index['to-default']}`}>
        {children}
      </body>
    </html>
  )
}
