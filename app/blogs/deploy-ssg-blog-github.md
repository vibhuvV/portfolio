---
title: Deploy SSG blog site on github
description: Deploy React Router Framework (Formerly Remix) static blog site on Github pages using Github Actions and setup CI/CD so that new blogs will be deployed when any new markdown file is committed and pushed to Github.
datetime: 14th Jan, 2025
---

**Automate deployment of our static blog site that we created in [Build your SSG blogs using React Router Framework (Formerly Remix)](/blogs/build-ssg-blog). Add new blogs by adding new markdown files and pushing code to Github.**

GitHub Pages is a popular platform for hosting static websites, offering free and reliable hosting directly from your GitHub repository. By leveraging GitHub Actions, we can automate the deployment process, ensuring that our static files are seamlessly updated every time we push changes to our repository.

In this article, we’ll walk through the process of setting up a GitHub Actions workflow to deploy our blog site that we created in [Build your SSG blogs using React Router Framework (Formerly Remix)](/blogs/build-ssg-blog) to GitHub Pages.

## Step 1: Prepare Your Repository

1. **Create a New Repository**:

   - Go to [GitHub](https://github.com) and create a new repository for your project.
   - Clone the repository locally and add the git remote origin to your project.

   ```bash
   git init
   git remote add origin <your_new_github_repo_url>
   ```

2. **Enable GitHub Pages**:

Make sure your repository is public to setup Github actions. For private repos we need to upgrate to [Github Pro](https://github.com/account/upgrade).
Now follow the following steps:

- Navigate to your repository’s settings.
- Scroll down to the "Pages" section under "Code and automation".
- Select the `Github Actions` in the "Source" dropdown options.

3. **Push Your Changes**:

   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

## Step 2: Create a GitHub Actions Workflow

1. **Add a Workflow File**:

- Create a `.github/workflows` directory in your repository.
- Inside the directory, create a file named `build-deploy.yml`.

2. **Define the Workflow**:

Add the following YAML configuration to `build-deploy.yml`:

```yaml
name: Build and deploy

on:
# Runs on pushes targeting the default branch
push:
  branches: ["main"]

# Allows you to run this workflow manually from the Actions tab
workflow_dispatch:

# Sets permissions of the GITHUB_TOKEN to allow deployment to GitHub Pages
permissions:
contents: read
pages: write
id-token: write

# Allow only one concurrent deployment, skipping runs queued between the run in-progress and latest queued.
# However, do NOT cancel in-progress runs as we want to allow these production deployments to complete.
concurrency:
group: "pages"
cancel-in-progress: false

jobs:
# Single deploy job since we're just deploying
build-and-deploy:
  environment:
    name: github-pages
    url: ${{ steps.deployment.outputs.page_url }}
  runs-on: ubuntu-latest
  strategy:
    matrix:
      node-version: [22]
  steps:
    - uses: actions/checkout@v4
    # If you are using pnpm as your package manager
    - name: Install pnpm
      uses: pnpm/action-setup@v4
      with:
        version: 10
    - name: Use Node.js ${{ matrix.node-version }}
      uses: actions/setup-node@v4
      with:
        node-version: ${{ matrix.node-version }}
        cache: "pnpm"
    - name: Install dependencies
      run: |
        pnpm install --frozen-lockfile
        pnpm run build
    - name: Setup Pages
      uses: actions/configure-pages@v4
    - name: Upload artifact
      uses: actions/upload-pages-artifact@v3
      with:
        # Upload entire repository
        path: "build/client"
    - name: Deploy to GitHub Pages
      id: deployment
      uses: actions/deploy-pages@v4
```

### Key Points:

- Replace `pnpm install --frozen-lockfile` and `pnpm run build` with your project’s build command if it differs.
- Ensure `with.path` in `Upload artifact` points to the folder containing the built static files (e.g., `./build` or `./dist`). We have just used `build/client` because we are going to build our
  project as a SSR but then only deploy the client files as all the client files will be Statically generated at the build time so we don't need any server side features.

## Step 3: Test Your Workflow

1. **Push Changes to Trigger the Workflow**:

   ```bash
   git add .
   git commit -m "Add GitHub Actions workflow"
   git push origin main
   ```

2. **Monitor the Workflow**:

   - Go to the "Actions" tab in your GitHub repository.
   - Click on the workflow named "Deploy to GitHub Pages" to view its progress.

3. **Verify Deployment**:
   - Once the workflow completes, visit your GitHub Pages URL (e.g., `https://<your-username>.github.io/<your-repository>`).
   - Verify that your static site is live. 😇

**Wait what?? 🤨 It is not working. What went wrong? Deployment was successfull but we are not able to open the app. Lets see now**

So, out application is deployed on `https://<your-username>.github.io/<your-repository>` but if you check network tab all the static files
are being requested from `https://<your-username>.github.io/` where it does not present. So how do we fix that?

This is how:

1. In our `vite.config.[ts/js]` we have to add the following:

   ```javascript
   export default defineConfig({
     base: "/<your-repository-name>/",
     ...
   });
   ```

2. We will have to do same with our `react-router.config.[ts/js]`

   ```javascript
   export default {
      // Config options...
      // Server-side render by default, to enable SPA mode set this to `false`
      ssr: true,
      basename: "/<your-repository>/",
    } satisfies Config;
   ```

## Step 4: Retrying with base path configuration

```bash
npm run build
git commit -m "Configure base path"
```

**But wait 🧐 it still did not work but why?**

**Here is why**

Now after we've added base path in vite config and react router config file if you look the network requests it is fetching
static files from `https://<your-username>.github.io/<your-repository>` but now if you see the `build/client` folder our client code is
now inside `<your-repository>` directory but we are uploading `build/client` as static files to server (check `with.path` in `Upload artifact` in yaml config).
So, there is no file to serve on `https://<your-username>.github.io/<your-repository>` but if you try `https://<your-username>.github.io/<your-repository>/<your-repository>`
then it serves the `index.html`. But this is not good now what?

There is one solution which will fix everything and that requires some change in our build script. In our package.json make the following changes:

```json
{
  ...
  "scripts": {
    "build": "cross-env NODE_ENV=production react-router build && mv ./build/client/<your-repository>/* ./build/client && rm -r ./build/client/<your-repository>",
    ...
  }
  ...
}
```

Now if we commit and push, our blog website will work properly because now all our links or assets in our code are referenced to
`/<your-repository>/*` and our code is also stored on `/<your-repository>/*` on our github so our app works properly now.

## Conclusion

By using GitHub Actions to deploy your static files to GitHub Pages, we have streamlines our workflow and can ensure your site is always up-to-date.
This automation reduces manual effort and improves efficiency, allowing us to focus on building great content.

We can now directly write blogs from Github UI and when we commit our code will be built and deployed and because all our blogs are
static so we don't need any server or database.

Happy deploying! 😇
