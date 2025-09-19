#!/bin/bash

PLUGIN_PATH=$(pwd)/node_modules/.bin/protoc-gen-ts_proto
PROTO_DIR=$(pwd)/src/grpc/proto
OUT_DIR=$(pwd)/src/grpc/generated

mkdir -p $OUT_DIR

protoc \
  --plugin=protoc-gen-ts_proto=$PLUGIN_PATH \
  --ts_proto_out=$OUT_DIR \
  --ts_proto_opt=outputServices=grpc-js,useOptionals=messages \
  -I $PROTO_DIR \
  $PROTO_DIR/*.proto
