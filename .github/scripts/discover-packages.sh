#!/bin/bash
# Discover packages to publish
# Usage: discover-packages.sh [package_name]
# If package_name is provided, uses only that package
# Otherwise, discovers all packages with @arcasdk scope

set -e

SELECTED_PACKAGE="$1"

# Handle special case for "all packages"
if [ -z "$SELECTED_PACKAGE" ] || [ "$SELECTED_PACKAGE" = "(all packages)" ]; then
  # Discover all packages in packages/ directory that have package.json with @arcasdk scope
  echo "🔍 Discovering all packages..."
  touch packages_to_publish.txt
  for pkg_dir in packages/*/; do
    if [ -f "${pkg_dir}package.json" ]; then
      pkg_name=$(basename "$pkg_dir")
      pkg_json="${pkg_dir}package.json"
      # Check if it's a publishable package (has name starting with @arcasdk/)
      # Use absolute path for require to avoid issues
      pkg_npm_name=$(node -p "require('$(pwd)/$pkg_json').name" 2>/dev/null || echo "")
      if [[ "$pkg_npm_name" == @arcasdk/* ]]; then
        echo "$pkg_name" >> packages_to_publish.txt
        echo "  ✅ Found: $pkg_name ($pkg_npm_name)"
      else
        echo "  ⏭️  Skipped: $pkg_name (not @arcasdk scope, found: $pkg_npm_name)"
      fi
    fi
  done
else
  # Use specific package
  echo "$SELECTED_PACKAGE" > packages_to_publish.txt
  echo "📦 Selected package: $SELECTED_PACKAGE"
fi

if [ ! -s packages_to_publish.txt ]; then
  echo "❌ No packages found to publish"
  exit 1
fi

echo ""
echo "📋 Packages to check:"
cat packages_to_publish.txt | while read pkg; do
  echo "  - $pkg"
done

