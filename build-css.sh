#!/bin/bash
# Script para compilar Tailwind CSS usando el CLI standalone
# Este script descarga el CLI standalone si no existe y compila el CSS

# Detectar el sistema operativo
OS="$(uname -s)"
ARCH="$(uname -m)"

case "$OS" in
    Linux*)
        if [[ "$ARCH" == "x86_64" ]]; then
            TAILWIND_URL="https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-linux-x64"
            TAILWIND_CLI="./tailwindcss"
        else
            echo "Arquitectura no soportada: $ARCH"
            exit 1
        fi
        ;;
    Darwin*)
        if [[ "$ARCH" == "x86_64" ]]; then
            TAILWIND_URL="https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-x64"
            TAILWIND_CLI="./tailwindcss"
        elif [[ "$ARCH" == "arm64" ]]; then
            TAILWIND_URL="https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-macos-arm64"
            TAILWIND_CLI="./tailwindcss"
        else
            echo "Arquitectura no soportada: $ARCH"
            exit 1
        fi
        ;;
    MINGW*|MSYS*|CYGWIN*)
        # Windows con Git Bash
        TAILWIND_URL="https://github.com/tailwindlabs/tailwindcss/releases/latest/download/tailwindcss-windows-x64.exe"
        TAILWIND_CLI="./tailwindcss.exe"
        ;;
    *)
        echo "Sistema operativo no soportado: $OS"
        exit 1
        ;;
esac

if [ ! -f "$TAILWIND_CLI" ]; then
    echo "Descargando Tailwind CSS CLI standalone para $OS ($ARCH)..."
    curl -L -o "$TAILWIND_CLI" "$TAILWIND_URL"
    if [ $? -ne 0 ]; then
        echo "Error al descargar Tailwind CSS CLI."
        echo "Por favor, descarga manualmente desde: $TAILWIND_URL"
        exit 1
    fi
    # Solo dar permisos de ejecución en sistemas Unix-like
    if [[ "$OS" != "MINGW"* && "$OS" != "MSYS"* && "$OS" != "CYGWIN"* ]]; then
        chmod +x "$TAILWIND_CLI"
    fi
    echo "Descarga completada."
fi

echo "Compilando CSS..."
"$TAILWIND_CLI" -i ./css/input.css -o ./css/styles.css --minify

if [ $? -ne 0 ]; then
    echo "Error al compilar CSS."
    exit 1
fi

echo "CSS compilado exitosamente en css/styles.css"
