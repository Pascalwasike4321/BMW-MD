const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMEp1d1Jyb05UM2RtOUR3ckxsaFpnTFAwRmhxanhZS2xlQkg1cFRBb08wST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUzY0VzFTR2E2bm01VlpZbituUTNWZlJPUWh1VG4za1ZYbFVkeXcya2pqbz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJlTWh0Z25lQWR2QXo1U0JuVHRGYTNhbEViV0tCY3BEWmkvcGNJalZFcm5rPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJrUEg1cmIxN01NeDcwejNUQUpuaTJnZ2NqcWtRa0dqUW0zeDRHMElrMkNBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkdGaE5TVU9DK0d4QUtFSnIwTzN0bDAyVEJJdzVjeUp0Tm05R0RGSjVjMzQ9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkR5bndtQUZWRjVidDJoYmtYY09KQlFrcXhiV3B3N2QrVloxcGdTT2VWSG89In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiUUtVdXNIM280WFd3OExOMnFVSktGcDBVc3NBekw2K0lCR3hUUk5Cb2Qxcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiaXViMTIrMTJ0TXl4dUxyRjgxRUtxandTZ0dYTndWOTE1cmRlSGVQT09uVT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkxaQUJwL3p1MHJpMFFiTmVTZDc5MjhDeTZrMm5tZlVZVnA0SEczSnk5UFJlNE4ra1ZoSjNyMDkvMFRBMXNaR0diYXBjcTZZOVhBQlFlVEtzc09LZGlnPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjE3LCJhZHZTZWNyZXRLZXkiOiIxZk5uRmZaMjg2YllOckMwMm5URGV3MkV1L01IaWk2THNHSTgzeEk3SjZNPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJUUHQ1QWlGNlR6U0FrSWR3T19QREJnIiwicGhvbmVJZCI6IjAyNDEwYzkxLWQ0MjgtNDRhNS05YzFkLThkNTFkYzMzNDhiYSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPa2dXVXE5bUdtbVJQbjJzV2JqWGNZZlVJdms9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRWMvUHVQa2Y5S2JmbVRXamdkZ3hiaWc0cHdzPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkdHTlY1UjUzIiwibWUiOnsiaWQiOiIyNTQ3MTQ0ODAxNjI6ODZAcy53aGF0c2FwcC5uZXQifSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0tIQS85d0hFTmpCNWJRR0dDMGdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6IjN2SEgzU3JJS2JoR21SK3p0dHNmNjI0OU91cE5FazhjaDhVT09xOEpid3M9IiwiYWNjb3VudFNpZ25hdHVyZSI6IkRha0hGemtxVmdOL3AyQlA1N0tmSXpXd1ZQdzJZb2ZQazVERGpELzdUbVN0T3JSdUs4SkM0YXBPRnNrVW5LUG5TNkx4ak9hQmtOYXlGRXE4eGhNR0FnPT0iLCJkZXZpY2VTaWduYXR1cmUiOiJGeUFBRHBJdFI3anIwdmdsdDF2eXZPbTZTWUh3SHdGdEVSZ3dSMXpUaUM5Y2VWZmlseGdkeFNxaXZPUUJLdzNoTGMyK2pNTmxndU5ieHpLeFlJWkhqUT09In0sInNpZ25hbElkZW50aXRpZXMiOlt7ImlkZW50aWZpZXIiOnsibmFtZSI6IjI1NDcxNDQ4MDE2Mjo4NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJkN3h4OTBxeUNtNFJwa2ZzN2JiSCt0dVBUcnFUUkpQSElmRkRqcXZDVzhMIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIxMzI3ODQ1LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUFONyJ9',
    PREFIXE: process.env.PREFIX || ".",
    OWNER_NAME: process.env.OWNER_NAME || "Ibrahim Adams",
    NUMERO_OWNER : process.env.NUMERO_OWNER || " Ibrahim Adams",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'BMW_MD',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/17c83719a1b40e02971e4.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'no',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
