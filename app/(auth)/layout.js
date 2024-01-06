export const metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
  }
  
  export default function RootLayout({ children }) {
    return (
      <div className="flex-center min-h-screen w-full bg-primary-50 bg-dotted-pattern bg-cover bg-fixed bg-center">
        {children}
      </div>
    );
  }