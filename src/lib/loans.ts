import {
  Bike,
  Coins,
  Wallet,
  Briefcase,
  Building2,
  Home,
  Landmark,
  Car,
  type LucideIcon,
} from "lucide-react";

export type Loan = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  icon: LucideIcon;
  color: string;
  keyFacts: { label: string; value: string }[];
  features: string[];
  benefits: string[];
  eligibility: string[];
  documents: string[];
  faqs: { q: string; a: string }[];
};

export const LOANS: Loan[] = [
  {
    slug: "two-wheeler-loan",
    name: "Two Wheeler Loan",
    short: "Two wheels, endless possibilities.",
    tagline: "Kickstart your journey with up to 90% finance and a simple down-payment scheme.",
    icon: Bike,
    color: "from-blue-500 to-indigo-600",
    keyFacts: [
      { label: "Finance", value: "Up to 90%" },
      { label: "Age", value: "21 – 65 years" },
      { label: "Documentation", value: "Minimal" },
      { label: "Tenure", value: "Flexible" },
    ],
    features: [
      "Up to 90% finance on your two-wheeler",
      "Simple down-payment scheme",
      "Minimal documentation",
      "Quick eligibility check and disbursal",
      "Flexible repayment tenure",
    ],
    benefits: [
      "No hidden charges",
      "Travel easily around town on your own ride",
      "Open to salaried and self-employed applicants",
      "Fast, straightforward processing",
    ],
    eligibility: ["Age 21 – 65 years", "Salaried or self-employed", "Indian resident with valid KYC"],
    documents: ["PAN & Aadhaar", "Address proof", "Bank statement", "Income proof"],
    faqs: [
      { q: "How much can be financed?", a: "Eligible customers can avail up to 90% finance with a simple down-payment scheme." },
      { q: "How long does approval take?", a: "We run a quick eligibility check and aim for fast disbursal with minimal documentation." },
    ],
  },
  {
    slug: "pre-owned-car-loan",
    name: "Pre-Owned Car Loan",
    short: "Economy meets elegance — drive home the best deals.",
    tagline: "Flexible schemes and quick processing to own the car of your choice.",
    icon: Car,
    color: "from-rose-500 to-pink-600",
    keyFacts: [
      { label: "Age", value: "21 – 65 years" },
      { label: "Documentation", value: "Minimal" },
      { label: "Schemes", value: "Model-specific" },
      { label: "Tenure", value: "Flexible" },
    ],
    features: [
      "Minimal documentation",
      "Special finance schemes by vehicle model",
      "Competitive rates",
      "Flexible tenure options",
      "Quick, hassle-free processing",
    ],
    benefits: [
      "Own a quality pre-owned car with ease",
      "Schemes tailored to the model you choose",
      "Open to salaried and self-employed applicants",
      "Transparent terms, no surprises",
    ],
    eligibility: ["Age 21 – 65 years", "Salaried or self-employed", "Valid KYC documents"],
    documents: ["PAN & Aadhaar", "Address proof", "Income proof", "Vehicle documents"],
    faqs: [
      { q: "Are there model-specific offers?", a: "Yes — we run special finance schemes depending on the vehicle model you choose." },
      { q: "Who can apply?", a: "Salaried and self-employed applicants between 21 and 65 years of age." },
    ],
  },
  {
    slug: "gold-loan",
    name: "Gold Loan",
    short: "Golden bridges to your financial goals.",
    tagline: "Unlock the value of your gold with free insurance and flexible repayment.",
    icon: Coins,
    color: "from-amber-400 to-yellow-600",
    keyFacts: [
      { label: "Loan value", value: "Up to 75% of gold value" },
      { label: "Tenure", value: "30 – 180 days" },
      { label: "Age", value: "21 – 70 years" },
      { label: "Insurance", value: "Free" },
    ],
    features: [
      "Up to 75% of your gold value",
      "Lowest interest rates",
      "Tenure of 30 to 180 days",
      "Free insurance for your gold",
      "Prepayment, part-payment and part-release facility",
    ],
    benefits: [
      "Quick liquidity against your jewellery",
      "Your gold stays insured throughout the tenure",
      "Release part of your ornaments whenever you wish",
      "Transparent valuation and terms",
    ],
    eligibility: ["Age 21 – 70 years", "Owner of the gold pledged", "Valid KYC documents"],
    documents: ["PAN & Aadhaar", "Address proof", "Passport-size photograph"],
    faqs: [
      { q: "How much can I borrow against my gold?", a: "Up to 75% of the assessed value of your gold." },
      { q: "Is my gold insured?", a: "Yes — free insurance is provided for the gold you pledge with us." },
      { q: "Can I release part of my ornaments?", a: "Yes, part-release, part-payment and prepayment facilities are available." },
    ],
  },
  {
    slug: "personal-loan",
    name: "Personal Loan",
    short: "Dream big, borrow smart.",
    tagline: "For medical emergencies, weddings and every personal need — funds without the wait.",
    icon: Wallet,
    color: "from-violet-500 to-fuchsia-600",
    keyFacts: [
      { label: "Application", value: "Easy & online" },
      { label: "Age", value: "21 – 65 years" },
      { label: "Tenure", value: "Flexible" },
      { label: "Hidden charges", value: "None" },
    ],
    features: [
      "Easy online application",
      "Flexible repayment tenure",
      "No hidden charges",
      "Simple 4-step process: apply → submit documents → verification → approval & disbursal",
      "Open to salaried and self-employed applicants",
    ],
    benefits: [
      "Funds for medical emergencies, weddings and personal needs",
      "Transparent, upfront terms",
      "Quick eligibility check",
      "Support from application to disbursal",
    ],
    eligibility: ["Age 21 – 65 years", "Salaried or self-employed", "Valid KYC documents"],
    documents: ["PAN & Aadhaar", "Address proof", "Income proof", "Bank statements"],
    faqs: [
      { q: "How does the process work?", a: "Four steps: apply online, submit your documents, verification by our representative, then approval and disbursal." },
      { q: "Are there hidden charges?", a: "No — all applicable charges are disclosed upfront in your loan agreement." },
    ],
  },
  {
    slug: "home-loan",
    name: "Home Loan",
    short: "Keys to your kingdom.",
    tagline: "Unlock homeownership, hassle-free, with customized repayment.",
    icon: Home,
    color: "from-cyan-500 to-blue-600",
    keyFacts: [
      { label: "Age", value: "21 – 65 years" },
      { label: "Net annual income", value: "₹5 – 10 lakh" },
      { label: "Co-loans", value: "Available" },
      { label: "Repayment", value: "Customized" },
    ],
    features: [
      "Loans for purchase of flats and houses from developers",
      "Co-loans available",
      "Attractive, competitive rates",
      "Customized, flexible repayment",
    ],
    benefits: [
      "Repayment structured around your income",
      "Guidance through property documentation",
      "Competitive pricing with transparent terms",
      "Support at every branch",
    ],
    eligibility: [
      "Age 21 – 65 years",
      "Net annual income ₹5 – 10 lakh depending on employment type",
      "At least 1 year in current job plus 2 years prior employment",
      "Good credit score required",
    ],
    documents: ["PAN & Aadhaar", "Income proof and bank statements", "Employment proof", "Property documents"],
    faqs: [
      { q: "Can I apply with a co-applicant?", a: "Yes — co-loans are available and can help improve your eligibility." },
      { q: "What income is required?", a: "A net annual income of ₹5 – 10 lakh depending on your employment type." },
    ],
  },
  {
    slug: "loan-against-property",
    name: "Loan Against Property",
    short: "Smart borrowing, strong foundation.",
    tagline: "Build wealth against your residential or commercial property.",
    icon: Landmark,
    color: "from-purple-500 to-indigo-600",
    keyFacts: [
      { label: "Age", value: "23 – 70 years" },
      { label: "End use", value: "Any purpose" },
      { label: "Property value", value: "Maximum considered" },
      { label: "Documentation", value: "Minimal" },
    ],
    features: [
      "Loan for any purpose",
      "Maximum property value considered",
      "Residential or commercial property accepted",
      "Minimal documentation",
      "Flexible tenure",
    ],
    benefits: [
      "Retain ownership of your property",
      "Higher funding backed by your asset",
      "Repayment structured to your cash flow",
      "Transparent valuation process",
    ],
    eligibility: [
      "Age 23 – 70 years",
      "Salaried with 3+ years experience, or self-employed with 2+ years in business",
      "Good credit rating required",
      "Clear property title",
    ],
    documents: ["PAN & Aadhaar", "Property title documents", "Income proof", "Bank statements"],
    faqs: [
      { q: "What can I use the funds for?", a: "The loan can be availed for any purpose, subject to the terms of your agreement." },
      { q: "Which properties are accepted?", a: "Both residential and commercial properties with a clear title." },
    ],
  },
  {
    slug: "sme-loan",
    name: "SME Loan",
    short: "Elevate everyday operations.",
    tagline: "Smart credit for growing enterprises, with instant eligibility checks.",
    icon: Building2,
    color: "from-sky-500 to-blue-600",
    keyFacts: [
      { label: "Application", value: "Easy & online" },
      { label: "Age", value: "21 – 65 years" },
      { label: "Net annual income", value: "₹5 – 10 lakh" },
      { label: "Documentation", value: "Minimal" },
    ],
    features: [
      "Easy online application",
      "Minimal documentation",
      "Instant eligibility check",
      "Quick disbursal",
    ],
    benefits: [
      "Credit that keeps daily operations moving",
      "Fast decisions so you don't lose momentum",
      "Transparent pricing",
      "Support from a local branch team",
    ],
    eligibility: [
      "Age 21 – 65 years",
      "Net annual income ₹5 – 10 lakh depending on employment type",
      "Valid KYC documents",
    ],
    documents: ["KYC of proprietor / partners", "Business proof", "Income proof", "Bank statements"],
    faqs: [
      { q: "How quickly can I know if I'm eligible?", a: "Our online application gives you an instant eligibility check." },
      { q: "Is heavy paperwork required?", a: "No — SME loans need only minimal documentation." },
    ],
  },
  {
    slug: "business-loan",
    name: "Business Loan",
    short: "Empower your enterprise.",
    tagline: "Tailored funding for businesses with a consistent track record.",
    icon: Briefcase,
    color: "from-emerald-500 to-teal-600",
    keyFacts: [
      { label: "Application", value: "Easy & online" },
      { label: "Business types", value: "All" },
      { label: "Repayment", value: "Flexible" },
      { label: "Hidden charges", value: "None" },
    ],
    features: [
      "Easy online application for all business types",
      "Quick eligibility check and disbursal",
      "Flexible repayment",
      "No hidden charges",
    ],
    benefits: [
      "Built for reputed clients with sound financial backing",
      "Funding that scales with a consistent business presence",
      "Clear, upfront terms",
      "Relationship-led service",
    ],
    eligibility: [
      "Reputed clients with sound financial backing",
      "Consistent business presence",
      "Valid KYC and proof of ownership",
    ],
    documents: [
      "Audited financials",
      "ITRs of the last 2 years",
      "Balance sheet and P&L of the last 2 years",
      "KYC documents",
      "Proof of ownership",
      "Business profile",
    ],
    faqs: [
      { q: "Which businesses can apply?", a: "All business types can apply; we look for sound financial backing and a consistent business presence." },
      { q: "What documents do I need?", a: "Audited financials, ITRs and balance sheet & P&L for 2 years, KYC, proof of ownership and a business profile." },
    ],
  },
];

export const findLoan = (slug: string) => LOANS.find((l) => l.slug === slug);
