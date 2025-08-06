import Link from "next/link";
export default function Me() {
  return (
    <>
      <div>
        Me Page
        <Link href="/about" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300 ml-3">klik About Page</Link>

      </div>
    </>
  );
}
