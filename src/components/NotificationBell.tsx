"use client";
import { useEffect, useState } from "react";

export default function NotificationBell() {
  const [count, setCount] = useState(0);

  async function refresh() {
    try {
      const res = await fetch("/api/notifications/unread-count", { cache: "no-store" });
      const data = await res.json();
      setCount(data.unread ?? 0);
    } catch {}
  }
  useEffect(() => { refresh(); }, []);

  return (
    <button className="relative" aria-label="Notifications">
      <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeWidth="2" d="M15 17h5l-1.4-1.4A2 2 0 0118 14.2V11a6 6 0 10-12 0v3.2a2 2 0 01-.6 1.4L4 17h5m6 0a3 3 0 11-6 0h6z"/>
      </svg>
      {count > 0 && (
        <span className="absolute -top-1 -right-1 bg-[#E9C823] text-[#0A2E73] text-[10px] font-bold rounded-full px-1.5 py-0.5">
          {count}
        </span>
      )}
    </button>
  );
}
