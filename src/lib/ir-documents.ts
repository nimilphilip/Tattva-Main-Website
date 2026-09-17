// Investor Relations Documents Store & Persistence

export type DocumentCategory = "reports" | "policies" | "ncd" | "shareholder";

export type IRDocument = {
  id: string;
  title: string;
  category: DocumentCategory;
  size: string;
  date: string;
  financialYear?: string;
  fileData?: string; // Data URL / Base64 for instant local download
  fileUrl?: string; // External document URL
  fileName?: string;
  fileType?: string;
  createdAt: number;
};

const STORAGE_KEY = "tattva_ir_documents_v1";

export const CATEGORY_LABELS: Record<DocumentCategory, string> = {
  reports: "Annual Reports & Financials",
  policies: "Corporate Governance & Policies",
  ncd: "NCD Disclosures",
  shareholder: "Shareholder Information",
};

const DEFAULT_DOCUMENTS: IRDocument[] = [
  {
    id: "rep-1",
    title: "Annual Report FY 2025-26",
    category: "reports",
    size: "3.2 MB",
    date: "2026-06-15",
    financialYear: "FY 2025-26",
    fileName: "Annual-Report-FY2025-26.pdf",
    createdAt: 1781500000000,
  },
  {
    id: "rep-2",
    title: "Annual Report FY 2024-25",
    category: "reports",
    size: "2.8 MB",
    date: "2025-06-20",
    financialYear: "FY 2024-25",
    fileName: "Annual-Report-FY2024-25.pdf",
    createdAt: 1750000000000,
  },
  {
    id: "rep-3",
    title: "Q2 FY26 Investor Presentation",
    category: "reports",
    size: "4.1 MB",
    date: "2025-11-10",
    financialYear: "FY 2025-26",
    fileName: "Q2-FY26-Investor-Presentation.pdf",
    createdAt: 1762800000000,
  },
  {
    id: "rep-4",
    title: "Q1 FY26 Earnings Release",
    category: "reports",
    size: "1.2 MB",
    date: "2025-08-14",
    financialYear: "FY 2025-26",
    fileName: "Q1-FY26-Earnings-Release.pdf",
    createdAt: 1755200000000,
  },
  {
    id: "pol-1",
    title: "Fair Practices Code",
    category: "policies",
    size: "820 KB",
    date: "2025-04-01",
    fileName: "Fair-Practices-Code.pdf",
    createdAt: 1743500000000,
  },
  {
    id: "pol-2",
    title: "Code of Conduct",
    category: "policies",
    size: "640 KB",
    date: "2025-04-01",
    fileName: "Code-of-Conduct.pdf",
    createdAt: 1743500000000,
  },
  {
    id: "pol-3",
    title: "Whistleblower Policy",
    category: "policies",
    size: "510 KB",
    date: "2025-04-01",
    fileName: "Whistleblower-Policy.pdf",
    createdAt: 1743500000000,
  },
  {
    id: "pol-4",
    title: "Related Party Transactions Policy",
    category: "policies",
    size: "730 KB",
    date: "2025-04-01",
    fileName: "Related-Party-Transactions-Policy.pdf",
    createdAt: 1743500000000,
  },
  {
    id: "pol-5",
    title: "Grievance Redressal Policy",
    category: "policies",
    size: "480 KB",
    date: "2025-04-01",
    fileName: "Grievance-Redressal-Policy.pdf",
    createdAt: 1743500000000,
  },
  {
    id: "pol-6",
    title: "KYC & AML Policy",
    category: "policies",
    size: "950 KB",
    date: "2025-04-01",
    fileName: "KYC-AML-Policy.pdf",
    createdAt: 1743500000000,
  },
  {
    id: "pol-7",
    title: "Interest Rate Policy",
    category: "policies",
    size: "520 KB",
    date: "2025-04-01",
    fileName: "Interest-Rate-Policy.pdf",
    createdAt: 1743500000000,
  },
];

export function getStoredDocuments(): IRDocument[] {
  if (typeof window === "undefined") return DEFAULT_DOCUMENTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_DOCUMENTS));
      return DEFAULT_DOCUMENTS;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : DEFAULT_DOCUMENTS;
  } catch {
    return DEFAULT_DOCUMENTS;
  }
}

export function saveDocuments(docs: IRDocument[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
    window.dispatchEvent(new Event("tattva-ir-docs-change"));
  } catch (err) {
    console.error("Failed to save documents to storage:", err);
  }
}

export function addDocument(doc: Omit<IRDocument, "id" | "createdAt">): IRDocument {
  const current = getStoredDocuments();
  const newDoc: IRDocument = {
    ...doc,
    id: `doc-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    createdAt: Date.now(),
  };
  const updated = [newDoc, ...current];
  saveDocuments(updated);
  return newDoc;
}

export function deleteDocument(id: string): void {
  const current = getStoredDocuments();
  const updated = current.filter((d) => d.id !== id);
  saveDocuments(updated);
}

export function resetToDefaults(): void {
  saveDocuments(DEFAULT_DOCUMENTS);
}

export function subscribeDocuments(callback: () => void): () => void {
  if (typeof window === "undefined") return () => {};
  const handler = () => callback();
  window.addEventListener("tattva-ir-docs-change", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("tattva-ir-docs-change", handler);
    window.removeEventListener("storage", handler);
  };
}

export function downloadDocument(doc: IRDocument): void {
  if (typeof window === "undefined") return;

  // 1. If real uploaded fileData (Data URL) exists, trigger download
  if (doc.fileData) {
    const a = document.createElement("a");
    a.href = doc.fileData;
    a.download = doc.fileName || `${doc.title.replace(/\s+/g, "-")}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    return;
  }

  // 2. If external fileUrl exists, open or download
  if (doc.fileUrl) {
    window.open(doc.fileUrl, "_blank");
    return;
  }

  // 3. Fallback for sample/demo documents: generate a formatted preview PDF/Text blob
  const sampleContent = `Tattva Fincorp Limited\nInvestor Relations Document\n\nTitle: ${doc.title}\nCategory: ${CATEGORY_LABELS[doc.category]}\nFinancial Year / Date: ${doc.financialYear || doc.date}\nDocument Size: ${doc.size}\n\nThis is an authentic demonstration document preview from Tattva Fincorp Limited Investor Relations.\nFor physical copies or registrar inquiries, contact investors@tattvafincorp.com.`;

  const blob = new Blob([sampleContent], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = doc.fileName ? doc.fileName.replace(/\.pdf$/, ".txt") : `${doc.title.replace(/\s+/g, "-")}.txt`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}

export function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
