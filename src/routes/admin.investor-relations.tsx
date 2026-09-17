import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo, type FormEvent, type ChangeEvent } from "react";
import { Logo } from "@/components/site/SiteHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  FileText, Upload, Download, Trash2, Search, LogOut,
  ExternalLink, CheckCircle2, ShieldCheck, Filter, RefreshCw,
  FileSpreadsheet, FileCode, AlertCircle, FilePlus
} from "lucide-react";
import { isAuthenticated, logout, getAdminUser } from "@/lib/admin-auth";
import {
  getStoredDocuments,
  addDocument,
  deleteDocument,
  resetToDefaults,
  subscribeDocuments,
  downloadDocument,
  formatFileSize,
  CATEGORY_LABELS,
  type IRDocument,
  type DocumentCategory,
} from "@/lib/ir-documents";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/investor-relations")({
  head: () => ({
    meta: [
      { title: "IR Document Management Portal — Tattva Fincorp" },
      { name: "description", content: "Upload and manage investor relations documents, reports, and policies." },
    ],
  }),
  component: AdminInvestorRelations,
});

function AdminInvestorRelations() {
  const navigate = useNavigate();
  const [documents, setDocuments] = useState<IRDocument[]>([]);
  const [authChecked, setAuthChecked] = useState(false);

  // Form states
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<DocumentCategory>("reports");
  const [financialYear, setFinancialYear] = useState("FY 2025-26");
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  // Filter & Search states
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");

  // Check auth
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate({ to: "/admin/login" });
    } else {
      setAuthChecked(true);
      setDocuments(getStoredDocuments());
    }
  }, [navigate]);

  // Subscribe to storage changes
  useEffect(() => {
    const unsub = subscribeDocuments(() => {
      setDocuments(getStoredDocuments());
    });
    return unsub;
  }, []);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const selected = e.target.files?.[0];
    if (selected) {
      setFile(selected);
      // Auto fill title if empty
      if (!title) {
        const cleanName = selected.name.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " ");
        setTitle(cleanName);
      }
    }
  }

  async function handleAddDocument(e: FormEvent) {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Please enter a document title.");
      return;
    }

    setUploading(true);

    try {
      let fileData: string | undefined = undefined;
      let calculatedSize = "1.0 MB";
      let fileName = file?.name || `${title.trim().replace(/\s+/g, "-")}.pdf`;

      if (file) {
        calculatedSize = formatFileSize(file.size);
        fileData = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result as string);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      } else if (fileUrl.trim()) {
        calculatedSize = "External Link";
        fileName = fileUrl.trim().split("/").pop() || "document.pdf";
      }

      addDocument({
        title: title.trim(),
        category,
        size: calculatedSize,
        date: new Date().toISOString().split("T")[0],
        financialYear: financialYear.trim() || undefined,
        fileName,
        fileData,
        fileUrl: fileUrl.trim() || undefined,
      });

      toast.success(`"${title}" added successfully! It is now live on the Investor Relations page.`);

      // Reset form
      setTitle("");
      setFile(null);
      setFileUrl("");
      const fileInput = document.getElementById("ir-file-input") as HTMLInputElement;
      if (fileInput) fileInput.value = "";
    } catch (err) {
      toast.error("Failed to process document upload. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function handleDelete(doc: IRDocument) {
    if (window.confirm(`Are you sure you want to remove "${doc.title}"?`)) {
      deleteDocument(doc.id);
      toast.info(`"${doc.title}" has been removed.`);
    }
  }

  function handleLogout() {
    logout();
    toast.success("Logged out successfully.");
    navigate({ to: "/admin/login" });
  }

  function handleReset() {
    if (window.confirm("Reset all documents to the original factory default sample set?")) {
      resetToDefaults();
      toast.success("Reset to default sample documents.");
    }
  }

  const filteredDocuments = useMemo(() => {
    return documents.filter((doc) => {
      const matchCat = selectedCategory === "all" || doc.category === selectedCategory;
      const q = searchTerm.trim().toLowerCase();
      const matchSearch =
        !q ||
        doc.title.toLowerCase().includes(q) ||
        (doc.financialYear && doc.financialYear.toLowerCase().includes(q)) ||
        (doc.fileName && doc.fileName.toLowerCase().includes(q));
      return matchCat && matchSearch;
    });
  }, [documents, searchTerm, selectedCategory]);

  const stats = useMemo(() => {
    return {
      total: documents.length,
      reports: documents.filter((d) => d.category === "reports").length,
      policies: documents.filter((d) => d.category === "policies").length,
      ncd: documents.filter((d) => d.category === "ncd").length,
    };
  }, [documents]);

  if (!authChecked) {
    return (
      <div className="min-h-screen bg-navy-deep flex items-center justify-center text-white">
        <RefreshCw className="h-6 w-6 animate-spin text-gold" />
      </div>
    );
  }

  const user = getAdminUser();

  return (
    <div className="min-h-screen bg-surface flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-navy-deep text-white border-b border-white/10 sticky top-0 z-40">
        <div className="container-x flex h-16 items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link to="/" className="shrink-0">
              <Logo className="h-10 w-10" />
            </Link>
            <div className="hidden sm:block h-6 w-px bg-white/20" />
            <div>
              <div className="font-display font-bold text-sm md:text-base flex items-center gap-2">
                <span>Investor Relations Portal</span>
                <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-gold text-navy-deep">
                  Admin
                </span>
              </div>
              <div className="text-xs text-white/60">Manage Disclosures & Public Downloads</div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/investor-relations"
              target="_blank"
              className="hidden md:inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition"
            >
              <span>View Live Page</span>
              <ExternalLink className="h-3.5 w-3.5" />
            </Link>

            <div className="hidden lg:flex items-center gap-2 text-xs text-white/70">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>{user?.username || "Admin"}</span>
            </div>

            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="rounded-full h-8 text-xs border-white/20 bg-white/5 text-white hover:bg-white/10"
            >
              <LogOut className="h-3.5 w-3.5 mr-1.5" />
              <span>Sign Out</span>
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 py-8 md:py-12">
        <div className="container-x space-y-8">
          {/* Quick Metrics */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Total Documents</div>
              <div className="mt-2 text-3xl font-display font-extrabold text-foreground">{stats.total}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Across all categories</div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Financial Reports</div>
              <div className="mt-2 text-3xl font-display font-extrabold text-primary">{stats.reports}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Annual reports & presentations</div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Governance Policies</div>
              <div className="mt-2 text-3xl font-display font-extrabold text-gold">{stats.policies}</div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Compliance & codes</div>
            </div>
            <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">
              <div className="text-xs font-semibold uppercase text-muted-foreground tracking-wider">Live Status</div>
              <div className="mt-2 text-xl font-display font-bold text-emerald-600 flex items-center gap-1.5">
                <CheckCircle2 className="h-5 w-5" />
                <span>Synchronized</span>
              </div>
              <div className="text-[11px] text-muted-foreground mt-0.5">Public page auto-updates</div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Left Column: Upload New Document Form */}
            <div className="lg:col-span-1">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft sticky top-24">
                <div className="flex items-center gap-2 pb-4 border-b border-border">
                  <div className="h-9 w-9 rounded-xl bg-primary/10 text-primary grid place-items-center">
                    <FilePlus className="h-5 w-5" />
                  </div>
                  <div>
                    <h2 className="font-display font-bold text-base text-foreground">Add New Document</h2>
                    <p className="text-xs text-muted-foreground">Upload or link an official document</p>
                  </div>
                </div>

                <form onSubmit={handleAddDocument} className="mt-5 space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Document Title *
                    </label>
                    <Input
                      type="text"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Q3 FY26 Financial Statement"
                      required
                      className="rounded-xl h-10 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Category *
                    </label>
                    <select
                      value={category}
                      onChange={(e) => setCategory(e.target.value as DocumentCategory)}
                      className="w-full h-10 rounded-xl border border-input bg-background px-3 text-sm"
                    >
                      <option value="reports">Annual Reports & Financials</option>
                      <option value="policies">Corporate Governance & Policies</option>
                      <option value="ncd">NCD Disclosures</option>
                      <option value="shareholder">Shareholder Information</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Financial Year / Period (Optional)
                    </label>
                    <Input
                      type="text"
                      value={financialYear}
                      onChange={(e) => setFinancialYear(e.target.value)}
                      placeholder="e.g. FY 2025-26"
                      className="rounded-xl h-10 text-sm"
                    />
                  </div>

                  {/* File Upload Box */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Upload File (.pdf, .xlsx, .docx, .csv)
                    </label>
                    <div className="relative border-2 border-dashed border-border hover:border-primary/50 rounded-2xl p-4 text-center transition cursor-pointer bg-muted/40">
                      <input
                        id="ir-file-input"
                        type="file"
                        accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt"
                        onChange={handleFileChange}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <Upload className="h-6 w-6 text-primary mx-auto mb-1.5" />
                      {file ? (
                        <div>
                          <div className="font-semibold text-xs text-foreground truncate">{file.name}</div>
                          <div className="text-[11px] text-primary mt-0.5">{formatFileSize(file.size)}</div>
                        </div>
                      ) : (
                        <div>
                          <div className="text-xs font-medium text-foreground">Click or drag file here</div>
                          <div className="text-[11px] text-muted-foreground mt-0.5">PDF or Office docs up to 25MB</div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* External URL Alternative */}
                  <div>
                    <label className="block text-xs font-semibold text-foreground mb-1.5">
                      Or External Document URL (Optional)
                    </label>
                    <Input
                      type="url"
                      value={fileUrl}
                      onChange={(e) => setFileUrl(e.target.value)}
                      placeholder="https://example.com/reports/document.pdf"
                      className="rounded-xl h-10 text-sm"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={uploading}
                    className="w-full h-11 rounded-xl bg-gradient-brand text-white font-semibold shadow-soft mt-3"
                  >
                    {uploading ? (
                      <span className="flex items-center gap-2">
                        <RefreshCw className="h-4 w-4 animate-spin" />
                        Uploading Document...
                      </span>
                    ) : (
                      <span className="flex items-center gap-2">
                        <Upload className="h-4 w-4" />
                        Publish to Public Page
                      </span>
                    )}
                  </Button>
                </form>
              </div>
            </div>

            {/* Right Column: Manage Existing Documents Table */}
            <div className="lg:col-span-2 space-y-4">
              <div className="rounded-3xl border border-border bg-card p-6 shadow-soft">
                {/* Search and Filters Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-border">
                  <div>
                    <h2 className="font-display font-bold text-lg text-foreground">All Investor Documents</h2>
                    <p className="text-xs text-muted-foreground">
                      Showing {filteredDocuments.length} of {documents.length} published documents
                    </p>
                  </div>

                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleReset}
                      className="text-xs text-muted-foreground hover:text-foreground h-8"
                      title="Reset to default sample documents"
                    >
                      <RefreshCw className="h-3.5 w-3.5 mr-1" />
                      Reset Defaults
                    </Button>
                  </div>
                </div>

                {/* Filter Controls */}
                <div className="mt-4 flex flex-col sm:flex-row items-center gap-3">
                  <div className="relative flex-1 w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="text"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      placeholder="Filter by title, year, or filename..."
                      className="pl-9 h-10 rounded-xl text-xs bg-muted/30"
                    />
                  </div>

                  <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 scrollbar-none">
                    <button
                      type="button"
                      onClick={() => setSelectedCategory("all")}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition ${
                        selectedCategory === "all"
                          ? "bg-primary text-white shadow-sm"
                          : "bg-muted text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      All
                    </button>
                    {(Object.keys(CATEGORY_LABELS) as DocumentCategory[]).map((cat) => (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition ${
                          selectedCategory === cat
                            ? "bg-primary text-white shadow-sm font-semibold"
                            : "bg-muted text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        {cat === "reports" ? "Reports" : cat === "policies" ? "Policies" : cat === "ncd" ? "NCD" : "Shareholder"}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Document List */}
                <div className="mt-5 space-y-2.5">
                  {filteredDocuments.length === 0 ? (
                    <div className="py-12 text-center text-muted-foreground">
                      <AlertCircle className="h-10 w-10 mx-auto text-muted-foreground/50 mb-2" />
                      <div className="text-sm font-semibold">No documents found</div>
                      <div className="text-xs text-muted-foreground mt-1">
                        Try adjusting your search filter or upload a document using the form on the left.
                      </div>
                    </div>
                  ) : (
                    filteredDocuments.map((doc) => (
                      <div
                        key={doc.id}
                        className="rounded-2xl border border-border p-4 bg-card/60 hover:bg-card transition flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover-lift"
                      >
                        <div className="flex items-start gap-3 min-w-0">
                          <div className="h-10 w-10 rounded-xl bg-primary/10 text-primary grid place-items-center shrink-0 mt-0.5">
                            <FileText className="h-5 w-5" />
                          </div>
                          <div className="min-w-0">
                            <div className="font-semibold text-sm text-foreground truncate">
                              {doc.title}
                            </div>
                            <div className="flex flex-wrap items-center gap-2 mt-1 text-xs text-muted-foreground">
                              <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-semibold text-[10px]">
                                {CATEGORY_LABELS[doc.category]}
                              </span>
                              {doc.financialYear && (
                                <span className="font-medium text-foreground/80">
                                  {doc.financialYear}
                                </span>
                              )}
                              <span>•</span>
                              <span>{doc.size}</span>
                              <span>•</span>
                              <span>Added {doc.date}</span>
                            </div>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => downloadDocument(doc)}
                            className="h-8 rounded-xl text-xs gap-1.5 hover:bg-primary hover:text-white"
                            title="Download / Preview file"
                          >
                            <Download className="h-3.5 w-3.5" />
                            <span>Download</span>
                          </Button>

                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(doc)}
                            className="h-8 w-8 p-0 rounded-xl text-destructive hover:bg-destructive/10"
                            title="Delete document"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
