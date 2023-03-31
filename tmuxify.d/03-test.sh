#!/bin/bash
while true; do
    yarn build:test && yarn test
    sleep 0.2
    make wait
done
