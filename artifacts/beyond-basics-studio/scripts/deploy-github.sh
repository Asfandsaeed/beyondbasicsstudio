#!/usr/bin/env bash
set -e

WORKSPACE_ROOT="/home/runner/workspace"
ARTIFACT_DIR="$WORKSPACE_ROOT/artifacts/beyond-basics-studio"
DIST_DIR="$ARTIFACT_DIR/dist/public"
REMOTE_URL=$(cd "$ARTIFACT_DIR" && git remote get-url github)

echo "Building beyond-basics-studio..."
cd "$WORKSPACE_ROOT"
PORT=3000 BASE_PATH=/ pnpm --filter @workspace/beyond-basics-studio run build

echo "Pushing to gh-pages branch..."
TEMP_DIR=$(mktemp -d)
cp -r "$DIST_DIR/." "$TEMP_DIR/"
cd "$TEMP_DIR"

git init -b gh-pages
git config user.email "deploy@beyondbasics.studio"
git config user.name "Beyond Basics Deploy"
git add -A
git commit -m "Deploy: beyondbasics.studio $(date -u '+%Y-%m-%d %H:%M UTC')"
git remote add origin "$REMOTE_URL"
git push origin gh-pages --force

rm -rf "$TEMP_DIR"
echo "Done. Site is live at https://beyondbasics.studio"
