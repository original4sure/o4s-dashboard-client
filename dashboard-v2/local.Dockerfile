# FROM node:16 as v2
# WORKDIR /o4s-dashboard-v2
# COPY PACKAGE JSON TO IMAGE
# COPY package*.json ./
# INSTALL DEPENDENCIES
# RUN npm install
# COPY REST OF THE FILES
# COPY . .
# COPY ./dist ./dist


# BUILD THE PROJECT
# RUN npm run build


# LETS SERVE FILE USING NGINX HTTP SERVER
FROM nginx:alpine as http-server

## REMOVE CURRENT DEFAULT HTTP FILES
RUN rm -rf /usr/share/nginx/html/*

# COPY THE DASHBOARD  V2 STATIC FILES
# COPY --from=v2 /o4s-dashboard-v2/dist /usr/share/nginx/html
RUN mkdir -p /usr/share/nginx/html/v2
COPY ./o4s-dashboard-client/dashboard-v2/dist /usr/share/nginx/html/v2
COPY ./clients/o4s-dashboard/dist /usr/share/nginx/html

COPY ./o4s-dashboard-client/dashboard-v2/.nginx/nginx.conf /etc/nginx/nginx.config

EXPOSE 80


