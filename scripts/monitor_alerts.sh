#!/bin/bash

AM_URL="http://alertmanager:9093"

echo "[INFO] Monitor started - watching Alertmanager at $AM_URL"

while true; do
    echo "[$(date)] Checking alerts..."
    alerts=$(amtool --alertmanager.url=$AM_URL alert query | grep -i "ServiceDown")

    if [ ! -z "$alerts" ]; then
        echo "[$(date)] Alert fired! Restarting service with Ansible..."
        docker run --rm \
          -v /var/run/docker.sock:/var/run/docker.sock \
          --network self-healing-infra_monitoring \
          self-healing-infra-ansible-runner
    fi

    sleep 30
done
