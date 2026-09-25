# Jisho content

Decks and themes for the Jisho app. Push to `main`, then:

- run `scripts/publish-site.sh` from the app repo to publish it to the Jisho
  site (GitHub Pages, the `gh-pages` branch of this repo; see
  `docs/hosting.md` there)
- apps pick it up the next time they open

## Add a deck

```
decks/<deck-id>/deck.json
decks/<deck-id>/cards.csv
```

`deck.json`:

```json
{ "id": "<deck-id>", "name": "My deck", "description": "…", "version": 1, "cards": "cards.csv" }
```

`cards.csv` columns: `expression,reading,meaning,notes,tags` (header optional;
reading/meaning may be left empty — the app fills them from the dictionary).

**Bump `version`** whenever you change a deck so apps re-download it. Study
progress is kept for cards whose expression + reading didn't change.

## Add a theme

```
themes/<theme-id>/theme.json
themes/<theme-id>/assets/…   (optional images, fonts, sounds)
```

See `private-template/themes/samurai/theme.json` in the app repo for every field. Themes are data only
(colours, fonts, radius, images) — no CSS or JavaScript — so a theme can
never break or compromise the app. Asset paths are relative to the theme
folder. Available asset slots: `background`, `cardBack`, `pattern`,
`flipSound`, `correctSound`; fonts go in `fontFaces`.

Bump `version` to push an update to installed themes.

## Validation

Check your changes before pushing. From the app repo:

```
npm run validate -w @jisho/server -- ../jisho-content
```

## License

Decks here are CC BY-SA 4.0 (see `LICENSE`): their readings and meanings come
from JMdict, which is CC BY-SA 4.0. Only add content you wrote yourself or
that's under a compatible license, and no game or other copyrighted art in
themes.
