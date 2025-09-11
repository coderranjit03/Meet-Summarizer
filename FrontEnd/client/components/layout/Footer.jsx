import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-10 grid gap-8 md:grid-cols-3">
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <span className="size-6 rounded bg-gradient-to-tr from-violet-500 via-fuchsia-500 to-sky-500" />
            <span className="font-bold">Meet Summarizer</span>
          </div>
          <p className="text-sm text-muted-foreground max-w-sm">
            Turn long meetings into clear, editable summaries in seconds.
          </p>
        </div>
        <div className="text-sm">
          <div className="font-semibold mb-3">Product</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#features" className="hover:text-foreground">Features</a></li>
            <li><a href="#how" className="hover:text-foreground">How it works</a></li>
            <li><Link to="/app" className="hover:text-foreground">Web App</Link></li>
          </ul>
        </div>
        <div className="text-sm">
          <div className="font-semibold mb-3">Resources</div>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="#" className="hover:text-foreground">Privacy</a></li>
            <li><a href="#" className="hover:text-foreground">Terms</a></li>
            <li><a href="#" className="hover:text-foreground">Support</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t py-6 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Meet Summarizer. All rights reserved.
      </div>
    </footer>
  );
}
