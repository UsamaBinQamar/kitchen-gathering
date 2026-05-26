Update the `/browse` page filter bar:

1. **Cuisine dropdown** — populate from the shared `CUISINE_OPTIONS` constant (the same list used on the recipe create/edit form) instead of distinct values from the currently loaded recipes.
2. **Meal type dropdown** — populate from the shared `MEAL_TYPE_OPTIONS` constant the same way.
3. **Tags filter** — replace the multi-select chip UI with a single text input. A recipe matches when at least one of its tags contains the entered text (case-insensitive substring match).

**Technical details:**
- Import `CUISINE_OPTIONS` and `MEAL_TYPE_OPTIONS` from wherever `recipes.new.tsx` imports them, and reuse for the browse dropdowns.
- Remove the `useMemo` derivations of `cuisines` / `meals` / `allTags` (no longer needed).
- Change the `tags: string[]` URL search param to `tag: string` (single text query). Update `BrowseSearch`, `validateSearch`, `clearAll`, and `hasFilters`.
- Replace the tag-chip block with an `Input` labelled "Tag" using a substring match: `(r.tags ?? []).some(t => t.toLowerCase().includes(tag.toLowerCase()))`.
- Keep the existing title search field, layout, and styling.