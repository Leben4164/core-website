import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: {
    template: "%s | Core"
  },
  description: "Developed by Leben",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <header style={{ padding: '10px', marginLeft: '40px', marginRight: '40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link href={'/'}>
              <img src="/favicon.ico" width={'40px'} height={'40px'} />
            </Link>
            <nav style={{ display: 'flex', color: 'white' }}>
              <Link className="link" href={'/recruit'}>지원하기</Link>
              <p>　</p>
              <Link className="link" href={'/check'}>결과확인</Link>
            </nav>
          </div>

        </header>
        {children}
      </body>
    </html>
  );
}
