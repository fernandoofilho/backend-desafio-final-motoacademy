# MotoDevice API

Projeto final do **Moto Academy 2.0**, promovido pelo **Instituto de Pesquisas Eldorado**.

Esta API, desenvolvida em **NestJS**, tem como objetivo fornecer uma interface para consulta de dispositivos Motorola, utilizando dados extraídos via *WebScraper* e enriquecidos com inteligência artificial (IA) por meio da API **Google Gemini**.

> ⚠️ O projeto é **read-only**, ou seja, não possui operações de *create*, *update* ou *delete*. A intenção é apenas exibir dados informativos sobre os devices.

---

## 🔍 Visão Geral

A API serve como backend da aplicação web [MotoDevice], permitindo a pesquisa e visualização de informações detalhadas sobre dispositivos da Motorola. Os dados foram coletados do site [phonedb.net] utilizando um scraper personalizado e são armazenados em uma base MongoDB.

Também foi implementada uma integração com modelos de linguagem (LLM), através da **API Gemini**, para fornecer explicações em linguagem natural e gerar relatórios sobre os dispositivos.

---

## 🚀 Tecnologias Utilizadas

- NestJS
- MongoDB (Atlas e Docker)
- Google Gemini API
- Docker / Docker Compose
- TypeScript
- REST

---

## 📁 Scripts

```json
"scripts": {
  "build": "nest build",
  "postbuild": "cp -r src/assets dist/",
  "format": "prettier --write \"src/**/*.ts\" \"test/**/*.ts\"",
  "start": "nest start",
  "start:dev": "nest start --watch",
  "start:debug": "nest start --debug --watch",
  "start:prod": "node dist/main",
  "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
  "test": "jest",
  "test:watch": "jest --watch",
  "test:cov": "jest --coverage",
  "test:debug": "node --inspect-brk -r tsconfig-paths/register -r ts-node/register node_modules/.bin/jest --runInBand",
  "test:e2e": "jest --config ./test/jest-e2e.json"
}
```

---

## ⚙️ Configuração do Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes **chaves**:

```env
MONGO_HOST=
APP_CLIENT=
GEMINI_API_KEY=
```

---

## 🐳 Usando Docker

Você pode executar o ambiente MongoDB localmente com Docker. Um exemplo de `docker-compose.yml` está disponível no projeto.

### Executar Mongo com Docker:

```bash
docker-compose up -d
```

---

## ✨ Funcionalidades

- 📱 Exibição de informações detalhadas dos dispositivos Motorola
- 🧠 Integração com IA para geração de descrições em linguagem natural
- 📄 Geração de relatórios
- 🔎 Busca inteligente por características dos devices
- 🎥 Busca automática por vídeos no YouTube
- 📊 Comparação de dispositivos (beta)

---

## 📦 Estrutura da API

- Baseada em **REST**
- Modularizada por `Modules`, `Controllers`, `Services`
- Comunicação assíncrona e injeção de dependência
- Integração com banco MongoDB via TypeORM/Mongoose

---

## 🚫 Contribuições

Este projeto **não aceita contribuições no momento**, pois se trata de um desafio fechado. No entanto, forks são bem-vindos!

---

## 📜 Licença

Este projeto foi desenvolvido como parte de um desafio técnico e não possui uma licença formal. Uso educacional e pessoal é permitido.
