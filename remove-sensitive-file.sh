#!/bin/bash

# Script para eliminar archivo sensible del historial de git
# ADVERTENCIA: Esto reescribe el historial completo

set -e

echo "⚠️  ADVERTENCIA: Este script reescribirá el historial de git"
echo "   Si tienes colaboradores, deberán re-clonar el repositorio"
echo ""
read -p "¿Estás seguro de continuar? (escribe 'yes' para confirmar): " confirm

if [ "$confirm" != "yes" ]; then
    echo "Operación cancelada"
    exit 1
fi

# 1. Hacer commit de cambios pendientes (si los hay)
echo ""
echo "📝 Haciendo commit de cambios pendientes..."
git add -A
git commit -m "chore: commit before removing sensitive file" || echo "No hay cambios para commitear"

# 2. Eliminar el archivo del historial completo
echo ""
echo "🗑️  Eliminando archivo del historial..."
FILTER_BRANCH_SQUELCH_WARNING=1 git filter-branch --force --index-filter \
  'git rm --cached --ignore-unmatch src.backup/auth/tickets/TA-20411395678-wsfe.json' \
  --prune-empty --tag-name-filter cat -- --all

# 3. Limpiar referencias
echo ""
echo "🧹 Limpiando referencias..."
git for-each-ref --format="delete %(refname)" refs/original | git update-ref --stdin
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# 4. Mostrar instrucciones para force push
echo ""
echo "✅ Archivo eliminado del historial local"
echo ""
echo "⚠️  IMPORTANTE: Ahora debes hacer force push a GitHub:"
echo "   git push origin --force --all"
echo "   git push origin --force --tags"
echo ""
echo "⚠️  Si tienes colaboradores, deben:"
echo "   1. Guardar sus cambios locales"
echo "   2. Re-clonar el repositorio"
echo ""

