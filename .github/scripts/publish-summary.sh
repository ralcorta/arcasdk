#!/bin/bash
# Generate publish summary for GitHub Actions
# Reads from publish-summary.txt

set -e

echo "## 📦 Publication Summary" >> $GITHUB_STEP_SUMMARY
echo "" >> $GITHUB_STEP_SUMMARY

if [ ! -f publish-summary.txt ]; then
  echo "ℹ️  No packages found to process" >> $GITHUB_STEP_SUMMARY
  exit 0
fi

PUBLISHED=$(grep -c "^PUBLISH:" publish-summary.txt 2>/dev/null || echo "0")
SKIPPED=$(grep -c "^SKIP:" publish-summary.txt 2>/dev/null || echo "0")
FAILED=$(grep -c "^FAIL:" publish-summary.txt 2>/dev/null || echo "0")

if [ "$PUBLISHED" -gt 0 ]; then
  echo "### ✅ Published Packages ($PUBLISHED)" >> $GITHUB_STEP_SUMMARY
  echo "" >> $GITHUB_STEP_SUMMARY
  grep "^PUBLISH:" publish-summary.txt | sed 's/^PUBLISH://' | while IFS=':' read pkg name version; do
    echo "- **$name@$version** ([npm](https://www.npmjs.com/package/$name))" >> $GITHUB_STEP_SUMMARY
  done
  echo "" >> $GITHUB_STEP_SUMMARY
fi

if [ "$SKIPPED" -gt 0 ]; then
  echo "### ⏭️  Skipped Packages ($SKIPPED)" >> $GITHUB_STEP_SUMMARY
  echo "" >> $GITHUB_STEP_SUMMARY
  grep "^SKIP:" publish-summary.txt | sed 's/^SKIP://' | while IFS=':' read pkg name version; do
    echo "- **$name@$version** (already published)" >> $GITHUB_STEP_SUMMARY
  done
  echo "" >> $GITHUB_STEP_SUMMARY
fi

if [ "$FAILED" -gt 0 ]; then
  echo "### ❌ Failed Packages ($FAILED)" >> $GITHUB_STEP_SUMMARY
  echo "" >> $GITHUB_STEP_SUMMARY
  grep "^FAIL:" publish-summary.txt | sed 's/^FAIL://' | while IFS=':' read pkg name version reason; do
    echo "- **$name@$version** ($reason)" >> $GITHUB_STEP_SUMMARY
  done
  echo "" >> $GITHUB_STEP_SUMMARY
fi

if [ "$PUBLISHED" -eq 0 ] && [ "$SKIPPED" -eq 0 ] && [ "$FAILED" -eq 0 ]; then
  echo "ℹ️  No packages found to process" >> $GITHUB_STEP_SUMMARY
fi

