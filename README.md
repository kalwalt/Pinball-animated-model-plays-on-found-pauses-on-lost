# Pinball · animated model, plays on found, pauses on lost

An AR app exported from WebARKit Studio, ready to publish on GitHub Pages. The app is in `site/`, and
`.github/workflows/deploy-pages.yml` deploys it each time you push. Nothing in this folder holds a token
or a password: you push with your usual access to GitHub.

Once published, anyone can read everything in this folder, including your graph and the files it uses.

## Publish it

Unzip this project with your system's own Extract command: some command-line tools garble names with accents.

1. Create a new, empty repository on GitHub. Make it public: Pages on a private repository needs a paid plan.
2. Before you push, in the repository, open Settings → Pages, and under "Build and deployment" set Source to
   **GitHub Actions**. The push starts the deploy, and without this its first run fails.
   GitHub then suggests some workflows. You do not need them: this project brings its own.
3. Open a terminal in the folder that holds this README.md, which becomes the root of the repository. Replace
   `<you>` and `<repo>` with your user name and the repository's name, and run:

   ```
   git init
   git add -A
   git commit -m "Publish the app"
   git branch -M main
   git remote add origin https://github.com/<you>/<repo>.git
   git push -u origin main
   ```

4. Wait for the "Deploy to GitHub Pages" run to finish in the repository's Actions tab.
5. Open the URL the run shows, usually `https://<you>.github.io/<repo>/`.

A camera on a phone needs a secure page, and the HTTPS URL that Pages gives is one.

## If it fails

- **The push is refused, and it names a workflow:** if you push with a personal access token, it needs the
  `workflow` scope.
- **The run fails because Pages was not set up:** do step 2, then press "Re-run all jobs".
- **The run says `Branch "main" is not allowed to deploy to github-pages`:** open
  Settings → Environments → github-pages, allow the branch `main`, then press "Re-run all jobs".

## Update it

Export the project again, replace `site/` with the new one, then commit and push.
