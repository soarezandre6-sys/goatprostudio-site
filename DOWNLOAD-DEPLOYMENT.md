# Entrega digital protegida - GOAT PRO Studio

Situação: **estrutura preparada, publicação da entrega direta pendente de hospedagem do instalador**.

## Recursos já configurados

- Página do site: https://goatprostudio.com.br/download/
- GitHub Pages (site): `download/index.html`
- Supabase Edge Function: `protected-download` (verifica licença ativa e entrega URL temporária)
- Banco: `goat_download_links` com token aleatório guardado por hash, validade de 365 dias e RLS fechado
- Webhook Kiwify: encaminha link exclusivo por e-mail **apenas quando houver instalador comercial publicado**; caso contrário, preserva o modelo anterior de e-mail com chave serial
- Recuperação do download por e-mail e chave serial, mesmo que o link exclusivo expire
- A Build 650 comercial não foi alterada

## Bloqueio atual

O instalador Build 650 COMERCIAL tem cerca de 179 MB. O projeto Supabase está no plano Free (limite de 50 MB por arquivo no Storage), mesmo que o bucket privado tenha limite próprio maior.

**Não execute o workflow de publicação enquanto o limite global do Storage for menor que o instalador.**
Escolha uma hospedagem que aceite um único arquivo de 179 MB com acesso privado e URL assinada (por exemplo, fazer upgrade do Supabase ou integrar outro serviço de armazenamento compatível).

O bucket `goat-pro-studio-updates` está privado e sem instaladores enviados.

## Etapas para habilitar a opção Supabase

1. Verificar ou aumentar o limite global de upload no painel Storage do Supabase, sem ultrapassar o limite do plano.
2. No repositório privado `soarezandre6-sys/astronight-android`, configurar o GitHub Actions secret `SUPABASE_SERVICE_ROLE_KEY` com o valor **somente no painel GitHub Secrets** (nunca incluir no repositório, chat, logs ou site).
3. Em Actions, executar `Publish GOAT PRO Studio commercial download`. Esse workflow baixa o instalador da Release privada, verifica SHA-256, publica o arquivo no bucket privado e só então ativa o registro de download.
4. Testar o link exclusivo de compra aprovada e o acesso alternativo por e-mail/chave com uma licença válida. Também testar chave inválida e licença revogada.
5. Quando os testes passarem, configurar a **página de obrigado do pagamento aprovado** na Kiwify (Produtos > GOAT PRO Studio > Configurações > Páginas de Obrigado), apontando para `https://goatprostudio.com.br/download/`. O caminho mais direto para cliente continua sendo o link exclusivo enviado no e-mail do serial.
6. Remover ou atualizar o material antigo do Google Drive na entrega Kiwify, depois que o novo download estiver comprovadamente funcional.
7. Ajustar o texto da página de vendas para indicar que o link exclusivo já está ativo.

## Proteção

A página HTML é pública como qualquer site estático; **o download do instalador não é público**. O servidor valida a compra ativa em todas as solicitações e devolve URL de armazenamento privado válida por cinco minutos. Se o comprador perdeu o link, utiliza o e-mail e a chave serial.

Avisos do Windows SmartScreen não são resolvidos por isso; necessitam assinatura digital de código e reputação da aplicação.
