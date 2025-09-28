#!/bin/bash

# ==========================
# Market Bot Full Final
# ==========================

# Masuk ke folder bot
cd "$(dirname "$0")"

# Install dependencies kalau belum ada
echo "Memeriksa dependencies..."
npm install

# Jalankan bot
echo "Menjalankan Market Bot..."
node index.js
