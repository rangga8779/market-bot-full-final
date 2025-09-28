===============================
       MARKET BOT TELEGRAM
===============================

Developer : Gilbert Ninataka
Nama Bot  : Raden Bot
Bahasa    : JavaScript (Telegraf)
Versi     : 1.0
Tanggal   : 2025

-------------------------------
1️⃣ Persiapan Termux
-------------------------------
1. Update & upgrade Termux:
   $ pkg update -y
   $ pkg upgrade -y

2. Install Node.js, git, unzip:
   $ pkg install nodejs git unzip -y

3. Pastikan file zip ada di Termux:
   Misal simpan 'raden-bot.zip' di folder Download,
   lalu pindahkan ke home Termux:
   $ mv /sdcard/Download/raden-bot.zip ~/

-------------------------------
2️⃣ Ekstrak Bot
-------------------------------
1. Masuk folder home:
   $ cd ~

2. Ekstrak file zip:
   $ unzip raden-bot.zip

3. Masuk folder bot:
   $ cd raden-bot

4. Pastikan ada file:
   - index.js
   - config.js
   - package.json
   - README.txt

-------------------------------
3️⃣ Konfigurasi Bot
-------------------------------
1. Buka config.js, isi sesuai kebutuhan:
   - BOT_TOKEN    : Token dari BotFather
   - ADMIN_ID     : ID Telegram Admin
   - CURRENCY     : Mata uang (misal "Rp")
   - START_IMAGE  : Link foto start bot
   - QR_IMAGE     : Link foto QR pembayaran
   - DANA_NUMBER  : Nomor Dana

Contoh:
module.exports = {
  BOT_TOKEN: "123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11",
  ADMIN_ID: "123456789",
  CURRENCY: "Rp",
  START_IMAGE: "https://i.ibb.co/album/start-image.jpg",
  QR_IMAGE: "https://i.ibb.co/album/qr-image.jpg",
  DANA_NUMBER: "081234567890"
};

-------------------------------
4️⃣ Install Dependencies
-------------------------------
Di folder bot, jalankan:
$ npm install

Ini akan menginstall:
- telegraf
- moment

-------------------------------
5️⃣ Menjalankan Bot
-------------------------------
$ node index.js

Jika berhasil, Termux menampilkan:
"Bot berjalan..."

-------------------------------
6️⃣ Struktur Folder
-------------------------------
raden-bot/
├─ index.js
├─ config.js
├─ package.json
└─ README.txt

-------------------------------
7️⃣ Tips Tambahan
-------------------------------
- Selalu jalankan bot dari folder bot:
  $ cd ~/raden-bot
  $ node index.js

- Untuk menghentikan bot: tekan Ctrl+C
- Untuk menjalankan bot di background, gunakan:
  $ nohup node index.js &

- Jangan lupa isi config.js dengan token dan ID yang benar.

===============================
      SELAMAT MENCOBANYA!
===============================
