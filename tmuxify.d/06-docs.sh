#!/bin/bash
while true; do
    make docs
    sleep 0.2
    make wait
done
