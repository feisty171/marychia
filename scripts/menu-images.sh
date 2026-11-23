#!/bin/sh
# Turns the full treatment menu PDF into one image per page for the /menu/ page.
# Run this after replacing public/menu/full-spa-menu.pdf:
#
#   sh scripts/menu-images.sh
#
# Needs Ghostscript (gs) and ImageMagick (magick): brew install ghostscript imagemagick
set -e

cd "$(dirname "$0")/.."
PDF="public/menu/full-spa-menu.pdf"
OUT="public/menu/pages"
TMP="$(mktemp -d)"

if [ ! -f "$PDF" ]; then echo "Can't find $PDF"; exit 1; fi
mkdir -p "$OUT"

# Remove the previous page images (only page-NN.webp files in public/menu/pages)
find "$OUT" -maxdepth 1 -type f -name 'page-*.webp' -delete

# 1. PDF pages -> PNG at 150 dpi (about 1240 px wide for A4)
gs -q -dNOPAUSE -dBATCH -dSAFER -sDEVICE=png16m -r150 \
   -dTextAlphaBits=4 -dGraphicsAlphaBits=4 \
   -sOutputFile="$TMP/page-%02d.png" "$PDF"

# 2. PNG -> WebP, 1240 px wide
for f in "$TMP"/page-*.png; do
  name="$(basename "$f" .png)"
  magick "$f" -resize '1240x>' -strip -quality 82 "$OUT/$name.webp"
done

find "$TMP" -type f -name 'page-*.png' -delete
rmdir "$TMP"

COUNT=$(find "$OUT" -maxdepth 1 -name 'page-*.webp' | wc -l | tr -d ' ')
echo "Made $COUNT page images in $OUT"
