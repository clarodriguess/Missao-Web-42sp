#!/bin/bash
count=0
for arg in "$@"; do
    if [ $count -lt 3 ]; then
        echo "$arg"
    else
        break
fi
    count=$((count+1))
done