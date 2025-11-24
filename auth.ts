import fs from "fs";
import { google } from "googleapis";
import path from "path";
import readline from "readline";
import dotenv from "dotenv"

dotenv.config()

const TOKEN_PATH = path.join("/", "token.json");
const SCOPE = ["https://www.googleapis.com/auth/gmail.send"];

async function main() {
    
    if (!process.env.CLIENT_ID) {
        throw new Error("CLIENT_ID is not defined.")
    }

    if (!process.env.CLIENT_SECRET) {
        throw new Error("CLIENT_SECRET is not defined.")
    }

    if (!process.env.CLIENT_REDIRECT_URI) {
        throw new Error("CLIENT_REDIRECT_URI is not defined.")
    }

    const oAuth2Client = new google.auth.OAuth2(
        process.env.CLIENT_ID,
        process.env.CLIENT_SECRET,
        process.env.CLIENT_REDIRECT_URI,
    );

    const authUrl = oAuth2Client.generateAuthUrl({
        access_type: "offline",
        scope: SCOPE,
    });

    console.log("🔗 Autorize este app visitando este url:", authUrl);

    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });

    rl.question("Cole aqui o code do Google: ", async (code) => {
        try {
            const { tokens } = await oAuth2Client.getToken(code);
            oAuth2Client.setCredentials(tokens);

            fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens, null, 2));
            console.log("✅ Token salvo em:", TOKEN_PATH);

            rl.close();
        } catch (err) {
            console.error("❌ Erro ao trocar code pelo token:", err);
            rl.close();
        }
    });
}

main();
