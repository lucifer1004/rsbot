# rsbot

A command line tool for RS and GIS users.

## Install dependencies

```sh
git clone https://github.com/lucifer1004/rsbot
cd rsbot
yarn install
```

## Build execution binary

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

## Use

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
