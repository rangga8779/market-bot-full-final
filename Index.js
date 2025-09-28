const { Telegraf } = require("telegraf");
const moment = require("moment");
const config = require("./config");

const bot = new Telegraf(config.BOT_TOKEN);

// ==========================
// Simpan harga per user
// ==========================
const userHarga = {};

// ==========================
// Fungsi tampilkan produk
// ==========================
async function showProduct(ctx, produk, nama, deskripsi, baseHarga) {
  const userId = ctx.from.id;
  if (!userHarga[userId]) userHarga[userId] = {};
  if (!userHarga[userId][produk]) userHarga[userId][produk] = baseHarga;
  const harga = userHarga[userId][produk];

  await ctx.editMessageCaption(
    `${nama}\n\n${deskripsi}\n\nHarga: ${config.CURRENCY}${harga.toLocaleString()}`,
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "➖", callback_data: `kurang_${produk}` },
            { text: "➕", callback_data: `tambah_${produk}` }
          ],
          [{ text: "Beli", callback_data: `beli_${produk}` }],
          [{ text: "⬅️ Back", callback_data: "menu_produk" }]
        ]
      }
    }
  );
}

// ==========================
// Fungsi tampilkan panel
// ==========================
async function showPanel(ctx, panel, nama, deskripsi, hargaPanel) {
  await ctx.editMessageCaption(
    `${nama}\n\n${deskripsi}\n\nHarga: ${config.CURRENCY}${hargaPanel.toLocaleString()}`,
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Beli Panel", callback_data: `beli_panel_${panel}` }],
          [{ text: "⬅️ Back", callback_data: "menu_panel" }]
        ]
      }
    }
  );
}

// ==========================
// START BOT
// ==========================
bot.start(async (ctx) => {
  const username = ctx.from.username ? `@${ctx.from.username}` : ctx.from.first_name;

  await ctx.replyWithPhoto(
    { url: config.START_IMAGE },
    {
      caption: `Selamat datang ${username}\nIni adalah Market Bot serbaguna.\n\nPilih menu di bawah.`,
      reply_markup: {
        inline_keyboard: [
          [{ text: "Produk", callback_data: "menu_produk" }],
          [{ text: "Panel", callback_data: "menu_panel" }],
          [{ text: "Payment", callback_data: "menu_payment" }],
          [{ text: "Penjelasan", callback_data: "penjelasan_bot" }]
        ]
      }
    }
  );
});

// ==========================
// PENJELASAN BOT
// ==========================
bot.action("penjelasan_bot", async (ctx) => {
  await ctx.editMessageCaption(
    `Bot ini dibuat oleh Gilbert Ninataka dengan JavaScript (Telegraf).\n\nKegunaan:\n- Menampilkan produk digital (script, panel, tools)\n- Mengatur harga otomatis tambah/kurang\n- Memesan produk dengan sistem notifikasi admin\n- Mendukung pembayaran via Dana & QR`,
    {
      reply_markup: {
        inline_keyboard: [[{ text: "⬅️ Back", callback_data: "back_start" }]]
      }
    }
  );
  await ctx.answerCbQuery();
});

// ==========================
// MENU PRODUK
// ==========================
bot.action("menu_produk", async (ctx) => {
  await ctx.editMessageCaption(
    "Daftar produk tersedia:",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "Script MD", callback_data: "prod_md" },
            { text: "Script Bug", callback_data: "prod_bug" },
            { text: "PT Pribadi", callback_data: "prod_pt" },
            { text: "Panel Unli", callback_data: "prod_panel" }
          ],
          [
            { text: "All Base", callback_data: "prod_base" },
            { text: "Function Script", callback_data: "prod_func" },
            { text: "PT Biasa", callback_data: "prod_ptbiasa" },
            { text: "Next ➡️", callback_data: "produk_next" }
          ],
          [{ text: "⬅️ Back", callback_data: "back_start" }]
        ]
      }
    }
  );
  await ctx.answerCbQuery();
});

// ==========================
// NEXT PRODUK
// ==========================
bot.action("produk_next", async (ctx) => {
  await ctx.editMessageCaption(
    "Lanjutan produk:",
    {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Jasa buat Script", callback_data: "prod_jasa" }],
          [{ text: "⬅️ Back", callback_data: "menu_produk" }]
        ]
      }
    }
  );
  await ctx.answerCbQuery();
});

// ==========================
// DETAIL PRODUK DENGAN PENJELASAN
// ==========================
bot.action("prod_md", (ctx) =>
  showProduct(ctx, "md", "Script MD", "Source code Multi Device siap pakai + Panel Support", 50000)
);

bot.action("prod_bug", (ctx) =>
  showProduct(ctx, "bug", "Script Bug", "Source code Bug WhatsApp siap pakai", 75000)
);

bot.action("prod_pt", (ctx) =>
  showProduct(ctx, "pt", "PT Pribadi", "Private Tools Premium dengan update rutin", 100000)
);

bot.action("prod_panel", (ctx) =>
  showProduct(ctx, "panel", "Panel Unli", "Panel Unlimited untuk deploy bot/project", 30000)
);

bot.action("prod_base", (ctx) =>
  showProduct(ctx, "base", "All Base", "Kumpulan base bot premium siap edit", 40000)
);

bot.action("prod_func", (ctx) =>
  showProduct(ctx, "func", "Function Script", "Koleksi function siap pakai", 25000)
);

bot.action("prod_ptbiasa", (ctx) =>
  showProduct(ctx, "ptbiasa", "PT Biasa", "Private Tools versi hemat dengan support", 50000)
);

bot.action("prod_jasa", (ctx) =>
  showProduct(ctx, "jasa", "Jasa Buat Script", "Kami membuat script custom sesuai permintaan", 150000)
);

// ==========================
// MENU PANEL DENGAN PENJELASAN
// ==========================
bot.action("menu_panel", async (ctx) => {
  await ctx.editMessageCaption(
    "Pilih kapasitas panel:",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "1GB", callback_data: "panel_1gb" },
            { text: "2GB", callback_data: "panel_2gb" },
            { text: "3GB", callback_data: "panel_3gb" },
            { text: "4GB", callback_data: "panel_4gb" }
          ],
          [
            { text: "5GB", callback_data: "panel_5gb" },
            { text: "6GB", callback_data: "panel_6gb" },
            { text: "7GB", callback_data: "panel_7gb" },
            { text: "Next ➡️", callback_data: "panel_next" }
          ],
          [{ text: "⬅️ Back", callback_data: "back_start" }]
        ]
      }
    }
  );
  await ctx.answerCbQuery();
});

bot.action("panel_next", async (ctx) => {
  await ctx.editMessageCaption(
    "Lanjutan kapasitas panel:",
    {
      reply_markup: {
        inline_keyboard: [
          [
            { text: "8GB", callback_data: "panel_8gb" },
            { text: "9GB", callback_data: "panel_9gb" },
            { text: "10GB", callback_data: "panel_10gb" },
            { text: "Unlimited", callback_data: "panel_unlimited" }
          ],
          [{ text: "⬅️ Back", callback_data: "menu_panel" }]
        ]
      }
    }
  );
  await ctx.answerCbQuery();
});

// ==========================
// DETAIL PANEL DENGAN PENJELASAN
// ==========================
bot.action(/panel_(.+)/, (ctx) => {
  const panel = ctx.match[1];
  const deskripsi = {
    "1gb": "Panel 1GB, cocok untuk bot ringan, harga 10k",
    "2gb": "Panel 2GB, lebih kuat, harga 20k",
    "3gb": "Panel 3GB, untuk project menengah, harga 30k",
    "4gb": "Panel 4GB, performa lebih tinggi, harga 40k",
    "5gb": "Panel 5GB, cocok untuk multi bot, harga 50k",
    "6gb": "Panel 6GB, performa tinggi, harga 60k",
    "7gb": "Panel 7GB, heavy project, harga 70k",
    "8gb": "Panel 8GB, advanced, harga 80k",
    "9gb": "Panel 9GB, high-end, harga 90k",
    "10gb": "Panel 10GB, ultra, harga 100k",
    "unlimited": "Panel Unlimited, performa maksimal, harga 150k"
  };
  const nama = `Panel ${panel.toUpperCase()}`;
  showPanel(ctx, panel, nama, deskripsi[panel], parseInt(panel) * 10000 || 150000);
});

// ==========================
// TAMBAH / KURANG HARGA PRODUK
// ==========================
bot.action(/tambah_(.+)/, async (ctx) => {
  const produk = ctx.match[1];
  const userId = ctx.from.id;
  userHarga[userId][produk] += 5000;
  await ctx.answerCbQuery("Harga naik 5.000");
  return updateProduk(ctx, produk);
});

bot.action(/kurang_(.+)/, async (ctx) => {
  const produk = ctx.match[1];
  const userId = ctx.from.id;
  if (userHarga[userId][produk] > 5000) userHarga[userId][produk] -= 5000;
  await ctx.answerCbQuery("Harga turun 5.000");
  return updateProduk(ctx, produk);
});

async function updateProduk(ctx, produk) {
  switch(produk) {
    case "md": return showProduct(ctx, "md", "Script MD", "Source code Multi Device siap pakai + Panel Support", 50000);
    case "bug": return showProduct(ctx, "bug", "Script Bug", "Source code Bug WhatsApp siap pakai", 75000);
    case "pt": return showProduct(ctx, "pt", "PT Pribadi", "Private Tools Premium dengan update rutin", 100000);
    case "panel": return showProduct(ctx, "panel", "Panel Unli", "Panel Unlimited untuk deploy bot/project", 30000);
    case "base": return showProduct(ctx, "base", "All Base", "Kumpulan base bot premium siap edit", 40000);
    case "func": return showProduct(ctx, "func", "Function Script", "Koleksi function siap pakai", 25000);
    case "ptbiasa": return showProduct(ctx, "ptbiasa", "PT Biasa", "Private Tools versi hemat dengan support", 50000);
    case "jasa": return showProduct(ctx, "jasa", "Jasa Buat Script", "Kami membuat script custom sesuai permintaan", 150000);
  }
}

// ==========================
// RUN BOT
// ==========================
bot.launch();
console.log("Bot berjalan...");

process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
