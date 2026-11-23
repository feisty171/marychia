/**
 * Treatment data for the Treatments, Rituals and Gallery pages.
 * - Page settings (hero, tiles, banners, budget/time pills, photos): src/data/treatments.json
 * - Treatments, concerns and collections: src/data/treatment-menu.json, made from the
 *   menu workbook by `npm run build:treatments`.
 */
import settings from "../data/treatments.json";
import menu from "../data/treatment-menu.json";

export const treatmentData = {
  ...settings,
  treatments: menu.treatments,
  collections: menu.collections,
  filters: { ...settings.filters, concerns: menu.concerns },
};
