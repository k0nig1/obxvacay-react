import { createElement } from "react";
import { renderToString } from "react-dom/server";
import { Trees, Landmark, Building2, Fish, Sun, Castle, Drama, Leaf, Mountain, Route, Footprints, Anchor, Sailboat, LucidePalmtree, Home, GlassWater, Waves, Beer, MapPin } from "lucide-react";
import { MapItemCategory as ImportedMapItemCategory } from "./MapItemCategory";

// Map React components to categories
const MapCategoryIcons = {
  [ImportedMapItemCategory.Beach]: Sun,
  [ImportedMapItemCategory.Lighthouse]: Landmark,
  [ImportedMapItemCategory.Landmark]: Building2,
  [ImportedMapItemCategory.Park]: Trees,
  [ImportedMapItemCategory.Museum]: Castle,
  [ImportedMapItemCategory.HistoricSite]: Landmark,
  [ImportedMapItemCategory.Theater]: Drama,
  [ImportedMapItemCategory.Garden]: Leaf,
  [ImportedMapItemCategory.WildlifeRefuge]: Mountain,
  [ImportedMapItemCategory.ScenicDrive]: Route,
  [ImportedMapItemCategory.Boardwalk]: Footprints,
  [ImportedMapItemCategory.Pier]: Anchor,
  [ImportedMapItemCategory.Aquarium]: Fish,
  [ImportedMapItemCategory.Tour]: MapPin,
  [ImportedMapItemCategory.Resort]: Building2,
  [ImportedMapItemCategory.Marina]: Sailboat,
  [ImportedMapItemCategory.Island]: LucidePalmtree,
  [ImportedMapItemCategory.Village]: Home,
  [ImportedMapItemCategory.Distillery]: Beer,
  [ImportedMapItemCategory.WaterSports]: Waves,
};

// Convert SVG to Base64 dynamically
export const getCategoryIconBase64 = (category: keyof typeof MapCategoryIcons) => {
  const IconComponent = MapCategoryIcons[category] || Landmark; // Default icon
  const svgString = renderToString(createElement(IconComponent, { size: 32 })); // Convert to SVG string
  const base64 = btoa(unescape(encodeURIComponent(svgString))); // Encode as base64
  return `data:image/svg+xml;base64,${base64}`;
};

export type LocalMapItemCategory = keyof typeof MapCategoryIcons;