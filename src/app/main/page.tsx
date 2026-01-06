import Link from "next/link";

export default function MainPage() {
    return (
      <main style={{ padding: 40 }}>
        <ul>
        <li><Link href="/">ไปหน้า Home</Link></li>
        <li><Link href="/form">ไปหน้า Form</Link></li>
        <li><Link href="/answer">ไปหน้า Answer</Link></li>
      </ul>
      </main>
    );
  }
  