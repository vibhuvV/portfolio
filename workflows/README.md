# Workflows

Automation for this portfolio. Currently one n8n workflow that keeps the blog
fed with trending-topic drafts.

## portfolio-blog-workflow.json

Fetches trending topics (Hacker News front page), deduplicates against the
existing posts in `app/blogs/`, drafts a new post via z.ai (GLM) in the blog's
voice, validates the front-matter, and commits it to this repo — which
triggers the GitHub Pages deploy automatically.

**Pipeline:** When clicked (manual) → Get trending topics → List existing
blogs → Pick topic → Draft blog → Validate & slug → Commit to GitHub

### Setup

1. Open n8n and create a new workflow.
2. Import the file via the canvas **⋯ menu → Import from File…**
   (or copy the file contents and paste directly onto the canvas).
3. Attach credentials to the nodes (see sections below):
   - **List existing blogs** and **Commit to GitHub** — GitHub credential
   - **Draft blog** — Header Auth credential (z.ai key)
4. Run via the **Execute workflow** button. Note: it commits for real — point
   the `branch` field in **Commit to GitHub** at `auto-blog` for test runs.

### GitHub credential setup

1. Create a token on GitHub:
   - Go to **GitHub → Settings → Developer settings → Personal access tokens
     → Fine-grained tokens → Generate new token**
   - **Repository access**: *Only select repositories* → `vibhuvV/portfolio`
   - **Permissions → Repository permissions → Contents**: *Read and write*
   - Generate and copy the token (shown once)
2. Create the credential in n8n:
   - **n8n → Credentials → Add credential → search "GitHub API"**
   - Paste the token into **GitHub Server Access Token**, save
3. Open the **List existing blogs** and **Commit to GitHub** nodes and select
   that credential in each.

A classic token with the `repo` scope also works if you prefer, but
fine-grained limits the blast radius to this one repo.

### z.ai credential setup

Uses z.ai's OpenAI-compatible endpoint, so a plain header credential is enough:

1. **n8n → Credentials → Add credential → search "Header Auth"**
2. **Name**: `Authorization`  **Value**: `Bearer <your z.ai API key>`
   (note the space after `Bearer`; no quotes, no trailing spaces)
3. Open the **Draft blog** node and select that credential.

**Endpoint matters:** the workflow's URL is
`https://api.z.ai/api/coding/paas/v4/chat/completions` — this is the path
for **GLM Coding Plan** keys. If your key is a regular API key from the
z.ai console instead, change the node URL to
`https://api.z.ai/api/paas/v4/chat/completions`.

Defaults to model `glm-4.6` — change the `model` field in the node's JSON
body to use another one your plan supports.

If you still get "Authorization failed" after matching endpoint to key
type, regenerate the key from the z.ai console (keys are shown once and
copy-paste sometimes grabs a truncated value).

### Notes

- The blog pipeline expects posts as markdown files in `app/blogs/` with
  quoted front-matter (`title`, `description`, `datetime: "YYYY-MM-DD"`).
  The workflow's **Validate & slug** node enforces this and rejects drafts
  that don't comply.
- The sitemap is generated at build time (`scripts/generate-sitemap.mjs`),
  so committed posts are picked up with no manual steps.
- Swap the topic source by replacing **Get trending topics** with any HTTP
  node (dev.to, Reddit, etc.) — downstream nodes only read `hits[].title`,
  `points`, and `url`, so adapt the **Pick topic** references accordingly.

### Safety

This publishes AI-generated content under your name to a recruiter-facing
site. Before sharing externally, consider:

- Committing to an `auto-blog` branch instead of `main` and opening a PR:
  `https://github.com/vibhuvV/portfolio/compare/main...auto-blog`
- Inserting a n8n **Send and Wait** (email/Slack) approval node between
  **Validate & slug** and **Commit to GitHub** so nothing lands unreviewed.
- Reading each draft before sharing it — the commit message is flagged
  `auto-generated` to make these easy to spot.
