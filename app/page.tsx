"use client";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), {
  ssr: false,
  loading: () => (
    <div className="h-full w-full bg-[#0B1117] animate-pulse flex items-center justify-center text-gray-400">
      Loading Map...
    </div>
  ),
});

interface Outage {
  id: number;
  region: string;
  severity: "high" | "medium" | "low";
  customers: number;
  lat: number;
  lng: number;
}

export default function Home() {
  const [outages, setOutages] = useState<Outage[]>([]);
  const [filter, setFilter] = useState<string>("all");

  useEffect(() => {
    fetch("http://localhost:8000/api/outages")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA RECEIVED:", data);
        setOutages(data);
      })
      .catch((err) => console.error("FETCH ERROR:", err));
  }, []);

  const filtered = filter === "all"
    ? outages
    : outages.filter((o) => o.severity === filter);

  return (
    <div className="flex h-screen bg-[#030712] text-white overflow-hidden">

      {/* LEFT — Map 70% */}
      <div className="w-[70%] h-full">
        <div className="h-full p-4">
          <h1 className="text-xl font-black tracking-tight text-[#38BDF8] mb-2">
            ⚡ GRID STRESS MONITOR
          </h1>
          <p className="text-gray-400 text-sm mb-3">
            Real-time nationwide power outage tracking
          </p>
          <div className="h-[calc(100%-80px)] rounded-xl overflow-hidden border border-[#1F2937]">
            <Map outages={filtered} />
          </div>
        </div>
      </div>

      {/* RIGHT — Sidebar 30% */}
      <div className="w-[30%] h-full border-l border-[#1F2937] p-5 overflow-y-auto">

        {/* Why This Matters */}
        <div className="bg-[#0B1117] border border-[#1F2937] rounded-xl p-4 mb-4">
          <h3 className="text-[#38BDF8] font-bold mb-2 text-sm uppercase tracking-wider">
            ⚡ Why This Matters
          </h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Grid reliability is a proxy for economic trust. Outages cascade
            into data center downtime, supply chain disruption, and climate
            vulnerability.
          </p>
        </div>

        {/* Who Controls */}
        <div className="bg-[#0B1117] border border-[#1F2937] rounded-xl p-4 mb-4">
          <h3 className="text-[#38BDF8] font-bold mb-2 text-sm uppercase tracking-wider">
            🏛 Who Controls the Rail
          </h3>
          <div className="text-sm text-gray-400 space-y-1">
            {["FERC", "ISO / RTO", "Transmission Utility", "Distribution Utility", "End Customer"].map(
              (level, i, arr) => (
                <div key={level} className="flex items-center gap-2">
                  <span className="text-[#38BDF8]">{"→".repeat(i) || "◉"}</span>
                  <span className={i === arr.length - 1 ? "text-white" : ""}>{level}</span>
                </div>
              )
            )}
          </div>
        </div>

        {/* Filter */}
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full bg-[#0B1117] border border-[#1F2937] text-white rounded-lg p-2 mb-4 text-sm"
        >
          <option value="all">All Severities</option>
          <option value="high">🔴 High</option>
          <option value="medium">🟠 Medium</option>
          <option value="low">🟡 Low</option>
        </select>

        {/* Active Incidents */}
        <h3 className="text-[#38BDF8] font-bold mb-3 text-sm uppercase tracking-wider">
          📋 Active Incidents ({filtered.length})
        </h3>

        {filtered.length === 0 ? (
          <div className="text-gray-500 text-sm text-center py-8">
            No incidents found...
          </div>
        ) : (
          filtered.map((o) => (
            <div
              key={o.id}
              className="bg-[#0B1117] border border-[#1F2937] rounded-xl p-3 mb-2 hover:border-[#38BDF8] transition-colors"
            >
              <div className="flex justify-between items-center mb-1">
                <span className="font-bold text-sm text-white">{o.region}</span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-bold uppercase ${
                  o.severity === "high"
                    ? "bg-red-950 text-red-400 border border-red-800"
                    : o.severity === "medium"
                    ? "bg-orange-950 text-orange-400 border border-orange-800"
                    : "bg-yellow-950 text-yellow-400 border border-yellow-800"
                }`}>
                  {o.severity}
                </span>
              </div>
              <p className="text-[#38BDF8] font-mono font-bold text-lg">
                {o.customers.toLocaleString()}
              </p>
              <p className="text-gray-500 text-xs">customers affected</p>
            </div>
          ))
        )}

        {/* Download Button */}
        <button
          onClick={() => {
            const csv = [
              "id,region,severity,customers,lat,lng",
              ...outages.map((o) =>
                `${o.id},${o.region},${o.severity},${o.customers},${o.lat},${o.lng}`
              ),
            ].join("\n");
            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "outages.csv";
            a.click();
          }}
          className="w-full mt-4 bg-[#38BDF8] text-[#030712] font-bold py-2 rounded-lg text-sm hover:bg-[#7DD3FC] transition-colors"
        >
          ⬇ Download Sample Data
        </button>

      </div>
    </div>
  );
}