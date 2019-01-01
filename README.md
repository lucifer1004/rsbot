# rsbot

A command line tool for RS and GIS users.

## Capabilities

### Merge

Use `gdal_merge.py` under hood. Make it easier to merge several image files in
the same directory that share part of their names.

---

## How to install and run rsbot

### Install dependencies

```sh
git clone https://github.com/lucifer1004/rsbot
cd rsbot
yarn install
```

### Build execution binary

```sh
# For MacOS
yarn package:mac

# For Windows
yarn package:win

# For Linux
yarn package:linux

# Build all
yarn package
```

### Run

```sh
### Use source file directly
node /path/to/rsbot.js

### Use built binary
# Mac
./dist/rsbot

# Windows
./dist/rsbot.exe

# Linux
./dist/rsbot-linux
```
