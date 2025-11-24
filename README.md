# Generate Google Client Manually (OAuth2)

Este script permite gerar **Credentiais OAuth2** para ser utilizado durante o fluxo de autenticação a uma api da Google.

---

## 1. Pré-requisitos

Antes de executar o script, garante que tens:

* Node.js 18+
* NPM ou Yarn
* Conta Google configurada no **Google Cloud Console**
* Credenciais OAuth2 criadas no Google Cloud:

  * **Client ID**
  * **Client Secret**

---

## 2. Criar credenciais OAuth2

1. Acessa: [https://console.cloud.google.com/apis/credentials](https://console.cloud.google.com/apis/credentials)
2. Clica em **Create Credentials OAuth Client ID**
3. Tipo de aplicaçãoo: **Desktop Application**
4. Guarda:

   * CLIENT_ID
   * CLIENT_SECRET

---

## 3. Instalar dependências

No teu projeto:

```bash
npm install googleapis
```

---

## 5. Criar o ficheiro `.env`

Cria um `.env` na raiz:

```
GOOGLE_CLIENT_ID=seu_client_id
GOOGLE_CLIENT_SECRET=seu_client_secret
```

---

## 6. Executar o script

Se instalou o ts-node globalmente:

```bash
ts-node auth.ts
```

Ou usando npx (recomendado):

```bash
npx ts-node auth.ts
```

---

## 7. Processo de geração

1. O script exibirá um link de autenticação.
2. Abra no navegador.
3. Faça login com a sua conta Gmail.
4. Aceite a permissão.
5. O Google retornará um código.
6. Cole o código no terminal.
7. O script exibirá:

* `access_token`
* **refresh_token** (o mais importante)
* `scope`
* `expiry_date`

---

## 8. Guardar o Refresh Token

Depois de obté-lo, adicione no `.env`:

```
GOOGLE_REFRESH_TOKEN=seu_refresh_token_gerado
```

Agora já podes utilizar as APIs Google com OAuth2 no teu projeto TypeScript.

---

## 9. Utilização

Com o refresh token obtido, tens autenticação contínua para realizar qualquer requisição via Google APIs, sem precisar de pedir login ao utilizador.

---

