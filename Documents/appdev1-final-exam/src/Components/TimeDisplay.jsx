import React, { useEffect, useState } from "react";

export default function TimeDisplay() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000 * 30); // update every 30s
    return () => clearInterval(id);
  }, []);

  return <span id="datetime">{now.toLocaleString()}</span>;
}