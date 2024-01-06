import Header from '@/components/shared/nav/Header'
import Footer from '@/components/shared/footer/Footer'

export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <div className="flex h-screen flex-col">
    <Header />
    <main className="flex-1">{children}</main>
    <Footer />
  </div>
  )
}