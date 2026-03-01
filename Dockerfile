FROM nginx:1.27-alpine

# Remove default config
RUN rm /etc/nginx/conf.d/default.conf

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/animasync.conf

# Copy static files
COPY index.html /usr/share/nginx/html/
COPY examples/ /usr/share/nginx/html/examples/
COPY assets/ /usr/share/nginx/html/assets/
COPY robots.txt /usr/share/nginx/html/
COPY sitemap.xml /usr/share/nginx/html/
COPY llms.txt /usr/share/nginx/html/
COPY llms-full.txt /usr/share/nginx/html/
COPY humans.txt /usr/share/nginx/html/
COPY agents.json /usr/share/nginx/html/
COPY .well-known/ /usr/share/nginx/html/.well-known/

# Prepare cache dirs for non-root and switch user
RUN chown -R nginx:nginx /var/cache/nginx /var/log/nginx && \
    mkdir -p /tmp/nginx && chown nginx:nginx /tmp/nginx && \
    sed -i 's|pid.*|pid /tmp/nginx/nginx.pid;|' /etc/nginx/nginx.conf

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s \
  CMD wget -qO /dev/null http://localhost/ || exit 1

USER nginx
