#!/bin/bash

# Constitution Compass Deployment Script
# Handles version tagging and triggers Vercel deployment via GitHub Actions

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}🚀 Constitution Compass Deployment${NC}"
echo "======================================"

# Check if we're on main branch
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
    echo -e "${RED}❌ Error: Must be on main branch to deploy${NC}"
    echo -e "Current branch: ${YELLOW}$CURRENT_BRANCH${NC}"
    exit 1
fi

# Check for uncommitted changes
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${RED}❌ Error: You have uncommitted changes${NC}"
    git status --short
    exit 1
fi

# Get the latest tag
LATEST_TAG=$(git describe --tags --abbrev=0 2>/dev/null || echo "v0.0.0")
echo -e "${BLUE}📌 Latest tag: ${YELLOW}$LATEST_TAG${NC}"

# Parse version (assuming format v0.0.0)
VERSION=${LATEST_TAG#v}
IFS='.' read -r -a VERSION_PARTS <<< "$VERSION"
MAJOR=${VERSION_PARTS[0]:-0}
MINOR=${VERSION_PARTS[1]:-0}
PATCH=${VERSION_PARTS[2]:-0}

# Ask for version bump type
echo ""
echo "Select version bump type:"
echo "  1) Patch (bug fixes)        v$MAJOR.$MINOR.$PATCH -> v$MAJOR.$MINOR.$((PATCH+1))"
echo "  2) Minor (new features)     v$MAJOR.$MINOR.$PATCH -> v$MAJOR.$((MINOR+1)).0"
echo "  3) Major (breaking changes) v$MAJOR.$MINOR.$PATCH -> v$((MAJOR+1)).0.0"
echo "  4) Custom version"
echo "  5) Cancel"
echo ""
read -p "Enter choice [1-5]: " choice

case $choice in
    1)
        NEW_VERSION="v$MAJOR.$MINOR.$((PATCH+1))"
        ;;
    2)
        NEW_VERSION="v$MAJOR.$((MINOR+1)).0"
        ;;
    3)
        NEW_VERSION="v$((MAJOR+1)).0.0"
        ;;
    4)
        read -p "Enter custom version (e.g., v1.2.3): " NEW_VERSION
        if [[ ! $NEW_VERSION =~ ^v[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
            echo -e "${RED}❌ Error: Invalid version format. Must be v0.0.0${NC}"
            exit 1
        fi
        ;;
    5)
        echo -e "${YELLOW}Deployment cancelled${NC}"
        exit 0
        ;;
    *)
        echo -e "${RED}❌ Invalid choice${NC}"
        exit 1
        ;;
esac

echo ""
echo -e "${BLUE}📦 New version: ${GREEN}$NEW_VERSION${NC}"

# Confirm deployment
read -p "Continue with deployment? [y/N]: " confirm
if [[ ! $confirm =~ ^[Yy]$ ]]; then
    echo -e "${YELLOW}Deployment cancelled${NC}"
    exit 0
fi

# Create and push tag
echo ""
echo -e "${BLUE}🏷️  Creating tag ${GREEN}$NEW_VERSION${NC}"
git tag -a "$NEW_VERSION" -m "Release $NEW_VERSION"

echo -e "${BLUE}📤 Pushing tag to origin${NC}"
git push origin "$NEW_VERSION"

echo ""
echo -e "${GREEN}✅ Deployment triggered!${NC}"
echo ""
echo "GitHub Actions will now:"
echo "  1. Build the application"
echo "  2. Deploy to Vercel"
echo "  3. Run any deployment checks"
echo ""
echo -e "Monitor deployment: ${BLUE}https://github.com/emckenna/constitution-compass/actions${NC}"
echo -e "Vercel dashboard: ${BLUE}https://vercel.com/dashboard${NC}"
echo ""
echo -e "${GREEN}🎉 Done!${NC}"
