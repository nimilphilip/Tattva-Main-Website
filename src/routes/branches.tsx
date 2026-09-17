import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState, type FormEvent } from "react";
import { PageHero } from "@/components/site/PageHero";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Clock, Navigation, LocateFixed, ExternalLink } from "lucide-react";
import { BRANCHES, BRANCH_COORDINATES, CONTACT, distanceInKm, type Branch } from "@/lib/branches";

type NearestBranch = { branch: Branch; distance: number; pinLocation: { lat: number; lon: number } };

function BranchCard({
  branch,
  isSelected,
  onSelect,
}: {
  branch: Branch;
  isSelected: boolean;
  onSelect: () => void;
}) {
  return (
    <div
      onClick={onSelect}
      className={`rounded-2xl border p-5 transition-all cursor-pointer hover-lift ${
        isSelected
          ? "border-primary bg-primary/5 ring-2 ring-primary/20 shadow-md"
          : "border-border bg-card hover:border-primary/40"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <div className="font-display font-bold text-foreground">
              {branch.city}{branch.label ? ` — ${branch.label}` : ""}
            </div>
            {isSelected && (
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-primary text-white shrink-0">
                Active on Map
              </span>
            )}
          </div>
          <div className="text-sm text-muted-foreground mt-1 flex items-start gap-1.5">
            <MapPin className="h-4 w-4 text-primary mt-0.5 shrink-0" />
            <span>{branch.addr}</span>
          </div>
          <div className="mt-2 text-xs text-muted-foreground space-y-1">
            <div className="flex items-center gap-1.5">
              <Phone className="h-3 w-3 text-primary/70" />
              <span>{branch.label === "Registered Office" ? CONTACT.registeredPhone : CONTACT.corporatePhone}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="h-3 w-3 text-primary/70" />
              <span>{branch.hours}</span>
            </div>
          </div>
        </div>
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Tattva Fincorp ${branch.addr}`)}`}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="shrink-0 h-9 w-9 rounded-full bg-primary/10 text-primary grid place-items-center hover:bg-primary hover:text-white transition"
          aria-label="Directions"
          title="Open in Google Maps"
        >
          <Navigation className="h-4 w-4" />
        </a>
      </div>
    </div>
  );
}

export const Route = createFileRoute("/branches")({
  head: () => ({
    meta: [
      { title: "Branch Locator — Tattva Fincorp" },
      { name: "description", content: "Find your nearest Tattva Fincorp branch across 11 locations in Kerala and Tamil Nadu." },
      { property: "og:title", content: "Branch Locator — Tattva Fincorp" },
      { property: "og:description", content: "11 branches across Kerala and Tamil Nadu." },
      { property: "og:url", content: "/branches" },
    ],
    links: [{ rel: "canonical", href: "/branches" }],
  }),
  component: Branches,
});

function Branches() {
  const [search, setSearch] = useState("");
  const [state, setState] = useState("All states");
  const [nearest, setNearest] = useState<NearestBranch | null>(null);
  const [lookupStatus, setLookupStatus] = useState<"idle" | "loading" | "error">("idle");
  const [selectedBranch, setSelectedBranch] = useState<Branch>(BRANCHES[0]);

  const displayedBranches = useMemo(() => {
    const query = search.trim().toLowerCase();
    const isPinCode = /^\d{6}$/.test(query);
    const filtered = BRANCHES.filter((branch) => {
      const matchesState = state === "All states" || branch.state === state;
      const matchesSearch = !query || isPinCode || branch.city.toLowerCase().includes(query) || branch.addr.toLowerCase().includes(query);
      return matchesState && matchesSearch;
    });

    if (!nearest) return filtered;

    return [...filtered].sort(
      (first, second) =>
        distanceInKm(nearest.pinLocation, BRANCH_COORDINATES[first.city]) -
        distanceInKm(nearest.pinLocation, BRANCH_COORDINATES[second.city]),
    );
  }, [nearest, search, state]);

  async function findBranches(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const pinCode = search.trim();

    if (!/^\d{6}$/.test(pinCode)) {
      setNearest(null);
      setLookupStatus("idle");
      return;
    }

    setLookupStatus("loading");
    setNearest(null);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?postalcode=${encodeURIComponent(pinCode)}&country=India&format=jsonv2&limit=1`,
      );
      const locations: Array<{ lat: string; lon: string }> = await response.json();
      const location = locations[0];

      if (!response.ok || !location) throw new Error("PIN code not found");

      const pinLocation = { lat: Number(location.lat), lon: Number(location.lon) };
      const closestBranch = BRANCHES.map((branch) => ({
        branch,
        pinLocation,
        distance: distanceInKm(pinLocation, BRANCH_COORDINATES[branch.city]),
      })).sort((first, second) => first.distance - second.distance)[0];

      setNearest(closestBranch);
      setSelectedBranch(closestBranch.branch);
      setLookupStatus("idle");
    } catch {
      setLookupStatus("error");
    }
  }

  const selectedCoords = BRANCH_COORDINATES[selectedBranch.city] ?? { lat: 9.9997, lon: 76.3205 };

  return (
    <div>
      <PageHero eyebrow="Branch Locator" title="11 branches. Kerala and Tamil Nadu." subtitle="Search by city or PIN code, or walk into the branch closest to you." crumbs={[{ label: "Branches" }]} />

      <section className="py-16 md:py-24">
        <div className="container-x grid lg:grid-cols-5 gap-6">
          <div className="lg:col-span-2 space-y-4">
            <form onSubmit={findBranches} className="rounded-3xl border border-border bg-card p-6 space-y-3">
              <div className="text-sm font-semibold text-muted-foreground">Search branches</div>
              <Input value={search} onChange={(event) => setSearch(event.target.value)} inputMode="numeric" maxLength={6} placeholder="Enter city or 6-digit PIN code" className="h-12 rounded-xl" />
              <select value={state} onChange={(event) => setState(event.target.value)} className="w-full h-12 rounded-xl border border-input bg-background px-3 text-sm">
                <option>All states</option>
                <option>Kerala</option>
                <option>Tamil Nadu</option>
              </select>
              <Button type="submit" disabled={lookupStatus === "loading"} className="w-full h-12 rounded-xl bg-gradient-brand text-white">
                <LocateFixed className="mr-2 h-4 w-4" /> {lookupStatus === "loading" ? "Finding nearest branch..." : "Find branches"}
              </Button>
              {lookupStatus === "error" && <p className="text-sm text-destructive">We could not locate this PIN code. Please check the number and try again.</p>}
            </form>

            {nearest && (
              <div className="rounded-2xl border border-gold/40 bg-gold/10 p-5">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">Nearest branch</div>
                <div className="mt-1 font-display text-xl font-bold text-foreground">{nearest.branch.city}</div>
                <p className="mt-1 text-sm text-muted-foreground">Approximately {nearest.distance.toFixed(1)} km from PIN code {search.trim()}.</p>
                <button
                  type="button"
                  onClick={() => setSelectedBranch(nearest.branch)}
                  className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
                >
                  View on map <Navigation className="h-4 w-4" />
                </button>
              </div>
            )}

            <div className="space-y-3">
              {displayedBranches.map((branch) => (
                <BranchCard
                  key={branch.city}
                  branch={branch}
                  isSelected={selectedBranch.city === branch.city}
                  onSelect={() => setSelectedBranch(branch)}
                />
              ))}
              {displayedBranches.length === 0 && <p className="rounded-2xl border border-border p-5 text-sm text-muted-foreground">No branches match your search. Try another city or PIN code.</p>}
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="sticky top-28 rounded-3xl border border-border bg-card shadow-soft overflow-hidden flex flex-col h-[620px]">
              {/* Header Bar */}
              <div className="p-4 bg-navy-deep text-white flex items-center justify-between gap-3 border-b border-white/10 shrink-0">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div className="h-9 w-9 rounded-xl bg-gold/20 text-gold grid place-items-center shrink-0">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div className="min-w-0">
                    <div className="font-display font-bold text-sm md:text-base text-white truncate">
                      {selectedBranch.city} {selectedBranch.label ? `— ${selectedBranch.label}` : "Branch"}
                    </div>
                    <div className="text-xs text-white/70 truncate">{selectedBranch.state} · Google Map Preview</div>
                  </div>
                </div>

                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`Tattva Fincorp ${selectedBranch.addr}`)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gold text-navy-deep text-xs font-semibold hover:opacity-90 transition shadow-sm shrink-0"
                >
                  <span>Open in Maps</span>
                  <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>

              {/* Branch quick selector pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto px-4 py-2 bg-muted/60 border-b border-border text-xs scrollbar-none shrink-0">
                <span className="text-[11px] font-semibold text-muted-foreground mr-1 whitespace-nowrap">Branches:</span>
                {BRANCHES.map((b) => (
                  <button
                    key={b.city}
                    type="button"
                    onClick={() => setSelectedBranch(b)}
                    className={`px-2.5 py-1 rounded-full whitespace-nowrap transition text-xs font-medium ${
                      selectedBranch.city === b.city
                        ? "bg-primary text-white shadow-sm font-semibold"
                        : "bg-background text-muted-foreground hover:text-foreground border border-border"
                    }`}
                  >
                    {b.city}
                  </button>
                ))}
              </div>

              {/* Google Map embed iframe */}
              <div className="relative flex-1 w-full bg-muted overflow-hidden">
                <iframe
                  key={selectedBranch.city}
                  title={`Google Map preview for Tattva Fincorp ${selectedBranch.city} branch`}
                  src={`https://maps.google.com/maps?q=${selectedCoords.lat},${selectedCoords.lon}+(${encodeURIComponent(`Tattva Fincorp ${selectedBranch.city}`)})&t=&z=15&ie=UTF8&iwloc=B&output=embed`}
                  className="w-full h-full border-0"
                  loading="lazy"
                  allowFullScreen
                />

                {/* Floating branch details card */}
                <div className="absolute bottom-4 left-4 right-4 pointer-events-none">
                  <div className="pointer-events-auto bg-card/95 backdrop-blur-md border border-border/80 shadow-elevated rounded-2xl p-4 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="font-semibold text-sm text-foreground flex items-center gap-1.5">
                          <MapPin className="h-4 w-4 text-primary shrink-0" />
                          <span className="truncate">{selectedBranch.city} — {selectedBranch.label || "Branch"}</span>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{selectedBranch.addr}</p>
                        <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Phone className="h-3 w-3 text-primary" />
                            {selectedBranch.label === "Registered Office" ? CONTACT.registeredPhone : CONTACT.corporatePhone}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3 text-primary" />
                            {selectedBranch.hours}
                          </span>
                        </div>
                      </div>

                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${selectedCoords.lat},${selectedCoords.lon}`}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-gradient-brand text-white px-4 py-2.5 text-xs font-semibold hover:opacity-95 transition shrink-0 shadow-soft"
                      >
                        <Navigation className="h-3.5 w-3.5" />
                        <span>Get Directions</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
