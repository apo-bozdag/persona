import { useState, useRef, useCallback, useMemo } from "react";

const MOCK_POIS = [
  {
    id: 1, name: "Spreepark", city: "Berlin", country: "Germany",
    image: "https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800&q=80",
    rating: 4.15, ratingCount: 52, price: 2,
    description: "Abandoned amusement park. A Cold War relic where art and nature intertwine.",
    tags: ["abandoned", "park", "art", "history", "outdoor"],
    vibe: ["mysterious", "quiet", "photogenic"],
  },
  {
    id: 2, name: "Karaköy Lokantası", city: "Istanbul", country: "Turkey",
    image: "https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80",
    rating: 4.6, ratingCount: 2341, price: 3,
    description: "Modern takes on Ottoman cuisine. A seafront tavern in a historic building.",
    tags: ["fine_dining", "seafood", "traditional", "ottoman", "wine"],
    vibe: ["classy", "romantic", "cultural"],
  },
  {
    id: 3, name: "Berghain", city: "Berlin", country: "Germany",
    image: "https://images.unsplash.com/photo-1598387993441-a364f854c3e1?w=800&q=80",
    rating: 4.3, ratingCount: 8920, price: 2,
    description: "The world's most iconic techno club. In a former power plant, open 72 hours straight.",
    tags: ["nightlife", "techno", "underground", "iconic", "industrial"],
    vibe: ["raw", "intense", "underground"],
  },
  {
    id: 4, name: "Kuzguncuk Waterfront", city: "Istanbul", country: "Turkey",
    image: "https://images.unsplash.com/photo-1527838832700-5059252407fa?w=800&q=80",
    rating: 4.4, ratingCount: 1203, price: 1,
    description: "A quiet Bosphorus-side neighborhood. Colorful wooden houses, cats, and small cafes.",
    tags: ["neighborhood", "waterfront", "quiet", "cats", "local", "vintage"],
    vibe: ["peaceful", "authentic", "cozy"],
  },
  {
    id: 5, name: "La Boqueria", city: "Barcelona", country: "Spain",
    image: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80",
    rating: 4.2, ratingCount: 45200, price: 2,
    description: "A market open since 1217. Fresh seafood, fruits, and tapas bars.",
    tags: ["market", "street_food", "crowded", "touristy", "fresh", "colorful"],
    vibe: ["bustling", "vibrant", "touristy"],
  },
  {
    id: 6, name: "Atatürk Museum", city: "Trabzon", country: "Turkey",
    image: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=800&q=80",
    rating: 4.5, ratingCount: 3400, price: 1,
    description: "Historic mansion where Atatürk stayed during his Trabzon visits. Personal belongings on display.",
    tags: ["museum", "ataturk", "history", "heritage", "national"],
    vibe: ["respectful", "historical", "meaningful"],
  },
  {
    id: 7, name: "Olympos Treehouse", city: "Olympos", country: "Turkey",
    image: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&q=80",
    rating: 4.1, ratingCount: 890, price: 1,
    description: "Stay in treehouses among ancient ruins, 5 minutes from the beach.",
    tags: ["camping", "nature", "treehouse", "backpacker", "beach", "ruins"],
    vibe: ["free", "adventurous", "bohemian"],
  },
  {
    id: 8, name: "Salt Galata", city: "Istanbul", country: "Turkey",
    image: "https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=800&q=80",
    rating: 4.5, ratingCount: 2100, price: 1,
    description: "Contemporary art center in a former Ottoman bank. Free exhibitions, library, and cafe.",
    tags: ["art", "contemporary", "free", "architecture", "cultural", "library"],
    vibe: ["intellectual", "calm", "inspiring"],
  },
  {
    id: 9, name: "Steakhouse No. 7", city: "Berlin", country: "Germany",
    image: "https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80",
    rating: 4.0, ratingCount: 560, price: 4,
    description: "Premium steakhouse. Dry-aged beef, curated wine list, dark ambiance.",
    tags: ["steakhouse", "meat", "expensive", "wine", "dark_ambiance"],
    vibe: ["luxurious", "dark", "exclusive"],
  },
  {
    id: 10, name: "Grand Bazaar", city: "Istanbul", country: "Turkey",
    image: "https://images.unsplash.com/photo-1558642452-9d2a7deb7f62?w=800&q=80",
    rating: 4.3, ratingCount: 78000, price: 2,
    description: "Open since 1461, 4000+ shops. Carpets, spices, jewelry, and tea.",
    tags: ["shopping", "historic", "crowded", "touristy", "traditional", "iconic"],
    vibe: ["chaotic", "vibrant", "overwhelming"],
  },
];

const TAG_LABELS = {
  abandoned:"Abandoned",park:"Park",art:"Art",history:"History",outdoor:"Outdoor",
  fine_dining:"Fine Dining",seafood:"Seafood",traditional:"Traditional",ottoman:"Ottoman",
  wine:"Wine",nightlife:"Nightlife",techno:"Techno",underground:"Underground",iconic:"Iconic",
  industrial:"Industrial",neighborhood:"Neighborhood",waterfront:"Waterfront",quiet:"Quiet",cats:"Cats",
  local:"Local",vintage:"Vintage",market:"Market",street_food:"Street Food",crowded:"Crowded",
  touristy:"Touristy",fresh:"Fresh",colorful:"Colorful",museum:"Museum",ataturk:"Atatürk",
  heritage:"Heritage",national:"National",camping:"Camping",nature:"Nature",treehouse:"Treehouse",
  backpacker:"Backpacker",beach:"Beach",ruins:"Ancient Ruins",contemporary:"Contemporary",free:"Free",
  architecture:"Architecture",cultural:"Cultural",library:"Library",steakhouse:"Steakhouse",meat:"Meat",
  expensive:"Expensive",dark_ambiance:"Dark Ambiance",shopping:"Shopping",historic:"Historic",
  mysterious:"Mysterious",photogenic:"Photogenic",classy:"Classy",romantic:"Romantic",raw:"Raw",
  intense:"Intense",peaceful:"Peaceful",authentic:"Authentic",cozy:"Cozy",bustling:"Bustling",
  vibrant:"Vibrant",intellectual:"Intellectual",calm:"Calm",inspiring:"Inspiring",
  luxurious:"Luxurious",dark:"Dark",exclusive:"Exclusive",chaotic:"Chaotic",overwhelming:"Overwhelming",
  adventurous:"Adventurous",bohemian:"Bohemian",meaningful:"Meaningful",respectful:"Respectful",historical:"Historical",
};

const getTag = (t) => TAG_LABELS[t] || t;
const priceLbl = ["","$","$$","$$$","$$$$"];

// Stable shuffled rows - computed once outside component
function shuffle(arr, seed) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(((Math.sin(seed * (i + 1)) + 1) / 2) * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const ALL_IMAGES = MOCK_POIS.map(p => ({ id: p.id, url: p.image, name: p.name }));
const WALL_ROWS = [shuffle(ALL_IMAGES, 1), shuffle(ALL_IMAGES, 2), shuffle(ALL_IMAGES, 3), shuffle(ALL_IMAGES, 4)];
const WALL_SPEEDS = [60, 45, 55, 40];

// Netflix-style flowing poster wall
function BgSlideshow({ likedImages }) {
  const likedIds = useMemo(() => new Set(likedImages.map(i => i.id)), [likedImages]);

  return (
    <div style={{
      position: "absolute", inset: 0, overflow: "hidden", zIndex: 0,
    }}>
      {/* Poster wall grid */}
      <div style={{
        position: "absolute", inset: -60,
        display: "flex", flexDirection: "column", gap: 8,
        justifyContent: "center",
        transform: "rotate(-8deg) scale(1.3)",
        opacity: likedImages.length > 0 ? 0.35 : 0.12,
        transition: "opacity 1.5s ease",
      }}>
        {WALL_ROWS.map((row, ri) => (
          <div key={ri} style={{
            display: "flex", gap: 8,
            animation: `wallScroll${ri % 2 === 0 ? "L" : "R"} ${WALL_SPEEDS[ri]}s linear infinite`,
          }}>
            {/* Duplicate row for seamless loop */}
            {[...row, ...row, ...row].map((img, ii) => (
              <div key={`${ri}-${ii}`} style={{
                width: 180, height: 120, flexShrink: 0, borderRadius: 8,
                overflow: "hidden", position: "relative",
              }}>
                <img src={img.url} alt="" style={{
                  width: "100%", height: "100%", objectFit: "cover",
                  filter: likedIds.has(img.id)
                    ? "saturate(0.7) brightness(0.6)"
                    : "saturate(0.2) brightness(0.35)",
                  transition: "filter 1s ease",
                }} />
                {likedIds.has(img.id) && (
                  <div style={{
                    position: "absolute", inset: 0,
                    border: "1px solid rgba(91,154,106,0.25)",
                    borderRadius: 8,
                  }} />
                )}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "rgba(12,12,12,0.55)",
      }} />
      {/* Vignette */}
      <div style={{
        position: "absolute", inset: 0,
        background: "radial-gradient(ellipse at center, transparent 20%, #0c0c0c 70%)",
      }} />
      {/* Bottom fade */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0, height: "45%",
        background: "linear-gradient(transparent, #0c0c0c)",
      }} />
      {/* Top fade */}
      <div style={{
        position: "absolute", top: 0, left: 0, right: 0, height: "35%",
        background: "linear-gradient(#0c0c0c, transparent)",
      }} />
      {/* Left fade */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, left: 0, width: "25%",
        background: "linear-gradient(to right, #0c0c0c, transparent)",
      }} />
      {/* Right fade */}
      <div style={{
        position: "absolute", top: 0, bottom: 0, right: 0, width: "25%",
        background: "linear-gradient(to left, #0c0c0c, transparent)",
      }} />
      {/* Grain */}
      <div style={{
        position: "absolute", inset: 0,
        background: `repeating-conic-gradient(rgba(255,255,255,0.01) 0% 25%, transparent 0% 50%) 0 0 / 3px 3px`,
        opacity: 0.4,
      }} />
    </div>
  );
}


export default function PersonaBuilder() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [reactions, setReactions] = useState([]);
  const [preferences, setPreferences] = useState({});
  const [phase, setPhase] = useState("swipe");
  const [currentReaction, setCurrentReaction] = useState(null);
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [freeText, setFreeText] = useState("");
  const [cardAnim, setCardAnim] = useState("");
  const [showJson, setShowJson] = useState(false);
  const [reasonAnim, setReasonAnim] = useState(false);
  const [dragX, setDragX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef(null);
  const [cardKey, setCardKey] = useState(0);

  const currentPoi = MOCK_POIS[currentIndex];
  const isFinished = currentIndex >= MOCK_POIS.length;

  const likedImages = reactions
    .filter(r => r.reaction === "love" || r.reaction === "like")
    .map(r => {
      const poi = MOCK_POIS.find(p => p.id === r.poi_id);
      return poi ? { id: poi.id, url: poi.image, name: poi.name } : null;
    })
    .filter(Boolean);

  const computePersonaSummary = useCallback((prefs) => {
    const sorted = Object.entries(prefs).sort((a, b) => Math.abs(b[1].score) - Math.abs(a[1].score));
    return {
      loves: sorted.filter(([, v]) => v.score > 0.15).slice(0, 10),
      dislikes: sorted.filter(([, v]) => v.score < -0.15).slice(0, 10),
    };
  }, []);

  const updatePreferences = useCallback((poi, reaction, reasons) => {
    setPreferences(prev => {
      const next = { ...prev };
      const mult = reaction === "love" ? 1.5 : reaction === "like" ? 0.7 : -1.2;
      [...(poi.tags || []), ...(poi.vibe || [])].forEach(tag => {
        if (!next[tag]) next[tag] = { score: 0, count: 0, sources: [] };
        const w = reasons.includes(tag) ? 1.8 : 0.4;
        next[tag].count += 1;
        next[tag].score = (next[tag].score * (next[tag].count - 1) + mult * w) / next[tag].count;
        if (!next[tag].sources.includes(poi.name)) next[tag].sources.push(poi.name);
      });
      return next;
    });
  }, []);

  const handleReaction = (type) => {
    if (phase !== "swipe") return;
    setCurrentReaction(type);
    setCardAnim(type === "dislike" ? "exit-left" : type === "love" ? "exit-up" : "exit-right");
    setTimeout(() => { setPhase("reason"); setReasonAnim(true); setCardAnim(""); }, 340);
  };

  const commitReaction = (withReasons) => {
    const reasons = withReasons ? [...selectedReasons, ...(freeText.trim() ? [freeText.trim()] : [])] : [];
    setReactions(p => [...p, {
      poi_id: currentPoi.id, poi_name: currentPoi.name,
      reaction: currentReaction, reasons, timestamp: new Date().toISOString(),
    }]);
    updatePreferences(currentPoi, currentReaction, reasons);
    setReasonAnim(false);
    setTimeout(() => {
      setSelectedReasons([]); setFreeText(""); setCurrentReaction(null);
      setPhase("swipe"); setCurrentIndex(p => p + 1); setCardKey(k => k + 1);
    }, 200);
  };

  const toggleReason = (tag) => setSelectedReasons(p => p.includes(tag) ? p.filter(t => t !== tag) : [...p, tag]);

  const onPD = (e) => { if (phase === "swipe") { dragStart.current = e.clientX; setIsDragging(true); } };
  const onPM = (e) => { if (isDragging && dragStart.current) setDragX(e.clientX - dragStart.current); };
  const onPU = () => {
    if (!isDragging) return;
    if (dragX > 100) handleReaction("like");
    else if (dragX < -100) handleReaction("dislike");
    setDragX(0); setIsDragging(false); dragStart.current = null;
  };

  const { loves, dislikes } = computePersonaSummary(preferences);
  const rc = (t) => t === "love" ? "#d4566a" : t === "like" ? "#5b9a6a" : "#c48a5a";
  const ri = (t) => t === "love" ? "♥" : t === "like" ? "✓" : "✗";

  const personaJson = {
    persona: {
      reactions_count: reactions.length,
      preferences: {
        loves: loves.map(([t, v]) => ({ tag: t, label: getTag(t), score: +v.score.toFixed(2), count: v.count })),
        dislikes: dislikes.map(([t, v]) => ({ tag: t, label: getTag(t), score: +v.score.toFixed(2), count: v.count })),
      },
      raw_reactions: reactions,
    },
  };

  return (
    <div style={S.root}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,300&family=Instrument+Serif:ital@0;1&display=swap');
        * { box-sizing:border-box; margin:0; padding:0; }
        @keyframes cardIn { from { opacity:0; transform:scale(.93) translateY(16px); } to { opacity:1; transform:none; } }
        @keyframes exitL { to { opacity:0; transform:translateX(-130%) rotate(-12deg); } }
        @keyframes exitR { to { opacity:0; transform:translateX(130%) rotate(12deg); } }
        @keyframes exitU { to { opacity:0; transform:translateY(-80%) scale(.92); } }
        @keyframes slideUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:none; } }
        @keyframes slideOut { to { opacity:0; transform:translateY(-16px); } }
        @keyframes barIn { from { width:0; } }
        @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
        @keyframes chipIn { 0% { opacity:0; transform:scale(.85); } 100% { opacity:1; transform:none; } }
        @keyframes thumbIn { from { opacity:0; transform:scale(.7); } to { opacity:1; transform:none; } }
        @keyframes gentlePulse { 0%,100% { opacity:.03; } 50% { opacity:.08; } }
        @keyframes bgTextScroll { from { transform:translateX(0); } to { transform:translateX(-50%); } }
        @keyframes wallScrollL { from { transform:translateX(0); } to { transform:translateX(-33.33%); } }
        @keyframes wallScrollR { from { transform:translateX(-33.33%); } to { transform:translateX(0); } }
        .ci { animation:cardIn .42s cubic-bezier(.22,1,.36,1) forwards; }
        .el { animation:exitL .32s cubic-bezier(.55,0,1,.45) forwards; }
        .er { animation:exitR .32s cubic-bezier(.55,0,1,.45) forwards; }
        .eu { animation:exitU .32s cubic-bezier(.55,0,1,.45) forwards; }
        .ri { animation:slideUp .32s cubic-bezier(.22,1,.36,1) forwards; }
        .ro { animation:slideOut .2s ease-in forwards; }
        .rb { width:56px; height:56px; border-radius:50%; border:1.5px solid; background:transparent; cursor:pointer; display:flex; align-items:center; justify-content:center; font-size:20px; transition:all .18s; position:relative; z-index:2; }
        .rb:hover { transform:scale(1.14); }
        .rb:active { transform:scale(.92); }
        .rb.big { width:64px; height:64px; font-size:24px; }
        .chip { display:inline-flex; padding:7px 15px; border-radius:20px; font-size:13px; font-family:'DM Sans',sans-serif; cursor:pointer; transition:all .18s; border:1.5px solid transparent; user-select:none; }
        .chip:hover { transform:translateY(-1px); }
        .chip.on { border-color:currentColor; }
        .jt { font-family:'DM Sans',sans-serif; font-size:11px; padding:5px 10px; border-radius:5px; border:1px solid #2a2a2a; background:#141414; color:#666; cursor:pointer; transition:all .18s; letter-spacing:.02em; }
        .jt:hover { color:#aaa; border-color:#444; }
        .sb { font-family:'DM Sans',sans-serif; font-size:14px; font-weight:500; padding:11px 30px; border-radius:24px; border:none; cursor:pointer; transition:all .18s; color:#fff; }
        .sb:hover { transform:translateY(-1px); filter:brightness(1.08); }
        .sk { font-family:'DM Sans',sans-serif; font-size:13px; color:#555; background:none; border:none; cursor:pointer; padding:8px 16px; transition:color .18s; }
        .sk:hover { color:#888; }
        ::-webkit-scrollbar { width:3px; }
        ::-webkit-scrollbar-track { background:transparent; }
        ::-webkit-scrollbar-thumb { background:#222; border-radius:2px; }
      `}</style>

      {/* LEFT PANEL */}
      <div style={S.left}>
        <div style={S.lHead}>
          <div style={{ display:"flex", alignItems:"baseline", gap:8 }}>
            <span style={S.logo}>persona</span>
            <span style={S.logoN}>{reactions.length}/{MOCK_POIS.length}</span>
          </div>
          <button className="jt" onClick={() => setShowJson(!showJson)}>{showJson ? "profile" : "{ }"}</button>
        </div>

        <div style={S.progW}>
          <div style={{ ...S.progF, width:`${(reactions.length/MOCK_POIS.length)*100}%` }} />
        </div>

        {showJson ? (
          <div style={S.jsonW}><pre style={S.jsonP}>{JSON.stringify(personaJson, null, 2)}</pre></div>
        ) : (
          <div style={S.lBody}>
            {reactions.length === 0 ? (
              <div style={S.empty}>
                <div style={S.emptyI}>?</div>
                <p style={S.emptyT}>Like or skip places</p>
                <p style={S.emptyS}>Your profile will appear here</p>
              </div>
            ) : (
              <>
                {loves.length > 0 && (
                  <div style={S.sec}>
                    <div style={S.secT}>loves</div>
                    {loves.map(([tag, val], i) => (
                      <div key={tag} style={{ ...S.row, animation:`fadeIn .3s ${i*40}ms both` }}>
                        <span style={S.rowL}>{getTag(tag)}</span>
                        <div style={S.barBg}>
                          <div style={{ height:5, borderRadius:3, background:"linear-gradient(90deg,#4a8a5a,#7cc08e)", width:`${Math.min(Math.abs(val.score)*75,100)}%`, animation:"barIn .5s cubic-bezier(.22,1,.36,1) forwards" }} />
                        </div>
                        <span style={S.rowN}>{val.count}</span>
                      </div>
                    ))}
                  </div>
                )}
                {dislikes.length > 0 && (
                  <div style={S.sec}>
                    <div style={{ ...S.secT, color:"#b87a5a" }}>dislikes</div>
                    {dislikes.map(([tag, val], i) => (
                      <div key={tag} style={{ ...S.row, animation:`fadeIn .3s ${i*40}ms both` }}>
                        <span style={S.rowL}>{getTag(tag)}</span>
                        <div style={S.barBg}>
                          <div style={{ height:5, borderRadius:3, background:"linear-gradient(90deg,#b87a5a,#daa080)", width:`${Math.min(Math.abs(val.score)*75,100)}%`, animation:"barIn .5s cubic-bezier(.22,1,.36,1) forwards" }} />
                        </div>
                        <span style={S.rowN}>{val.count}</span>
                      </div>
                    ))}
                  </div>
                )}
                <div style={S.sec}>
                  <div style={{ ...S.secT, color:"#555" }}>recent reactions</div>
                  {reactions.slice(-5).reverse().map((r, i) => (
                    <div key={i} style={S.hRow}>
                      <span style={{ color:rc(r.reaction), fontSize:13, width:16 }}>{ri(r.reaction)}</span>
                      <span style={S.hName}>{r.poi_name}</span>
                      {r.reasons.length > 0 && <span style={S.hR}>{r.reasons.slice(0,2).map(getTag).join(", ")}</span>}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>

      {/* RIGHT PANEL */}
      <div style={S.right}>
        <BgSlideshow likedImages={likedImages} />

        {loves.length > 0 && (
          <div style={{
            position:"absolute", top:"50%", left:0, right:0, zIndex:0,
            overflow:"hidden", opacity:0.03, pointerEvents:"none",
            transform:"translateY(-50%) rotate(-3deg)",
          }}>
            <div style={{
              display:"flex", whiteSpace:"nowrap", gap:40,
              animation:"bgTextScroll 30s linear infinite",
              fontFamily:"'Instrument Serif',serif", fontSize:72,
              fontStyle:"italic", color:"#fff",
            }}>
              {[...loves, ...loves, ...loves].map(([tag], i) => (
                <span key={i}>{getTag(tag)}</span>
              ))}
            </div>
          </div>
        )}

        {isFinished ? (
          <div style={{ textAlign:"center", animation:"fadeIn .5s ease", position:"relative", zIndex:2 }}>
            <div style={{ fontSize:42, color:"#5b9a6a", marginBottom:14, fontFamily:"'Instrument Serif',serif" }}>✦</div>
            <h2 style={{ fontFamily:"'Instrument Serif',serif", fontSize:30, fontWeight:400, color:"#e0e0e0", marginBottom:8, fontStyle:"italic" }}>Profile Ready</h2>
            <p style={{ fontSize:14, color:"#666", marginBottom:36 }}>You reviewed {reactions.length} places</p>
            <div style={{ display:"flex", gap:48, justifyContent:"center" }}>
              {[["loves",loves.length,"#5b9a6a"],["dislikes",dislikes.length,"#b87a5a"]].map(([l,n,c]) => (
                <div key={l} style={{ textAlign:"center" }}>
                  <div style={{ fontFamily:"'Instrument Serif',serif", fontSize:40, color:c, fontStyle:"italic" }}>{n}</div>
                  <div style={{ fontSize:12, color:"#555", marginTop:2 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        ) : phase === "swipe" ? (
          <div style={{ ...S.cardArea, position:"relative", zIndex:2 }}>
            <div style={S.dots}>
              {MOCK_POIS.map((_, i) => (
                <div key={i} style={{
                  width: i===currentIndex ? 18 : 5, height:5, borderRadius:3,
                  background: i<currentIndex ? (reactions[i]?.reaction==="dislike" ? "#b87a5a" : "#5b9a6a") : i===currentIndex ? "#ddd" : "rgba(255,255,255,0.08)",
                  transition:"all .3s ease",
                }} />
              ))}
            </div>

            <div
              key={cardKey}
              className={cardAnim==="exit-left"?"el":cardAnim==="exit-right"?"er":cardAnim==="exit-up"?"eu":"ci"}
              style={{
                ...S.card,
                transform: isDragging ? `translateX(${dragX}px) rotate(${dragX*0.04}deg)` : undefined,
                transition: isDragging ? "none" : undefined,
              }}
              onPointerDown={onPD} onPointerMove={onPM} onPointerUp={onPU} onPointerLeave={onPU}
            >
              {isDragging && Math.abs(dragX) > 50 && (
                <div style={{
                  position:"absolute", inset:0, zIndex:10, borderRadius:14,
                  background: dragX>0 ? "rgba(91,154,106,.12)" : "rgba(196,138,90,.12)",
                  border:`2px solid ${dragX>0?"#5b9a6a":"#c48a5a"}`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                }}>
                  <span style={{ fontSize:36, color: dragX>0?"#5b9a6a":"#c48a5a" }}>{dragX>0?"✓":"✗"}</span>
                </div>
              )}
              <div style={S.imgW}>
                <img src={currentPoi.image} alt="" style={S.img} draggable={false} />
                <div style={S.imgG} />
                <div style={S.loc}>{currentPoi.city}, {currentPoi.country}</div>
              </div>
              <div style={S.cBody}>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:6 }}>
                  <h2 style={S.cTitle}>{currentPoi.name}</h2>
                  <div style={{ display:"flex", gap:8, alignItems:"center", flexShrink:0 }}>
                    <span style={{ fontSize:13, color:"#c9a84c", fontWeight:500 }}>★ {currentPoi.rating}</span>
                    <span style={{ fontSize:12, color:"#555" }}>{priceLbl[currentPoi.price]}</span>
                  </div>
                </div>
                <p style={S.cDesc}>{currentPoi.description}</p>
                <div style={S.cTags}>
                  {[...currentPoi.tags.slice(0,4),...(currentPoi.vibe||[]).slice(0,2)].map(t => (
                    <span key={t} style={S.cTag}>{getTag(t)}</span>
                  ))}
                </div>
                {currentPoi.hours && <div style={S.cHours}>{currentPoi.hours}</div>}
              </div>
            </div>

            <div style={S.btnRow}>
              <button className="rb" style={{ borderColor:"#c48a5a", color:"#c48a5a" }} onClick={() => handleReaction("dislike")}>✗</button>
              <button className="rb big" style={{ borderColor:"#d4566a", color:"#d4566a" }} onClick={() => handleReaction("love")}>♥</button>
              <button className="rb" style={{ borderColor:"#5b9a6a", color:"#5b9a6a" }} onClick={() => handleReaction("like")}>✓</button>
            </div>
            <div style={{ display:"flex", gap:24, justifyContent:"center", fontSize:10, color:"rgba(255,255,255,0.12)", marginTop:-8, position:"relative", zIndex:2 }}>
              <span>nope</span><span>love it</span><span>nice</span>
            </div>
          </div>
        ) : (
          <div className={reasonAnim?"ri":"ro"} style={{ ...S.rBox, position:"relative", zIndex:2 }}>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:20 }}>
              <span style={{ color:rc(currentReaction), fontSize:18 }}>{ri(currentReaction)}</span>
              <span style={S.rTitle}>{currentPoi.name}</span>
            </div>
            <p style={S.rQ}>{currentReaction==="dislike" ? "Why didn't you like it?" : "What did you like about it?"}</p>
            <div style={S.chips}>
              {[...(currentPoi.tags||[]),...(currentPoi.vibe||[])].map((tag,i) => {
                const on = selectedReasons.includes(tag);
                const neg = currentReaction === "dislike";
                return (
                  <span key={tag} className={`chip ${on?"on":""}`}
                    style={{
                      background: on ? (neg?"rgba(184,122,90,.12)":"rgba(91,154,106,.12)") : "rgba(255,255,255,.03)",
                      color: on ? (neg?"#daa080":"#7cc08e") : "#777",
                      animation:`chipIn .25s ${i*35}ms both`,
                    }}
                    onClick={() => toggleReason(tag)}
                  >{getTag(tag)}</span>
                );
              })}
            </div>
            <input style={S.fIn} placeholder="or type your own reason..." value={freeText}
              onChange={e => setFreeText(e.target.value)}
              onKeyDown={e => e.key==="Enter" && commitReaction(true)} />
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginTop:24 }}>
              <button className="sk" onClick={() => commitReaction(false)}>skip</button>
              <button className="sb" style={{ background:currentReaction==="dislike"?"#b87a5a":"#5b9a6a" }} onClick={() => commitReaction(true)}>save</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

const S = {
  root: { display:"flex", height:"100vh", width:"100%", fontFamily:"'DM Sans',sans-serif", background:"#0c0c0c", color:"#ddd", overflow:"hidden" },
  left: { width:300, minWidth:300, background:"#101010", borderRight:"1px solid #1a1a1a", display:"flex", flexDirection:"column", zIndex:3 },
  lHead: { padding:"18px 18px 0", display:"flex", justifyContent:"space-between", alignItems:"center" },
  logo: { fontFamily:"'Instrument Serif',serif", fontSize:21, fontStyle:"italic", color:"#ddd", letterSpacing:"-0.01em" },
  logoN: { fontSize:11, color:"#444" },
  progW: { margin:"14px 18px 0", height:2, background:"#1a1a1a", borderRadius:1, overflow:"hidden" },
  progF: { height:"100%", background:"linear-gradient(90deg,#4a8a5a,#7cc08e)", borderRadius:1, transition:"width .4s ease" },
  lBody: { flex:1, overflowY:"auto", padding:"14px 18px 18px" },
  empty: { display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:"100%", opacity:.45 },
  emptyI: { fontSize:36, fontFamily:"'Instrument Serif',serif", fontStyle:"italic", color:"#333", marginBottom:12 },
  emptyT: { fontSize:13, color:"#555" },
  emptyS: { fontSize:11, color:"#333", marginTop:4 },
  sec: { marginBottom:22 },
  secT: { fontSize:10, fontWeight:500, textTransform:"uppercase", letterSpacing:".12em", color:"#5b9a6a", marginBottom:10 },
  row: { display:"flex", alignItems:"center", gap:8, marginBottom:7, opacity:0 },
  rowL: { fontSize:12, color:"#aaa", width:80, flexShrink:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" },
  barBg: { flex:1, height:5, background:"#161616", borderRadius:3, overflow:"hidden" },
  rowN: { fontSize:10, color:"#444", width:18, textAlign:"right", flexShrink:0 },
  hRow: { display:"flex", alignItems:"center", gap:7, marginBottom:5 },
  hName: { fontSize:12, color:"#888" },
  hR: { fontSize:10, color:"#444", marginLeft:"auto", maxWidth:90, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" },
  jsonW: { flex:1, overflowY:"auto", padding:"10px 18px" },
  jsonP: { fontSize:10, fontFamily:"'SF Mono','Fira Code',monospace", color:"#5a8a5a", lineHeight:1.5, whiteSpace:"pre-wrap", wordBreak:"break-all" },
  right: { flex:1, display:"flex", alignItems:"center", justifyContent:"center", padding:36, position:"relative", overflow:"hidden" },
  cardArea: { display:"flex", flexDirection:"column", alignItems:"center", gap:22, width:"100%", maxWidth:400 },
  dots: { display:"flex", gap:5, justifyContent:"center" },
  card: { width:"100%", background:"rgba(21,21,21,0.92)", backdropFilter:"blur(20px)", borderRadius:14, overflow:"hidden", boxShadow:"0 6px 36px rgba(0,0,0,.45), 0 0 0 1px rgba(255,255,255,0.04)", cursor:"grab", position:"relative", userSelect:"none", touchAction:"none" },
  imgW: { position:"relative", width:"100%", height:250, overflow:"hidden" },
  img: { width:"100%", height:"100%", objectFit:"cover" },
  imgG: { position:"absolute", bottom:0, left:0, right:0, height:90, background:"linear-gradient(transparent,rgba(21,21,21,0.92))" },
  loc: { position:"absolute", top:12, left:14, fontSize:11, color:"rgba(255,255,255,.65)", background:"rgba(0,0,0,.35)", backdropFilter:"blur(6px)", padding:"3px 9px", borderRadius:10 },
  cBody: { padding:"10px 18px 18px" },
  cTitle: { fontFamily:"'Instrument Serif',serif", fontSize:22, fontWeight:400, color:"#eee", fontStyle:"italic", lineHeight:1.2 },
  cDesc: { fontSize:13, color:"#888", lineHeight:1.55, marginBottom:12 },
  cTags: { display:"flex", flexWrap:"wrap", gap:5, marginBottom:8 },
  cTag: { fontSize:10, color:"#666", background:"rgba(255,255,255,.03)", padding:"3px 9px", borderRadius:8 },
  cHours: { fontSize:10, color:"#444" },
  btnRow: { display:"flex", gap:18, alignItems:"center", justifyContent:"center" },
  rBox: { width:"100%", maxWidth:460, padding:28 },
  rTitle: { fontFamily:"'Instrument Serif',serif", fontSize:20, fontWeight:400, color:"#ddd", fontStyle:"italic" },
  rQ: { fontSize:14, color:"#777", marginBottom:18 },
  chips: { display:"flex", flexWrap:"wrap", gap:7, marginBottom:22 },
  fIn: { width:"100%", padding:"11px 15px", background:"rgba(255,255,255,.03)", border:"1px solid #222", borderRadius:10, color:"#bbb", fontSize:13, fontFamily:"'DM Sans',sans-serif", outline:"none" },
};