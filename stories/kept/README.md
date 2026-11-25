# kept

A cleanup-utility session — the second piece alongside [LAYER 14](../layer-14/).

Open `index.html` directly, or serve it locally:

```bash
cd stories/kept
python3 -m http.server 4179
```

Then open <http://localhost:4179>.

- Nineteen flagged records. Delete is one keypress; keeping costs a held key
  and one of seven slots. Read before you decide.
- Sound is synthesized live; headphones recommended. The corner control mutes.
- If you have played LAYER 14 in the same browser, the queue knows.

Everything is generated locally. There are no dependencies or network
requests; the piece keeps a small record of your shift in the browser's
local storage.
