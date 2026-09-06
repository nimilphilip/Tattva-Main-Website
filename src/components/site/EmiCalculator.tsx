import { useMemo, useState } from "react";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { Link } from "@tanstack/react-router";

function inr(n: number) {
  return n.toLocaleString("en-IN", { style: "currency", currency: "INR", maximumFractionDigits: 0 });
}

export function EmiCalculator({ compact = false }: { compact?: boolean }) {
  const [amount, setAmount] = useState(1500000);
  const [rate, setRate] = useState(9.5);
  const [tenure, setTenure] = useState(60);

  const { emi, totalInterest, totalPay } = useMemo(() => {
    const r = rate / 12 / 100;
    const n = tenure;
    const emi = r === 0 ? amount / n : (amount * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    const totalPay = emi * n;
    return { emi, totalPay, totalInterest: totalPay - amount };
  }, [amount, rate, tenure]);

  const data = [
    { name: "Principal", value: amount, color: "#0A1F3F" },
    { name: "Interest", value: Math.max(0, totalInterest), color: "#D4AF37" },
  ];

  return (
    <div className={`grid gap-8 ${compact ? "md:grid-cols-1" : "md:grid-cols-5"}`}>
      <div className={compact ? "" : "md:col-span-3 space-y-6"}>
        <Field label="Loan amount" value={inr(amount)}>
          <Slider value={[amount]} min={50000} max={20000000} step={10000} onValueChange={(v) => setAmount(v[0])} />
          <div className="flex justify-between text-xs text-muted-foreground mt-2"><span>₹50K</span><span>₹2 Cr</span></div>
        </Field>
        <Field label="Interest rate (p.a.)" value={`${rate.toFixed(2)}%`}>
          <Slider value={[rate]} min={7} max={24} step={0.05} onValueChange={(v) => setRate(v[0])} />
          <div className="flex justify-between text-xs text-muted-foreground mt-2"><span>7%</span><span>24%</span></div>
        </Field>
        <Field label="Tenure" value={`${tenure} months`}>
          <Slider value={[tenure]} min={6} max={360} step={1} onValueChange={(v) => setTenure(v[0])} />
          <div className="flex justify-between text-xs text-muted-foreground mt-2"><span>6 mo</span><span>30 yr</span></div>
        </Field>
      </div>
      <div className={compact ? "" : "md:col-span-2"}>
        <div className="rounded-3xl bg-gradient-brand p-6 text-white shadow-elevated relative overflow-hidden">
          <div className="absolute inset-0 bg-grid opacity-30" />
          <div className="relative">
            <div className="text-xs uppercase tracking-widest text-white/70">Monthly EMI</div>
            <div className="mt-2 text-4xl font-display font-bold">{inr(emi)}</div>
            <div className="mt-6 h-40">
              <ResponsiveContainer>
                <PieChart>
                  <Pie data={data} dataKey="value" innerRadius={44} outerRadius={68} paddingAngle={2}>
                    {data.map((d) => <Cell key={d.name} fill={d.color} stroke="none" />)}
                  </Pie>
                  <Tooltip formatter={(v: number) => inr(v)} contentStyle={{ borderRadius: 8, border: "none", background: "#0A1F3F", color: "#fff" }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
              <Stat label="Principal" value={inr(amount)} dot="#fff" />
              <Stat label="Interest" value={inr(totalInterest)} dot="#D4AF37" />
              <div className="col-span-2 pt-3 mt-2 border-t border-white/20">
                <Stat label="Total payable" value={inr(totalPay)} />
              </div>
            </div>
            <Link to="/loans">
              <Button className="mt-6 w-full rounded-full bg-gold text-navy-deep hover:bg-gold/90 font-semibold">Apply for this loan</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, children }: { label: string; value: string; children: React.ReactNode }) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <label className="text-sm font-medium text-foreground">{label}</label>
        <span className="text-sm font-bold text-primary">{value}</span>
      </div>
      {children}
    </div>
  );
}

function Stat({ label, value, dot }: { label: string; value: string; dot?: string }) {
  return (
    <div>
      <div className="flex items-center gap-1.5 text-white/70 text-xs">
        {dot && <span className="h-2 w-2 rounded-full" style={{ background: dot }} />}
        {label}
      </div>
      <div className="font-semibold">{value}</div>
    </div>
  );
}
