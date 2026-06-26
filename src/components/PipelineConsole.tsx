"use client";
import { useState, useEffect, useRef } from "react";
import Icon from "./Icon";

const INITIAL_LOGS = [
  { id: 1, time: "14:32:01", status: "ok",   pipeline: "customer-events",  msg: "12,400 events flushed to BigQuery warehouse" },
  { id: 2, time: "14:32:00", status: "ok",   pipeline: "payments-ingest",  msg: "AutoScale triggered — +3 compute nodes allocated" },
  { id: 3, time: "14:31:58", status: "warn", pipeline: "payments-ingest",  msg: "Anomaly detected: error_rate ↑ 0.4% above baseline" },
  { id: 4, time: "14:31:55", status: "ok",   pipeline: "ml-feature-store", msg: "Model retraining job completed in 1.2s" },
];

const NEW_LOGS = [
  { id: 5,  time: "14:32:04", status: "ok",   pipeline: "customer-events",  msg: "Checkpoint committed — offset 449,120" },
  { id: 6,  time: "14:32:07", status: "ok",   pipeline: "ml-feature-store", msg: "Feature vector batch (2,048) written to Redis" },
  { id: 7,  time: "14:32:10", status: "warn", pipeline: "payments-ingest",  msg: "Retry backoff: upstream timeout (attempt 2/3)" },
  { id: 8,  time: "14:32:13", status: "ok",   pipeline: "customer-events",  msg: "Dead-letter queue drained — 3 events reprocessed" },
  { id: 9,  time: "14:32:16", status: "ok",   pipeline: "payments-ingest",  msg: "Circuit breaker reset — resuming normal flow" },
  { id: 10, time: "14:32:19", status: "ok",   pipeline: "ml-feature-store", msg: "Scheduled snapshot export to S3 complete" },
];

const PIPELINES = [
  { name: "customer-events",  status: "running", events: "12.4K/s",  health: 98 },
  { name: "payments-ingest",  status: "warn",    events: "4.1K/s",   health: 71 },
  { name: "ml-feature-store", status: "running", events: "890/s",    health: 100 },
  { name: "clickstream-raw",  status: "running", events: "31.2K/s",  health: 99 },
];

function StatusDot({ status }: { status: string }) {
  const color = status === "running" ? "#22c55e" : status === "warn" ? "#FF9932" : "#ef4444";
  return (
    <span style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center", width: 10, height: 10, flexShrink: 0 }}>
      <span style={{
        position: "absolute", inset: 0, borderRadius: "50%", background: color, opacity: 0.3,
        animation: "pulseRing 1.8s ease-out infinite",
      }} />
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: color, display: "block", position: "relative" }} />
    </span>
  );
}

function Sparkline({ health }: { health: number }) {
  const points = Array.from({ length: 10 }, (_, i) => {
    const base = health / 100;
    const noise = (Math.sin(i * 1.3 + health) * 0.08);
    return Math.max(0.1, Math.min(1, base + noise));
  });
  const w = 48, h = 20;
  const pts = points.map((v, i) => `${(i / 9) * w},${h - v * h}`).join(" ");
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: "visible" }}>
      <polyline points={pts} fill="none" stroke={health > 90 ? "#22c55e" : "#FF9932"} strokeWidth="1.5" strokeLinejoin="round" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
}

export default function PipelineConsole() {
  const [logs, setLogs] = useState(INITIAL_LOGS);
  const [logIdx, setLogIdx] = useState(0);
  const [tab, setTab] = useState<"pipelines" | "logs">("pipelines");
  const [eventsPerSec, setEventsPerSec] = useState(94300);
  const [activeNodes, setActiveNodes] = useState(12);
  const logRef = useRef<HTMLDivElement>(null);

  // Live log ticker
  useEffect(() => {
    const interval = setInterval(() => {
      const next = NEW_LOGS[logIdx % NEW_LOGS.length];
      const now = new Date();
      const timeStr = `${String(now.getHours()).padStart(2,"0")}:${String(now.getMinutes()).padStart(2,"0")}:${String(now.getSeconds()).padStart(2,"0")}`;
      const newLog = { ...next, id: Date.now(), time: timeStr };
      setLogs((prev) => [newLog, ...prev].slice(0, 8));
      setLogIdx((i) => i + 1);
      setEventsPerSec((v) => Math.round(v + (Math.random() - 0.48) * 800));
    }, 2200);
    return () => clearInterval(interval);
  }, [logIdx]);

  // Node count flicker
  useEffect(() => {
    const t = setInterval(() => {
      if (Math.random() > 0.85) setActiveNodes((n) => n + (Math.random() > 0.5 ? 1 : -1));
    }, 3000);
    return () => clearInterval(t);
  }, []);

  const statusColor = (s: string) => s === "running" ? "#22c55e" : s === "warn" ? "#FF9932" : "#ef4444";
  const logColor   = (s: string) => s === "ok" ? "rgba(241,246,244,0.5)" : "#FF9932";

  return (
    <div style={{
      background: "linear-gradient(160deg, #0d1f2a 0%, #0a1a22 100%)",
      border: "1px solid rgba(255,255,255,0.08)",
      borderRadius: 16,
      overflow: "hidden",
      boxShadow: "0 40px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.04)",
      fontFamily: '"JetBrains Mono", monospace',
    }}>

      {/* ── Title bar ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "10px 16px", borderBottom: "1px solid rgba(255,255,255,0.07)",
        background: "rgba(255,255,255,0.025)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ display: "flex", gap: 6 }}>
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FF5F57", display: "block" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#FEBC2E", display: "block" }} />
            <span style={{ width: 11, height: 11, borderRadius: "50%", background: "#28C840", display: "block" }} />
          </div>
          <span style={{ fontSize: 11, color: "rgba(241,246,244,0.3)", marginLeft: 8 }}>amai — pipeline console</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <StatusDot status="running" />
          <span style={{ fontSize: 10, color: "rgba(241,246,244,0.35)" }}>LIVE</span>
        </div>
      </div>

      {/* ── Metric bar ── */}
      <div style={{
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
      }}>
        {[
          { label: "PIPELINES", value: "1,284",                          icon: "arrow-path",        color: "#FFC801" },
          { label: "EVENTS/SEC",  value: eventsPerSec.toLocaleString(),  icon: "arrow-trending-up", color: "#FF9932" },
          { label: "AVG LATENCY", value: "1.8ms",                        icon: "cog-8-tooth",       color: "#FFC801" },
          { label: "NODES",       value: String(activeNodes),            icon: "cube-16-solid",     color: "#22c55e" },
        ].map((m, i) => (
          <div key={i} style={{
            padding: "14px 16px",
            borderRight: i < 3 ? "1px solid rgba(255,255,255,0.05)" : "none",
            background: "rgba(23,43,54,0.5)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 9, color: "rgba(241,246,244,0.3)", letterSpacing: "0.1em" }}>{m.label}</span>
              <Icon name={m.icon} size={12} strokeColor={m.color} />
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, color: "#F1F6F4", lineHeight: 1 }}>{m.value}</div>
          </div>
        ))}
      </div>

      {/* ── Tab bar ── */}
      <div style={{
        display: "flex", borderBottom: "1px solid rgba(255,255,255,0.06)",
        background: "rgba(0,0,0,0.15)",
      }}>
        {(["pipelines", "logs"] as const).map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{
            padding: "9px 16px", background: "none", border: "none", cursor: "pointer",
            fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase",
            color: tab === t ? "#FFC801" : "rgba(241,246,244,0.28)",
            borderBottom: tab === t ? "1px solid #FFC801" : "1px solid transparent",
            marginBottom: -1, transition: "color 150ms",
          }}>
            {t}
          </button>
        ))}
      </div>

      {/* ── Pipelines tab ── */}
      {tab === "pipelines" && (
        <div style={{ padding: "12px 0" }}>
          {PIPELINES.map((p) => (
            <div key={p.name} style={{
              display: "grid", gridTemplateColumns: "1fr auto auto auto",
              alignItems: "center", gap: 16,
              padding: "10px 16px",
              borderBottom: "1px solid rgba(255,255,255,0.04)",
              transition: "background 150ms",
            }}
            onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"; }}
            onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "transparent"; }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <StatusDot status={p.status} />
                <span style={{ fontSize: 12, color: "rgba(241,246,244,0.8)" }}>{p.name}</span>
              </div>
              <span style={{ fontSize: 11, color: "rgba(241,246,244,0.35)", textAlign: "right" }}>{p.events}</span>
              <div style={{ width: 48 }}>
                <Sparkline health={p.health} />
              </div>
              <span style={{ fontSize: 10, color: statusColor(p.status), minWidth: 28, textAlign: "right" }}>{p.health}%</span>
            </div>
          ))}
        </div>
      )}

      {/* ── Logs tab ── */}
      {tab === "logs" && (
        <div ref={logRef} style={{ padding: "8px 0", maxHeight: 180, overflowY: "auto" }}>
          {logs.map((log, i) => (
            <div key={log.id} style={{
              display: "grid", gridTemplateColumns: "auto auto 1fr",
              gap: 12, alignItems: "start", padding: "7px 16px",
              animation: i === 0 ? "logSlide 250ms ease-out both" : "none",
              borderBottom: "1px solid rgba(255,255,255,0.03)",
            }}>
              <span style={{ fontSize: 10, color: "rgba(241,246,244,0.25)", whiteSpace: "nowrap" }}>{log.time}</span>
              <span style={{ fontSize: 10, color: log.status === "warn" ? "#FF9932" : "#22c55e", background: log.status === "warn" ? "rgba(255,153,50,0.1)" : "rgba(34,197,94,0.1)", padding: "1px 6px", borderRadius: 4 }}>
                {log.status.toUpperCase()}
              </span>
              <span style={{ fontSize: 11, color: logColor(log.status), lineHeight: 1.5 }}>
                <span style={{ color: "rgba(255,200,1,0.6)" }}>[{log.pipeline}]</span> {log.msg}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* ── Status footer ── */}
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "8px 16px", borderTop: "1px solid rgba(255,255,255,0.05)",
        background: "rgba(0,0,0,0.2)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ display: "inline-block", width: 6, height: 6, borderRadius: "50%", background: "#22c55e", animation: "blink 2s ease-in-out infinite" }} />
          <span style={{ fontSize: 10, color: "rgba(241,246,244,0.28)" }}>All systems operational</span>
        </div>
        <span style={{ fontSize: 10, color: "rgba(255,200,1,0.4)" }}>AmAi v2.0.1</span>
      </div>
    </div>
  );
}
