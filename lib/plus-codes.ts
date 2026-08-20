// Open Location Code (Google Plus Code) Decoder & Resolver
import { OpenLocationCode } from "open-location-code";
import type { SearchLocationResult } from "@/components/map/MapLocationSearch";

const olc = new OpenLocationCode();

// Matches Plus Codes like "JX24+WXR, Nyeri", "6G9PJX24+WXR", or "JX24+WXR Nyeri Kenya"
const PLUS_CODE_REGEX =
  /\b([23456789CFGHJMPQRVWXcfghjmpqrvwx]{2,8}\+[23456789CFGHJMPQRVWXcfghjmpqrvwx]{2,4})(?:[,\s]+(.*))?$/i;

export async function resolvePlusCode(
  query: string,
  currentCenter: [number, number] = [0, 20]
): Promise<SearchLocationResult | null> {
  const trimmed = query.trim();
  const match = trimmed.match(PLUS_CODE_REGEX);
  if (!match) return null;

  const rawCode = match[1].toUpperCase();
  const locality = match[2]?.trim();

  try {
    // 1. Full Plus Code (e.g. "6GFRJX24+WXR")
    if (olc.isFull(rawCode)) {
      const decoded = olc.decode(rawCode);
      return {
        id: `pluscode-${rawCode}`,
        name: `Plus Code: ${rawCode}`,
        subtext: locality ? `Google Plus Code (${locality})` : "Global Google Plus Code",
        center: [decoded.longitudeCenter, decoded.latitudeCenter],
        zoom: 16,
        categoryBadge: "Plus Code",
      };
    }

    // 2. Short Plus Code with locality (e.g. "JX24+WXR, Nyeri")
    if (olc.isShort(rawCode)) {
      let refLat = currentCenter[1];
      let refLng = currentCenter[0];

      // Geocode the locality if provided
      if (locality && locality.length >= 2) {
        try {
          const locRes = await fetch(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
              locality
            )}&limit=1`
          );
          if (locRes.ok) {
            const locData = await locRes.json();
            if (Array.isArray(locData) && locData.length > 0) {
              refLat = parseFloat(locData[0].lat);
              refLng = parseFloat(locData[0].lon);
            }
          }
        } catch {
          // fallback to reference center
        }
      }

      const fullCode = olc.recoverNearest(rawCode, refLat, refLng);
      const decoded = olc.decode(fullCode);

      return {
        id: `pluscode-${fullCode}`,
        name: `${rawCode}${locality ? `, ${locality}` : ""}`,
        subtext: `Google Plus Code • Decoded to ${fullCode}`,
        center: [decoded.longitudeCenter, decoded.latitudeCenter],
        zoom: 16,
        categoryBadge: "Plus Code",
      };
    }
  } catch (err) {
    console.warn("Plus code decode error:", err);
  }

  return null;
}
