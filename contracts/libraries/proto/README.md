# about soltype

Due to pb gen sol only supports soltype field option defined in the same proto file. When we have multiple proto files that need soltype, it will break on go side. The short term solution is to manually sync proto files to go repo, and remove soltype related.

## proper solution

have a single file like soltype.proto define the field option, then other proto files just import it. pb gen sol need to parse imported proto and ExtName will have soltype.proto package prefix eg. opt.soltype instead of just soltype. unless all protos have same package which will cause issue for pb gen sol as it outputs .sol files based on proto package name.

or maybe we just register the fieldoption w/ proto team officially? still need to import another proto but package will be qubebridge.opt
https://github.com/protocolbuffers/protobuf/blob/master/src/google/protobuf/descriptor.proto#L325

# Generating Solidity bindings

From the project repo root, run:

```sh
protoc --sol_out=importpb=true:contracts/libraries contracts/libraries/proto/{filename}.proto
```

# Attention:
Before proceeding, please make sure you have built "pb3-gen-sol"
from https://github.com/QubeSwap/pb3-gen-sol

# First Install protoc
sudo snap install protobuf --classic

## Check version:
protoc --version

Then:
cd qubebridge-contracts

Then DO:
### bridge.proto:
protoc --sol_out=importpb=true:contracts/libraries contracts/libraries/proto/bridge.proto

### farming.proto:
protoc --sol_out=importpb=true:contracts/libraries contracts/libraries/proto/farming.proto

### pegged.proto:
protoc --sol_out=importpb=true:contracts/libraries contracts/libraries/proto/pegged.proto

### pool.proto:
protoc --sol_out=importpb=true:contracts/libraries contracts/libraries/proto/pool.proto

### sgn.proto:
protoc --sol_out=importpb=true:contracts/libraries contracts/libraries/proto/sgn.proto

### staking.proto:
protoc --sol_out=importpb=true:contracts/libraries contracts/libraries/proto/staking.proto


## Note:
proto files can have different package names, and generated .sol file name is proto package name.
