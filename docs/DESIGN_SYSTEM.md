# Portfolio interaction contract

Current direction for the `xx-omer` portfolio iteration.

- The outer environment and the inner editorial surfaces are separate layers. The outer layer may pick up a restrained project ambient color; project media itself stays fully colored.
- Hero and Selected Work are one continuous dark opening surface. They may remain separate React components for maintainability, but they must read visually as one composition with no white page break or repeated section introduction between them.
- Hero keeps the large warm-white editorial statement card. It is the identity/proposition layer, not a generic landing-page card deck.
- The bottom of the hero is the project index. It exposes every real selected project, previews that project in the hero media on hover/focus, changes the outer ambient color, and jumps directly to the corresponding full-screen project chapter on click.
- There is no standalone `02 / SELECTED WORK` intro panel between Hero and the first project. The first full project begins immediately after the hero and should feel like the hero image resolving into the work itself.
- Selected Work uses real project media and full-screen chapters. Chapters can alternate text alignment for editorial rhythm, but the visual system stays coherent and restrained.
- Project ambient color is driven by the project currently crossing the viewport, not only by hover. Hover/focus may reinforce the same state but must not be the sole trigger.
- Project chapters open the existing full-screen live-project preview. Do not replace that interaction with fake case studies or duplicate project pages.
- Motion supports the composition; it is not the concept. Prefer position, opacity, scale and clip masks with deliberate easing. Avoid adding scroll effects that do not clarify hierarchy or continuity.
- Transition remains the dedicated WORK → APPROACH bridge after all projects.
- About remains calm and fills its own chapter page.
- Capabilities remains the interactive design/development/interaction system tied to real work.
- Contact remains the current `HAVE AN IDEA?` → hover/reveal → `MAKE IT REAL.` interaction and opens the project request form. Do not redesign this section while working on Hero/Work unless explicitly requested.
- Footer remains a separate unnumbered final sheet after Contact.
- Chapter navigation remains available and hidden while project/contact overlays are open.
- Acid yellow is a signal color. Do not turn the portfolio into a yellow-text UI.
- No fake Lab, filler projects, decorative dashboards, unsolicited navigation redesigns, or duplicated project data.
