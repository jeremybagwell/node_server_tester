#!/bin/sh

start=$(date +%s.%N)

node ./node_server_tester.js

# done
end=$(date +%s.%N)
runtime=$(echo "$end-$start" | bc)
echo "Test Complete in $runtime seconds"