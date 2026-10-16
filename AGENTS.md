<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

## Application structure
- Keep the Fiscare landing page assembled from focused section components, with shared brand and CTA controls, so section changes remain isolated.
- Keep diagnosis schemas and the submission boundary in a browser-safe shared module; any connected receiving server must revalidate the same schema to prevent invalid submissions.
- The unconnected diagnosis flow is explicitly a preview and must never imply real delivery without a connected submission service.
- Keep privacy and terms in dedicated public content routes with independent metadata so footer links are usable and shareable.

- Keep founder photography and founder presentation in a focused browser-safe section module, shared with the opening avatar strip, so identities remain consistent across the page.
