import { useCallback, useEffect, useState } from "react";

const STORAGE_KEY = "admin_pending_notifications_count";
const UPDATE_EVENT = "admin-notifications-updated";

function parseCount(value) {
  const num = Number.parseInt(value ?? "0", 10);
  return Number.isFinite(num) && num >= 0 ? num : 0;
}

function readStoredCount() {
  if (typeof window === "undefined") return 0;
  return parseCount(window.localStorage.getItem(STORAGE_KEY));
}

function writeStoredCount(nextCount) {
  if (typeof window === "undefined") return;
  const safeCount = parseCount(String(nextCount));
  window.localStorage.setItem(STORAGE_KEY, String(safeCount));
  window.dispatchEvent(new CustomEvent(UPDATE_EVENT, { detail: safeCount }));
}

export default function useAdminNotificationCount() {
  const [count, setCount] = useState(() => readStoredCount());

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    const syncFromStorage = () => setCount(readStoredCount());

    window.addEventListener("storage", syncFromStorage);
    window.addEventListener(UPDATE_EVENT, syncFromStorage);

    return () => {
      window.removeEventListener("storage", syncFromStorage);
      window.removeEventListener(UPDATE_EVENT, syncFromStorage);
    };
  }, []);

  const updateCount = useCallback((nextCount) => {
    writeStoredCount(nextCount);
    setCount(parseCount(String(nextCount)));
  }, []);

  return { count, setCount: updateCount };
}
