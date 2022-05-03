# build environment
FROM node:12.16.1 as build
RUN mkdir -p /home/node/app/node_modules && chown -R node:node /home/node/app
WORKDIR /home/node/app
COPY ./package.json ./
#COPY ./tsconfig.json ./
USER node
RUN npm install
COPY --chown=node:node . ./
RUN npm run build


# production environment
FROM nginx:1.19.3
COPY --from=build /home/node/app/build /usr/share/nginx/html
# new
COPY ./deployment/nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

