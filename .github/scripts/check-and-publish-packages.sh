#!/bin/bash
# Check and publish packages that have new versions
# Reads packages from packages_to_publish.txt

set -e

SUMMARY_FILE=$(mktemp)

while IFS= read -r PACKAGE; do
  if [ -z "$PACKAGE" ]; then
    continue
  fi
  
  echo ""
  echo "=== Processing $PACKAGE ==="
  
  # Check if package.json exists
  if [ ! -f "packages/$PACKAGE/package.json" ]; then
    echo "⚠️  Skipping $PACKAGE: package.json not found"
    continue
  fi
  
  # Get package name and version
  PACKAGE_NAME=$(node -p "require('./packages/$PACKAGE/package.json').name" 2>/dev/null || echo "")
  VERSION=$(node -p "require('./packages/$PACKAGE/package.json').version" 2>/dev/null || echo "")
  
  if [ -z "$PACKAGE_NAME" ] || [ -z "$VERSION" ]; then
    echo "⚠️  Skipping $PACKAGE: invalid package.json"
    continue
  fi
  
  echo "📦 Package: $PACKAGE_NAME"
  echo "📌 Version: $VERSION"
  
  # Check if version already published
  if npm view "$PACKAGE_NAME@$VERSION" version > /dev/null 2>&1; then
    echo "⏭️  $PACKAGE_NAME@$VERSION already published, skipping"
    echo "SKIP:$PACKAGE:$PACKAGE_NAME:$VERSION" >> "$SUMMARY_FILE"
  else
    echo "✅ $PACKAGE_NAME@$VERSION not published, will publish"
    
    # Build
    echo "🔨 Building $PACKAGE..."
    if ! npm run build:$PACKAGE; then
      echo "❌ Build failed for $PACKAGE"
      echo "FAIL:$PACKAGE:$PACKAGE_NAME:$VERSION:Build failed" >> "$SUMMARY_FILE"
      continue
    fi
    
    # Test
    echo "🧪 Testing $PACKAGE..."
    if ! npm run test:$PACKAGE:unit; then
      echo "❌ Tests failed for $PACKAGE"
      echo "FAIL:$PACKAGE:$PACKAGE_NAME:$VERSION:Tests failed" >> "$SUMMARY_FILE"
      continue
    fi
    
    # Publish
    echo "🚀 Publishing $PACKAGE_NAME@$VERSION..."
    if ! npm run publish:$PACKAGE; then
      echo "❌ Publish failed for $PACKAGE"
      echo "FAIL:$PACKAGE:$PACKAGE_NAME:$VERSION:Publish failed" >> "$SUMMARY_FILE"
      continue
    fi
    
    echo "✅ Successfully published $PACKAGE_NAME@$VERSION"
    echo "PUBLISH:$PACKAGE:$PACKAGE_NAME:$VERSION" >> "$SUMMARY_FILE"
  fi
done < packages_to_publish.txt

# Save summary to output for next step
if [ -f "$SUMMARY_FILE" ]; then
  cat "$SUMMARY_FILE" > publish-summary.txt
else
  touch publish-summary.txt
fi

