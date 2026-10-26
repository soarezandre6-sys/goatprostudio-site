# Operação CHECKMATE — GOAT Cam Beta na Google Play

## Implantado em 26/10/2026
- Página pública: https://goatprostudio.com.br/goat-cam-beta/
- Entrada na página inicial, seção GOAT Cam, e na página de download de compradores.
- Supabase: tabela privada `public.goat_cam_beta_signups` (RLS ativo, sem grants anônimos).
- Supabase Edge Function: `goat-cam-beta-signup` para captura voluntária de e-mail da conta Google, escolha de perfil e consentimento.
- Confirmação automática por e-mail via Resend, se a chave existente estiver operacional; alerta para a caixa de suporte.
- NÃO cria automaticamente uma conta testadora no Google Play. Cadastro tem estado inicial `pending`.

## Como concluir a integração com o teste fechado
1. Abrir a Google Play Console > app `com.goatpro.ip` > Testar e lançar > Teste fechado > Gerenciar faixa > Testadores.
2. Conferir se já utiliza lista de e-mails ou Google Groups. Para escala, usar um Google Group como lista autorizada e definir regras de ingresso apropriadas.
3. **Concluído:** link de adesão/opt-in oficial recebido do proprietário e integrado ao site e e-mail do cadastro: https://play.google.com/apps/testing/com.goatpro.ip . Esse link não autoriza usuário sem associação ao Google Group.
4. Para lista de e-mails: acrescentar os cadastrados à lista em Testadores, salvar as mudanças, enviar aos usuários o link oficial para aceitar a participação e instalar pelo Google Play.
5. Para Google Groups: o interessado ingressa primeiro no grupo, e depois aceita o teste no link da Play; somente membros autorizados podem instalar.
6. Monitorar o número de **testadores inscritos no Google Play**; o total de inscrições no site NÃO é o número de testadores reconhecidos pelo Google.
7. **Concluído:** página atualizada com link oficial para membros do grupo. **Pendente:** confirmar se visitantes conseguem ingressar no Google Group, configurações de visibilidade, moderação e link oficial de entrada. Não confundir link de inscrição no site com opt-in válido na Play Console.
8. Testadores devem participar do teste fechado por pelo menos 14 dias consecutivos com 12 participantes antes de solicitar acesso à produção, conforme requisito da conta.

## Consultar inscrições (somente administrador)
```sql
select email, applicant_type, status, created_at
from public.goat_cam_beta_signups
order by created_at desc;
```
Para marcar o convite enviado: 
```sql
update public.goat_cam_beta_signups
set status = 'invited'
where email = '<email-google-validado>';
```

## Considerações de segurança
- Nunca publicar a chave de serviço do Supabase ou a chave Resend no front-end.
- A página apenas coleta consentimento para o teste; compradores têm o mesmo direito de cancelar participação.
- Não anunciar versão pública do GOAT Cam nem conexão automática garantida sem validação fim a fim.
- A assinatura beta não inclui gratuitamente a futura versão GOAT Cam Pro.
- Manter feedback privado via e-mail de suporte; não incentivar avaliações artificiais.

Fontes: https://support.google.com/googleplay/android-developer/answer/9845334
