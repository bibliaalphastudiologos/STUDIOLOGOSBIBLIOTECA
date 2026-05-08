# Studio Logos: autenticação e Mercado Pago

Este projeto agora usa fluxo próprio do Studio Logos, separado da Bíblia Alpha.

## Firebase Auth

No Firebase Console do projeto usado pelo Studio Logos:

1. Ative Authentication > Sign-in method > Google.
2. Em Authentication > Settings > Authorized domains, inclua:
   - `studiologos.com.br`
   - `www.studiologos.com.br`
   - `sentinela-ai-489015.firebaseapp.com`
3. O app web deve usar o arquivo `firebase-applet-config.json`.

## Firestore

Coleções usadas pelo Studio Logos:

- `studio_users/{uid}`
- `studio_payment_access/{email_normalizado}`
- `studio_payments/{paymentId}`
- `studio_users/{uid}/notes/studiologos-ebook-progress`

Regra de liberação:

```text
payment_status = approved
access_status = active
```

O administrador também pode liberar manualmente no painel admin, que grava nas coleções próprias do Studio Logos.

Para aplicar as regras por CLI:

```powershell
firebase login:add
firebase use sentinela-ai-489015
firebase deploy --only firestore:rules --project sentinela-ai-489015
```

Para criar/liberar o administrador depois de obter o UID do usuário no Authentication:

```powershell
$env:FIREBASE_SERVICE_ACCOUNT_JSON='<json-da-service-account>'
$env:FIRESTORE_DATABASE_ID='ai-studio-d00d75cd-ea9b-4bf1-9db1-7ac14eff586f'
$env:STUDIO_ADMIN_UID='<uid-do-usuario>'
$env:STUDIO_ADMIN_EMAIL='analista.ericksilva@gmail.com'
node scripts/seed-studio-admin.mjs
```

## Mercado Pago

Configure no servidor:

```text
MERCADO_PAGO_ACCESS_TOKEN=
MERCADO_PAGO_WEBHOOK_SECRET=
FIREBASE_SERVICE_ACCOUNT_JSON=
FIRESTORE_DATABASE_ID=ai-studio-d00d75cd-ea9b-4bf1-9db1-7ac14eff586f
```

Webhook público:

```text
https://studiologos.com.br/api/mercadopago-webhook/index.php
```

Nunca liberar pelo retorno visual do checkout. O webhook consulta a API real do Mercado Pago e só libera quando o status confirmado for `approved`.
