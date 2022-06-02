#!/bin/bash
cd /home/ubuntu/super-g
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
apt install -y nodejs
npm install
npm install pm2@latest -g