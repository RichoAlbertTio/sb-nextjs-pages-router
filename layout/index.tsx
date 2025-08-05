export default function RootLayout({ children, title }: { children: React.ReactNode, title?: string }) {
  return (
    <div>
        <div>Header {title}</div>
        <div>{children}</div>
        <div>Footer</div>
    </div>
  );
}