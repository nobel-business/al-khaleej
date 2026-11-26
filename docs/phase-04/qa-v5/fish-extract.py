"""Isolate the three fish of the official Alkhaleej symbol from the brand book (DATA/AL KHALEEJ BD.pdf, page 11 of 35
— 'Icon · Safe-Space', the largest rendering in the book, 413 px) and trace each one to an SVG path.
Nothing is redrawn: the outline is the 0.5 iso-line of the original anti-aliased pixels, super-sampled 8x."""
import io, json, fitz, numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage
from skimage import measure

PDF = r"D:\IMPORTANT\NOBEL Buiseness\AL khaleej\DATA\AL KHALEEJ BD.pdf"   # opened read-only
doc = fitz.open(PDF); x = doc[10].get_images(full=True)[0][0]
page = np.asarray(Image.open(io.BytesIO(doc.extract_image(x)["image"])).convert("RGB")).astype(float)
X0, Y0, X1, Y1 = 735, 327, 1172, 755                       # symbol + margin (navy guide lines excluded by colour below)
a = page[Y0:Y1, X0:X1]; R, G, B = a[..., 0], a[..., 1], a[..., 2]
# coverage of brand orange over white: the blue channel falls 255 -> ~6; navy guides (low red) are rejected
alpha = np.clip((255 - B) / (255 - 8), 0, 1) * np.clip((R - 60) / (226 - 60), 0, 1)
alpha[alpha < 0.04] = 0
lab, n = ndimage.label(alpha > 0.5)
sizes = ndimage.sum(np.ones_like(lab), lab, range(1, n + 1)); keep = np.argsort(sizes)[::-1][:3] + 1
print("components", n, "kept sizes", sorted(sizes, reverse=True)[:5])
orange = np.median(a[(alpha > 0.97)], axis=0); print("measured orange", "#%02X%02X%02X" % tuple(int(v) for v in orange))

S = 8; fish = []
for li in keep:
    m = ndimage.binary_dilation(lab == li, iterations=2)
    fa = alpha * m
    up = np.asarray(Image.fromarray((fa * 255).astype(np.uint8)).resize((fa.shape[1] * S, fa.shape[0] * S), Image.BICUBIC)).astype(float) / 255
    cs = measure.find_contours(np.pad(up, 2), 0.5)
    paths = []
    for c in cs:
        if len(c) < 40: continue
        c = measure.approximate_polygon(c, tolerance=0.6)       # 0.6 super-px = 0.075 original px
        pts = [((p[1] - 2) / S, (p[0] - 2) / S) for p in c]
        paths.append(pts)
    ys, xs = np.nonzero(fa > 0.5)
    cy, cx = ndimage.center_of_mass(fa)
    fish.append({"paths": paths, "bbox": [int(xs.min()), int(ys.min()), int(xs.max()) + 1, int(ys.max()) + 1], "c": [cx, cy], "area": float(fa.sum())})

# identify each fish by its position (top / left / bottom-right) for stable naming
fish.sort(key=lambda f: (f["c"][1] > 200, f["c"][0]))          # top first, then left, then bottom-right
names = ["top", "left", "bottom"]
SYM = {"w": int(alpha.shape[1]), "h": int(alpha.shape[0]), "fish": []}
for nm, f in zip(names, fish):
    d = " ".join("M" + " L".join(f"{p[0]:.2f},{p[1]:.2f}" for p in pts) + "Z" for pts in f["paths"])
    SYM["fish"].append({"name": nm, "d": d, "bbox": f["bbox"], "c": [round(f["c"][0], 2), round(f["c"][1], 2)], "subpaths": len(f["paths"])})
    # fidelity: rasterise the traced path and compare with the original coverage
    im = Image.new("L", (alpha.shape[1] * 4, alpha.shape[0] * 4), 0); dr = ImageDraw.Draw(im)
    outer = max(f["paths"], key=lambda p: len(p))
    for pts in f["paths"]: dr.polygon([(p[0] * 4, p[1] * 4) for p in pts], fill=255 if pts is outer else 0)
    tr = np.asarray(im.resize((alpha.shape[1], alpha.shape[0]), Image.BOX)).astype(float) / 255
    orig = (alpha * ndimage.binary_dilation(lab == keep[fish.index(f)], iterations=2)) if False else None
    SYM["fish"][-1]["_tr"] = tr
# IoU per fish against the original (hard 0.5 masks)
for f, li in zip(SYM["fish"], [k for k in keep]):
    pass
masks = {nm: None for nm in names}
for nm, f in zip(names, fish):
    pass
json.dump({"w": SYM["w"], "h": SYM["h"], "fish": [{k: v for k, v in f.items() if k != "_tr"} for f in SYM["fish"]]}, open("fish.json", "w"), indent=1)
# overall fidelity: union of traced fish vs original symbol
tr_all = np.clip(sum(f["_tr"] for f in SYM["fish"]), 0, 1)
o = alpha > 0.5; t = tr_all > 0.5
print("IoU traced vs original symbol: %.4f   pixel disagreement: %d of %d" % ((o & t).sum() / (o | t).sum(), (o ^ t).sum(), o.sum()))
for f in SYM["fish"]: print(f["name"], "bbox", f["bbox"], "centre", f["c"], "subpaths", f["subpaths"], "path chars", len(f["d"]))
Image.fromarray((np.stack([o, t, np.zeros_like(o)], -1) * 255).astype(np.uint8)).resize((alpha.shape[1] * 2, alpha.shape[0] * 2), Image.NEAREST).save("fidelity.png")
