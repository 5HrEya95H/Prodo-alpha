import React, { useState, useRef, useCallback, useEffect } from "react";

// ── Configuration ────────────────────────────────────────────────────────────
const CELL = 22;
const TIME_COL = 60;

const SLOTS = Array.from({ length: 48 }, (_, i) => {
  const totalMins = (6 * 60 + i * 30) % (24 * 60);
  const h = Math.floor(totalMins / 60);
  const m = totalMins % 60;
  const ap = h < 12 ? "AM" : "PM";
  const dh = h === 0 ? 12 : h > 12 ? h - 12 : h;
  return { label: m === 0 ? `${dh} ${ap}` : "" };
});

const CATEGORIES = [
  { id: "study", label: "Study", color: "#22c55e" },
  { id: "code", label: "Code", color: "#3b82f6" },
  { id: "chores", label: "Chores", color: "#f97316" },
  { id: "games", label: "Video Game", color: "#eab308" },
];

// ── Component ────────────────────────────────────────────────────────────────
export default function Scheduler() {
  const [selectedCat, setSelectedCat] = useState(CATEGORIES[0]);
  const [events, setEvents] = useState([]);
  const [drag, setDrag] = useState(null);

  const gridRef = useRef(null);
  const dragRef = useRef(null); // 🔥 Fix: always latest drag

  const yToSlot = (clientY) => {
    if (!gridRef.current) return 0;
    const rect = gridRef.current.getBoundingClientRect();
    const relY = clientY - rect.top + gridRef.current.scrollTop;
    return Math.max(0, Math.min(SLOTS.length - 1, Math.floor(relY / CELL)));
  };

  const onMouseDown = (e) => {
    if (e.button !== 0 || e.target.closest("button")) return;

    const slot = yToSlot(e.clientY);

    const newDrag = {
      startSlot: slot,
      endSlot: slot,
      cat: selectedCat,
    };

    dragRef.current = newDrag;
    setDrag(newDrag);
  };

  const onMouseMove = useCallback((e) => {
    if (!dragRef.current) return;

    const updated = {
      ...dragRef.current,
      endSlot: yToSlot(e.clientY),
    };

    dragRef.current = updated;
    setDrag(updated);
  }, []);

  const onMouseUp = useCallback(() => {
    if (!dragRef.current) return;

    const d = dragRef.current;

    const start = Math.min(d.startSlot, d.endSlot);
    const end = Math.max(d.startSlot, d.endSlot);

    setEvents((prev) => [
      ...prev,
      {
        id: Date.now(),
        startSlot: start,
        endSlot: end,
        color: d.cat.color,
      },
    ]);

    dragRef.current = null;
    setDrag(null);
  }, []);

  useEffect(() => {
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseMove, onMouseUp]);

  return (
    <div style={s.viewport}>
      <div style={s.notebook}>
        <div style={s.redX}>×</div>

        <div style={s.bookmark}>
          <div style={{ fontSize: "20px", fontWeight: "bold" }}>23</div>
          <div style={{ fontSize: "10px" }}>Friday</div>
        </div>

        <div style={s.rings}>
          {[...Array(10)].map((_, i) => (
            <div key={i} style={s.ring} />
          ))}
        </div>

        <div style={s.paper}>
          {/* LEFT */}
          <div style={s.leftPage}>
            <div style={s.headerRow}>
              <span>3 March, 26</span>
              <span>Friday</span>
            </div>

            <div style={s.subhead}>Choose the Category of Task</div>

            <div style={s.pills}>
              {CATEGORIES.map((c) => (
                <button
                  key={c.id}
                  onClick={() => setSelectedCat(c)}
                  style={{
                    ...s.pill,
                    backgroundColor:
                      selectedCat.id === c.id ? c.color : "white",
                    color: selectedCat.id === c.id ? "white" : "#555",
                  }}
                >
                  {c.label}
                </button>
              ))}
            </div>

            <div
              ref={gridRef}
              onMouseDown={onMouseDown}
              style={{
                ...s.grid,
                userSelect: drag ? "none" : "auto", // 🔥 fix text select
              }}
            >
              {SLOTS.map((slot, i) => (
                <div key={i} style={s.gridRow}>
                  <div style={s.time}>{slot.label}</div>
                  <div style={s.line} />
                </div>
              ))}

              {/* Drag Preview */}
              {drag && (
                <div
                  style={{
                    ...s.event,
                    top:
                      Math.min(drag.startSlot, drag.endSlot) * CELL,
                    height:
                      (Math.abs(drag.endSlot - drag.startSlot) + 1) *
                      CELL,
                    backgroundColor: drag.cat.color,
                    opacity: 0.5,
                  }}
                />
              )}

              {/* Saved */}
              {events.map((ev) => (
                <div
                  key={ev.id}
                  style={{
                    ...s.event,
                    top: ev.startSlot * CELL,
                    height:
                      (ev.endSlot - ev.startSlot + 1) * CELL,
                    backgroundColor: ev.color,
                  }}
                >
                  <button
                    onClick={() =>
                      setEvents((prev) =>
                        prev.filter((e) => e.id !== ev.id)
                      )
                    }
                    style={s.delete}
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT */}
          <div style={s.rightPage}>
            <textarea placeholder="Daily Notes..." style={s.journal} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Styles ───────────────────────────────────────────────────────────────────
const s = {
  viewport: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#e0e0e0",
  },
  notebook: {
    position: "relative",
    width: "800px",
    height: "550px",
    background: "#8b5e3c",
    padding: "15px",
    borderRadius: "8px",
  },
  paper: {
    display: "flex",
    width: "100%",
    height: "100%",
    background: "#fdf5e6",
  },
  rings: {
    position: "absolute",
    left: "50%",
    transform: "translateX(-50%)",
    top: "30px",
    bottom: "30px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
  },
  ring: {
    width: "32px",
    height: "10px",
    borderRadius: "5px",
    background: "gray",
  },
  leftPage: {
    flex: 1,
    borderRight: "1px solid #dcd0b9",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
  },
  rightPage: { flex: 1, padding: "20px" },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "2px solid #5d4037",
  },
  subhead: { fontSize: "11px", margin: "10px 0 5px" },
  pills: { display: "flex", gap: "5px", flexWrap: "wrap" },
  pill: {
    padding: "2px 8px",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "10px",
    cursor: "pointer",
  },
  grid: {
    position: "relative",
    flex: 1,
    overflowY: "auto",
    border: "1px solid #e5d3b3",
    background: "white",
  },
  gridRow: {
    height: CELL,
    display: "flex",
    alignItems: "center",
    borderBottom: "1px solid #eee",
  },
  time: {
    width: TIME_COL,
    fontSize: "9px",
    textAlign: "right",
    paddingRight: "5px",
  },
  line: { flex: 1 },
  event: {
    position: "absolute",
    left: TIME_COL,
    right: "5px",
    borderRadius: "2px",
  },
  delete: {
    position: "absolute",
    right: 0,
    top: 0,
    background: "none",
    border: "none",
    color: "white",
    cursor: "pointer",
  },
  journal: {
    width: "100%",
    height: "100%",
    border: "none",
    outline: "none",
    resize: "none",
  },
  bookmark: {
    position: "absolute",
    top: "-35px",
    left: "50%",
    transform: "translateX(-50%)",
    background: "#fdf5e6",
    padding: "5px 20px",
  },
  redX: {
    position: "absolute",
    top: "5px",
    right: "5px",
    background: "red",
    color: "white",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
};