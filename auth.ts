import fs from "fs";
import { google } from "googleapis";
import path from "path";
import readline from "readline";

const TOKEN_PATH = path.join(".", "token.json");
const SCOPE = ["https://www.googleapis.com/auth/gmail.send"];

async function main() {
    const credentials = JSON.parse(
        fs.readFileSync("./credentials.json", "utf8"),
    );
    const { client_secret, client_id, redirect_uris } = credentials.installed;

    const oAuth2Client = new google.auth.OAuth2(
        client_id,
        client_secret,
        redirect_uris[0],
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
