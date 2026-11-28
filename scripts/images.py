"""Responsive image pipeline for the Alkhaleej site.

Usage:  npm run images   (python -I scripts/images.py)
Reads sources from src/assets/images/{ai,commons}, writes AVIF/WebP/JPEG variants to
public/img/ (committed; copied into dist/ by the build) and a manifest to src/assets/images/manifest.json (consumed by src/lib/media.mjs).
Already-generated variants are skipped, so re-runs are fast.
"""
import json, os, sys
from PIL import Image

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, "..", "src", "assets", "images")
OUT = os.path.join(HERE, "..", "public", "img")
os.makedirs(OUT, exist_ok=True)

# name: (source, widths, focal "x% y%", kind, crop as fractions (l,t,r,b) or None)
SPEC = {
    # --- AI visualisations (labelled "Illustrative visualisation" on the site)
    "hero-dawn":      ("ai/hero-dawn.png",      [640, 960, 1280, 1920, 2560, 3200, 3840], "62% 50%", "ai", None),
    "hero-sea":       ("ai/hero-sea.png",       [640, 960, 1280, 1920, 2560, 3200, 3840], "62% 50%", "ai", None),
    "jar-60":         ("ai/jar-a.png",          [480, 720, 1080, 1536],                   "50% 60%", "ai", None),
    "jar-65":         ("ai/jar-b.png",          [480, 720, 1080, 1536],                   "50% 60%", "ai", None),
    "jar-72":         ("ai/jar-c.png",          [480, 720, 1080, 1536],                   "50% 60%", "ai", None),
    "jar-62":         ("ai/jar-d.png",          [480, 720, 1080],                         "50% 60%", "ai", None),
    "jar-66":         ("ai/jar-e.png",          [480, 720, 1080],                         "50% 60%", "ai", None),
    "m-centrifuge":   ("ai/m-centrifuge.png",   [640, 1024, 1280],                        "50% 55%", "ai", None),
    "m-plant":        ("ai/m-plant.jpg",        [640, 1024, 1280],                        "30% 50%", "ai", None),   # client-supplied plant photo
    "rw-hero":        ("ai/rw-hero.jpg",           [640, 1024, 1600, 2400, 3072],     "50% 62%", "ai", None),   # Raw Materials hero — the catch on deck at first light
    "rw-fish":        ("ai/rw-fish.jpg",           [640, 1024, 1600],                 "50% 50%", "ai", None),   # Raw Materials — fresh fish on ice
    "rw-sardine":     ("ai/rw-sardine.jpg",        [640, 1024, 1600],                 "50% 55%", "ai", None),   # Raw Materials — sardine
    "rw-pelagic":     ("ai/rw-pelagic.jpg",        [640, 1024, 1600],                 "50% 55%", "ai", None),   # Raw Materials — pelagic school
    "rw-other":       ("ai/rw-other.jpg",          [640, 1024, 1600],                 "50% 55%", "ai", None),   # Raw Materials — other species
    "rw-illus":       ("ai/rw-illus.jpg",          [640, 1024, 1600, 2400, 3072],     "50% 50%", "ai", None),   # Raw Materials — sardine illustration (nutrition)
    "rw-s1":          ("ai/rw-s1.jpg",             [640, 1024, 1600],                 "50% 60%", "ai", None),   # Raw Materials journey — the haul
    "rw-s2":          ("ai/rw-s2.jpg",             [640, 1024, 1600],                 "50% 60%", "ai", None),   # Raw Materials journey — the harbour
    "rw-s3":          ("ai/rw-s3.jpg",             [640, 1024, 1600],                 "50% 60%", "ai", None),   # Raw Materials journey — cold storage
    "rw-s4":          ("ai/rw-s4.jpg",             [640, 1024, 1600],                 "50% 60%", "ai", None),   # Raw Materials journey — chilled transport
    "rw-s5":          ("ai/rw-s5.jpg",             [640, 1024, 1600],                 "50% 55%", "ai", None),   # Raw Materials journey — receiving
    "rw-quality":     ("ai/rw-quality.jpg",        [640, 1024, 1600],                 "50% 50%", "ai", None),   # Raw Materials — quality inspection
    "ab-sea":         ("ai/ab-sea.jpg",         [640, 1024, 1600, 2400, 3072],            "50% 55%", "ai", None),   # About hero — sea at first light
    "ab-ind":         ("ai/ab-ind.jpg",         [640, 1024, 1600, 2400, 3072],            "50% 55%", "ai", None),   # About hero — processing hall
    "ab-who":         ("ai/ab-who.jpg",         [640, 1024, 1600],                        "55% 55%", "ai", None),   # About — production line
    "ab-horizon":     ("ai/ab-horizon.jpg",     [640, 1024, 1600, 2400, 3072],            "50% 60%", "ai", None),   # About — looking ahead
    "lab-qc":         ("ai/lab-qc.jpg",         [640, 1024, 1280],                        "50% 55%", "ai", None),   # client-supplied quality lab
    "meal-oil":       ("ai/meal-oil.png",       [640, 1024, 1536],                        "45% 58%", "ai", None),   # client-supplied
    "oil-beaker":     ("ai/oil-beaker.png",     [480, 636],                               "55% 4%", "ai", None),   # client-supplied (from mockup)
    "two-products":   ("ai/two-products.png",   [640, 1024, 1280],                        "50% 55%", "ai", None),
    "oil-flask":      ("ai/oil-flask.png",      [480, 720, 1080, 1536],                         "50% 60%", "ai", None),
    "powder-pressed": ("ai/powder-pressed.png", [640, 1024, 1600, 2048],            "40% 55%", "ai", None),
    "powder-flow":    ("ai/powder-flow.png",    [640, 1024, 1664],                  "50% 55%", "ai", None),
    "powder-hall":    ("ai/powder-hall.png",    [640, 1024, 1600, 2048],            "50% 60%", "ai", None),
    "oil-pour":       ("ai/oil-pour.png",       [640, 1024, 1664],                  "45% 50%", "ai", None),
    "oil-tanks":      ("ai/oil-tanks.png",      [640, 1024, 1600, 2048],            "30% 55%", "ai", None),
    "aerial":         ("ai/aerial.png",         [640, 1024, 1600, 2048],            "50% 50%", "ai", None),
    "sardine-spiral": ("ai/sardine-spiral.png", [640, 1024, 1600, 2048],            "50% 45%", "ai", None),
    "net-haul":       ("ai/net-haul.png",       [640, 1024, 1664],                         "50% 50%", "ai", None),
    "steam":          ("ai/steam.png",          [640, 1024, 1600, 2400, 3200, 3840],      "65% 45%", "ai", None),
    "sacks":          ("ai/sacks.png",          [640, 1024, 1600, 2048],                        "45% 60%", "ai", None),
    # --- Real photographs, Wikimedia Commons (open licence, attributed on site + /credits/)
    "sardines-load":  ("commons/sardines-trawler-load.jpg",  [640, 1024, 1600, 2400, 3200, 3840], "50% 55%", "photo", None),
    "sardines-baskets": ("commons/sardines-baskets-port.jpg", [640, 1024, 1600, 2400, 3200],     "50% 50%", "photo", None),
    "sardines-stack": ("commons/sardines-baskets-stack.jpg", [640, 1024, 1600, 2400, 3200],      "50% 50%", "photo", None),
    "trawler":        ("commons/trawler-at-sea.jpg",         [640, 1024, 1600, 2400, 3200, 3840], "50% 50%", "photo", None),
    "med-boats":      ("commons/med-boats-alexandria.jpg",   [640, 1024, 1600, 2400, 3200, 3840], "50% 55%", "photo", None),
    "unloading":      ("commons/harbour-unloading.jpg",      [640, 1024, 1600, 2400, 3200, 3840], "50% 60%", "photo", None),
    "crates":         ("commons/port-fish-crates.jpg",       [640, 1024, 1600, 2400, 3200],      "50% 50%", "photo", None),
    # --- Phase 04 chapter imagery (AI, illustrative)
    "m-receiving":    ("ai/m-receiving.png",    [640, 1024, 1600, 2048],            "45% 55%", "ai", None),
    "m-conveyor":     ("ai/m-conveyor.png",     [640, 1024, 1600, 2048],            "55% 55%", "ai", None),
    "m-cooker":       ("ai/m-cooker.png",       [640, 1024, 1600, 2048],            "45% 55%", "ai", None),
    "m-press":        ("ai/m-press.png",        [640, 1024, 1600, 2048],            "60% 55%", "ai", None),
    "m-separation":   ("ai/m-separation.png",   [640, 1024, 1600, 2048],            "45% 50%", "ai", None),
    "m-cooling":      ("ai/m-cooling.png",      [640, 1024, 1600, 2048],            "50% 60%", "ai", None),
    "m-packing":      ("ai/m-packing.png",      [640, 1024, 1600, 2048],            "40% 55%", "ai", None),
    "q-sampling":     ("ai/q-sampling.png",     [640, 1024, 1600, 2048],            "50% 55%", "ai", None),
    "l-loading":      ("ai/l-loading.png",      [640, 1024, 1600, 2048],            "45% 55%", "ai", None),
    "l-drums":        ("ai/l-drums.png",        [640, 1024, 1600, 2048],            "55% 60%", "ai", None),
    "f-sieve":        ("ai/f-sieve.png",        [640, 1024, 1664],                  "50% 50%", "ai", None),
    "dryer":          ("commons/rotary-dryer-industrial.jpg", [640, 1024, 1600, 2400, 3200], "60% 50%", "photo", None),
    "lab":            ("commons/lab-spectrometer.jpg",        [640, 1024, 1600, 1920],       "45% 55%", "photo", None),
    "boats-dusk":     ("commons/boats-sunrise.jpg",           [640, 1024, 1600, 2400, 3200], "55% 60%", "photo", None),
    "sunrise-sea":    ("commons/boat-sunrise-sea.jpg",        [640, 1024, 1600, 2400, 3200], "50% 50%", "photo", None),
    "harbour-vessel": ("commons/fishing-vessel-harbour.jpg",  [640, 1024, 1600, 2400, 3200], "50% 55%", "photo", None),
}
Q = {"avif": 52, "webp": 80, "jpg": 82}

def main():
    lic = {}
    lp = os.path.join(SRC, "commons", "_licenses.json")
    if os.path.exists(lp):
        lic = json.load(open(lp, encoding="utf-8"))
    rev = {"commons/" + k + ".jpg": v for k, v in lic.items()}
    manifest = {}
    for name, (src, widths, focal, kind, crop) in SPEC.items():
        p = os.path.join(SRC, src)
        if not os.path.exists(p):
            print("MISSING", src, file=sys.stderr); continue
        im = Image.open(p).convert("RGB")
        if crop:
            W, H = im.size; im = im.crop((int(W*crop[0]), int(H*crop[1]), int(W*crop[2]), int(H*crop[3])))
        W, H = im.size
        ws = sorted({min(w, W) for w in widths})
        for w in ws:
            h = round(H * w / W)
            base = os.path.join(OUT, f"{name}-{w}")
            todo = [f for f in ("avif", "webp", "jpg") if not os.path.exists(f"{base}.{f}")]
            if not todo: continue
            r = im.resize((w, h), Image.LANCZOS)
            for f in todo:
                if f == "avif": r.save(base + ".avif", quality=Q[f], speed=6)
                elif f == "webp": r.save(base + ".webp", quality=Q[f], method=5)
                else: r.save(base + ".jpg", quality=Q[f], optimize=True, progressive=True)
        entry = {"w": W, "h": H, "widths": ws, "focal": focal, "kind": kind}
        if kind == "photo":
            m = rev.get(src, {})
            entry["credit"] = {k: m.get(k, "") for k in ("artist", "license", "licenseUrl", "page", "title", "desc")}
        manifest[name] = entry
        print(name, W, "x", H, ws, flush=True)
    json.dump(manifest, open(os.path.join(SRC, "manifest.json"), "w", encoding="utf-8"), ensure_ascii=False, indent=1)
    print("manifest:", len(manifest))

if __name__ == "__main__":
    main()
