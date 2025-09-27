# DEPENDENCIES INSTALLATION
FROM node:22-alpine AS deps

WORKDIR /usr/src/app

COPY package.json ./
COPY package-lock.json ./

RUN npm install


# BUILDER
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules

COPY . .

RUN npm run build
# Limpia la cache de npm para reducir el tamaño de la imagen y deja solo las dependencias de producción
RUN npm ci -f --only=production && npm cache clean --force 


# PRODUCTION IMAGE
FROM node:22-alpine AS prod

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app/node_modules ./node_modules
COPY --from=builder /usr/src/app/dist ./dist
COPY --from=builder /usr/src/app/package*.json ./

ENV NODE_ENV=production

# Usa un usuario no root para mayor seguridad
USER node

EXPOSE 3000

CMD ["node", "dist/main"]

