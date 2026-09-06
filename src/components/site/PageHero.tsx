import { Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";

type Crumb = { label: string; to?: string };

export function PageHero({
  eyebrow,
  title,
  subtitle,
  crumbs = [],
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  crumbs?: Crumb[];
}) {
  return (
    <section className="relative overflow-hidden bg-gradient-hero text-white">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-gold/20 blur-3xl" />
      <div className="absolute -bottom-32 -right-20 h-96 w-96 rounded-full bg-primary/40 blur-3xl" />
      <div className="relative container-x pt-16 md:pt-24 pb-16 md:pb-20">
        {crumbs.length > 0 && (
          <nav className="flex items-center gap-1.5 text-xs text-white/70 mb-6">
            <Link to="/" className="hover:text-gold">Home</Link>
            {crumbs.map((c, i) => (
              <span key={i} className="flex items-center gap-1.5">
                <ChevronRight className="h-3 w-3" />
                {c.to ? <Link to={c.to} className="hover:text-gold">{c.label}</Link> : <span className="text-white">{c.label}</span>}
              </span>
            ))}
          </nav>
        )}
        {eyebrow && (
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-white/90 mb-5">
            <span className="h-1.5 w-1.5 rounded-full bg-gold" /> {eyebrow}
          </div>
        )}
        <h1 className="text-4xl md:text-6xl font-display font-extrabold tracking-tight max-w-3xl">{title}</h1>
        {subtitle && <p className="mt-5 text-lg text-white/80 max-w-2xl leading-relaxed">{subtitle}</p>}
      </div>
    </section>
  );
}
