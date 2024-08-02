FROM node:lts-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .

ARG VITE_USER_POOL_ID
ARG VITE_USER_POOL_CLIENT_ID
ENV VITE_USER_POOL_ID=$VITE_USER_POOL_ID
ENV VITE_USER_POOL_CLIENT_ID=$VITE_USER_POOL_CLIENT_ID

RUN npm run build

FROM nginx:stable-alpine AS production
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
