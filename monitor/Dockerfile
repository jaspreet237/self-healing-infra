FROM alpine:3.19

# Add multiple mirrors for reliability
RUN echo "https://dl-cdn.alpinelinux.org/alpine/v3.19/main" > /etc/apk/repositories \
 && echo "https://dl-cdn.alpinelinux.org/alpine/v3.19/community" >> /etc/apk/repositories \
 && apk update \
 && apk add --no-cache bash curl jq docker-cli wget tar

WORKDIR /app

# Install amtool (from Alertmanager release)
RUN wget https://github.com/prometheus/alertmanager/releases/download/v0.28.1/alertmanager-0.28.1.linux-amd64.tar.gz \
    && tar -xvzf alertmanager-0.28.1.linux-amd64.tar.gz \
    && mv alertmanager-0.28.1.linux-amd64/amtool /usr/local/bin/ \
    && chmod +x /usr/local/bin/amtool \
    && rm -rf alertmanager-0.28.1.linux-amd64*

# Copy monitoring script
COPY scripts/monitor_alerts.sh /app/monitor_alerts.sh
RUN chmod +x /app/monitor_alerts.sh

CMD ["/app/monitor_alerts.sh"]
