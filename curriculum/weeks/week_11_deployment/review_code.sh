#!/usr/bin/env bash
set -euo pipefail
cd "$(dirname "$0")"

echo "🔍 Week 11: Deployment Review"
echo "=============================="

# Check Docker availability
if ! command -v docker >/dev/null 2>&1; then
  echo "⚠️  Docker not installed - skipping container validation"
else
  echo "✅ Docker found"
  
  # Validate Dockerfiles
  echo "Checking Dockerfiles..."
  for df in $(find . -name "Dockerfile" -path "*/solutions/*"); do
    if docker build -f "$df" -t test-build $(dirname "$df") --quiet > /dev/null 2>&1; then
      echo "  ✅ $(dirname $df | sed 's|^\./||')"
    else
      echo "  ❌ $(dirname $df | sed 's|^\./||') - build failed"
    fi
  done
  
  # Validate compose files (support both 'docker compose' and 'docker-compose')
  echo "Checking compose files..."
  COMPOSE_CMD=""
  if docker compose version >/dev/null 2>&1; then
    COMPOSE_CMD="docker compose"
  elif command -v docker-compose >/dev/null 2>&1; then
    COMPOSE_CMD="docker-compose"
  else
    echo "  ⚠️  Neither 'docker compose' nor 'docker-compose' found - skipping compose validation"
  fi

  if [ -n "$COMPOSE_CMD" ]; then
    for dc in $(find . -name "docker-compose*.yml" -path "*/solutions/*"); do
      if $COMPOSE_CMD -f "$dc" config > /dev/null 2>&1; then
        echo "  ✅ $dc"
      else
        echo "  ❌ $dc - invalid syntax"
      fi
    done
  fi
fi

# Check for required files
echo ""
echo "Checking structure..."
for day in day1 day2 day3 day4 day5; do
  if [ -d "exercises/$day" ] && [ -d "solutions/$day" ]; then
    echo "  ✅ $day structure complete"
  else
    echo "  ❌ $day missing directories"
  fi
done

# Validate GitHub Actions workflows
if [ -d "solutions/day4/.github/workflows" ]; then
  echo "  ✅ GitHub Actions workflows present"
else
  echo "  ⚠️  GitHub Actions workflows not found"
fi

# Check platform configs
for config in render.yaml fly.toml railway.json; do
  if [ -f "solutions/day5/$config" ]; then
    echo "  ✅ $config found"
  fi
done

echo ""
echo "✅ Week 11 review complete!"
