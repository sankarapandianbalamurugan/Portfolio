# Portfolio project navigation update

Order is generated from the published cards in `work.html`:
1. WorkZen — `workzen.html`
2. Aurelle Admin Dashboard — `zlaata.html` (existing URL preserved)
3. SubTrack — `subtrack.html`
4. Design System — `design-system.html`
5. Magicwall — `magicwall.html`

Only the five case study HTML pages were modified. Two new files were added: `project-navigation.css`, `project-navigation.js`. The project-navigation script dynamically reads the Work page to keep navigation ordered correctly, falling back to the static links if it cannot read the page. No edits to the Work page, UX annotations, screenshots, or other JS/CSS. Header/breadcrumb links back to Work are left intact; only case-study bottom navigation changed.

To deploy: upload the five HTML files plus the new CSS/JS into the GitHub repository root. Do not upload either ZIP itself. Check GitHub Pages Actions after committing, then refresh each case study.
