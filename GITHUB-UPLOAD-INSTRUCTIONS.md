# GitHub Pages asset path fix

This version uses the existing `assets/previews/` directory instead of `assets/project-previews/`.

## Changed from the previous ZIP
- Moved four supplied project mockups into `assets/previews/`.
- Updated preview paths in `index.html`, `work.html`, and the related image-specific selectors in `portfolio-interactions.css`.
- Zlaata preview is unchanged.
- Other case study and certificate images retain their original directory names.
- No JS interactions, CSS animation rules, text, navigation, or case-study logic were changed.

## GitHub browser upload
1. Unzip this package on your computer. Do not upload ZIP itself as the website.
2. In the Portfolio repository root upload the three changed files `index.html`, `work.html`, and `portfolio-interactions.css` (replace existing ones).
3. In GitHub, navigate to `assets/previews` (the existing folder). If your `previews` folder exists at the repository root rather than under `assets`, create `assets/previews` instead because this ZIP references that path. Click Add file > Upload files. Upload the four images from this ZIP's `assets/previews` directory. Do NOT upload the entire assets folder contents to the repository root.
4. Verify these paths in GitHub:
   - assets/previews/workzen-preview.png
   - assets/previews/subtrack-preview.png
   - assets/previews/magicwall-preview.png
   - assets/previews/design-system-preview.png
5. For certificates, enter/create `assets/certificates/` and upload files from the same ZIP's `assets/certificates/`. Other case study screenshots must be uploaded to their corresponding subdirectories, e.g. assets/designsystem/, assets/magicwall/.
6. To fix any remaining broken assets, ensure all files from the ZIP's `assets/` hierarchy are present at the exact same paths in GitHub. GitHub Pages is case-sensitive.
7. Confirm a green Pages deployment under Actions, then test https://sankarapandianbalamurugan.github.io/Portfolio/assets/previews/workzen-preview.png and refresh your Work page with Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows).

For a clean full update, upload every extracted file and folder preserving paths. If browser upload flattens nested directories, open each folder in GitHub and upload just its contents. Never drag individual files from `assets` into the repository root.

Old incorrectly named folder `roject-previews` and old `project-previews` may remain until the new paths work. Remove them only after verification.
