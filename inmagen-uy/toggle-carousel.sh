#!/bin/bash

# Script para activar/desactivar el carrusel de promotores
# Uso: ./toggle-carousel.sh [on|off]

LAYOUT_FILE="src/app/layout/layout.html"

if [ "$1" == "off" ]; then
    echo "🔴 Desactivando carrusel de promotores..."
    sed -i.bak 's/<app-sponsors-carousel><\/app-sponsors-carousel>/<!-- <app-sponsors-carousel><\/app-sponsors-carousel> -->/' "$LAYOUT_FILE"
    echo "✅ Carrusel desactivado. Archivo original guardado como layout.html.bak"
elif [ "$1" == "on" ]; then
    echo "🟢 Activando carrusel de promotores..."
    sed -i.bak 's/<!-- <app-sponsors-carousel><\/app-sponsors-carousel> -->/<app-sponsors-carousel><\/app-sponsors-carousel>/' "$LAYOUT_FILE"
    echo "✅ Carrusel activado. Archivo original guardado como layout.html.bak"
else
    echo "📋 Uso: ./toggle-carousel.sh [on|off]"
    echo ""
    echo "Comandos disponibles:"
    echo "  ./toggle-carousel.sh on   - Activar el carrusel"
    echo "  ./toggle-carousel.sh off  - Desactivar el carrusel"
    echo ""
    
    # Verificar estado actual
    if grep -q "<!-- <app-sponsors-carousel>" "$LAYOUT_FILE"; then
        echo "Estado actual: 🔴 DESACTIVADO"
    else
        echo "Estado actual: 🟢 ACTIVADO"
    fi
fi


