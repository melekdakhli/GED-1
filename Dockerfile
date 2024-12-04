# Étape de build
FROM node:18-alpine AS build

WORKDIR /app

# Copie des fichiers nécessaires
COPY package.json package-lock.json ./

# Installation des dépendances
RUN npm install

# Copie du reste du projet
COPY . .

# Build de l'application Angular
RUN npm run build --prod --verbose

# Étape finale
FROM nginx:alpine

COPY --from=build /app/dist/sakai-ng /usr/share/nginx/html


