import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t bg-white py-8 mt-12">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-red-600">有福</span>
            <span className="text-sm text-muted-foreground">Yoofoo</span>
          </div>
          <p className="text-xs text-muted-foreground">
            向世界讲好中国故事 · Discover the best of Chinese entertainment
          </p>
          <div className="flex gap-4 text-xs text-muted-foreground">
            <Link href="/" className="hover:text-red-600 transition-colors">Home</Link>
            <Link href="/tv" className="hover:text-red-600 transition-colors">TV Drama</Link>
            <Link href="/movie" className="hover:text-red-600 transition-colors">Movies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
