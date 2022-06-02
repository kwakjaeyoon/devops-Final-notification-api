#!/bin/bash
cd /home/ubuntu/super-g

source /opt/env_access_key
source /opt/env_secret_key
source /opt/env_notify_url

pm2 start npm -- start