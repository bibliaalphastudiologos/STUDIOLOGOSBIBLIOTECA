# Auditoria de completude dos eBooks

Data: 2026-05-14

## Resultado

- Catálogo bruto auditado: 1100 itens.
- Catálogo público após correção: 1012 obras.
- Obras em quarentena técnica: 88.
- Obras públicas curtas sem fonte integral: 0.

## Regra aplicada

Uma obra só aparece publicamente se:

- for produto próprio/especial; ou
- tiver texto local com pelo menos 600 palavras; ou
- possuir `importSource` técnico validado para carregar texto integral no leitor Studio Logos.

Obras sem texto suficiente e sem fonte segura foram removidas da estante pública até revisão.

## Correções realizadas

- 24 obras curtas receberam fonte técnica do Project Gutenberg.
- O proxy Gutenberg passou a aceitar também URLs `/ebooks/{id}.txt.utf-8`.
- O importador do leitor passou a tentar mais formatos oficiais do Gutenberg.
- O timeout de importação foi ampliado para reduzir falhas em livros grandes.

## Observação editorial

Não foram criados capítulos artificiais para obras sem fonte integral. Esses itens permanecem em quarentena para evitar prometer leitura completa quando a fonte ainda não foi validada.

