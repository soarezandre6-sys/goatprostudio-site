# Entrega Digital Oficial — GOAT PRO Studio

## Estado atual

A página `https://goatprostudio.com.br/download/` foi criada no site oficial.

Visual aprovado: cabeçalho dourado **ENTREGA DIGITAL OFICIAL**, título **Seu GOAT PRO Studio, com download protegido**, formulário visível de e-mail da compra e chave serial, botão **Verificar compra e liberar download**, e três passos de entrega.

As funções `protected-download` e `kiwify-webhook` no Supabase foram preparadas para autorizar downloads apenas de licenças ativas. O webhook só inclui o link exclusivo no e-mail quando o instalador já estiver publicado; assim o sistema anterior de Kiwify/Drive continua válido até a troca.

## Como manter a hospedagem gratuita

O Supabase Free aceita **até 50 MB por arquivo**, embora tenha 1 GB de armazenamento total. Por isso o instalador comercial Build 650 (~179 MB) é dividido no GitHub Actions em **quatro partes privadas menores que 50 MB**.

No download, a página verifica a licença via Supabase, recebe URLs temporárias para as quatro partes, baixa as partes automaticamente, reúne no navegador e confere o hash SHA-256 do instalador completo. O comprador só clica em um botão, sem abrir quatro páginas.

**Cuidado com os limites gratuitos de transferência:** o plano Free inclui 5 GB de egress padrão + 5 GB de cached egress. Cada download de ~179 MB consome dados; se as cotas forem alcançadas, o serviço pode limitar downloads. Não há cobrança mensal planejada.

## O que falta para colocar em produção

1. No GitHub do repositório privado `soarezandre6-sys/astronight-android`, abra **Settings → Secrets and variables → Actions → New repository secret**.
2. Cadastre o segredo **SUPABASE_SERVICE_ROLE_KEY** com a **chave secreta do projeto Supabase `goat-pro-licensing`**, copiada exclusivamente do painel autorizado. Nunca cole a chave no código, mensagens de chat ou página web. É uma credencial privilegiada; só deve ficar como Secret.
3. No GitHub Actions do mesmo repositório, execute **Publish GOAT PRO Studio commercial download**. O workflow usa a Release `build-650-comercial`, valida o hash SHA-256, divide o instalador em partes e envia para o bucket privado `goat-pro-studio-updates`. Só depois de carregar com sucesso registra o instalador na tabela `goat_product_updates`.
4. Teste na página `/download/`: licença válida, licença inválida, arquivo baixado e SHA-256. Teste também recuperação com e-mail/chave serial e link exclusivo de um comprador.
5. **Só após sucesso dos testes** atualize a entrega da Kiwify ou a página de obrigado para enviar compradores a `https://goatprostudio.com.br/download/`, removendo os links antigos do Drive. A configuração do checkout exige ação na conta Kiwify (não foi alterada).
6. Depois, atualizar texto comercial do site para refletir a entrega direta ativa.

## Garantias

- **Não alterar** a Build 650 Comercial nem o sistema de ativação existente.
- O código fonte do aplicativo permanece privado.
- Os quatro arquivos ficam em bucket privado do Supabase, não em links públicos permanentes.
- A página HTML em si pode ser aberta por qualquer pessoa, mas o servidor só entrega URLs temporárias a compradores com licença ativa.
- O instalador só se torna utilizável com uma chave serial válida.
- O aviso do SmartScreen do Windows exige trabalho separado de assinatura digital; essa página não o elimina.

## Referências técnicas

- Workflow: `soarezandre6-sys/astronight-android/.github/workflows/publish-commercial-download-650.yml`
- Página: `soarezandre6-sys/goatprostudio-site/download/index.html`
- Banco: tabela `goat_product_updates.download_parts` e tabela privada `goat_download_links`
- Funções Supabase: `protected-download` e `kiwify-webhook`
