FROM nginx:alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/animasync.conf

# Copy static files (exclude unnecessary files)
COPY index.html /usr/share/nginx/html/
COPY examples/ /usr/share/nginx/html/examples/
COPY assets/ /usr/share/nginx/html/assets/
COPY robots.txt /usr/share/nginx/html/

EXPOSE 80
