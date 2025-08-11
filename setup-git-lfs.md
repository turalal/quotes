# Git LFS Setup for Large Dataset

## Install Git LFS
```bash
# Install Git LFS (if not already installed)
git lfs install

# Track large files (CSV and JSON files over 10MB)
git lfs track "*.csv"
git lfs track "data/*.json"
git lfs track "public/data/*.json"

# Add .gitattributes file
git add .gitattributes

# Commit LFS setup
git commit -m "Setup Git LFS for large data files"
```

## Push with LFS
```bash
git add .
git commit -m "Add quotes dataset with LFS"
git push origin main
```

## Benefits
✅ Handles files up to 2GB each
✅ GitHub provides 1GB LFS storage free
✅ Fast cloning (LFS files downloaded on-demand)
✅ Version control for large files