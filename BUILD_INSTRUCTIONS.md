# macOS Build & Cleanup Instructions

## How to Build the App (.dmg)

* Ensure you have the required paths and versions active in your terminal.
* Run the following commands from the project root:

  ```zsh
  # 1. Set Python 3.11 (required for node-gyp native dependencies)
  export PYTHON=/opt/homebrew/bin/python3.11

  # 2. Load nvm
  export NVM_DIR="$HOME/.nvm"
  [ -s "/opt/homebrew/opt/nvm/nvm.sh" ] && . "/opt/homebrew/opt/nvm/nvm.sh"

  # 3. Use Node 16
  nvm use 16

  # 4. Build the application codebase
  yarn run build

  # 5. Package the unsigned .dmg file
  yarn run dist-mac-unsigned
  ```

* Locate your deployed application at `release/Pomodoro Logger-<version>-arm64.dmg`.

## What We Installed

* **`nvm` (Node Version Manager)**: Installed via Homebrew (`brew install nvm`) to easily install and switch between older Node.js versions.
* **Node v16.20.2**: Installed via nvm (`nvm install 16`) because this project's dependencies (`jest`, `ts-jest`, etc.) fail on modern Node versions.
* **`python@3.11`**: Installed via Homebrew (`brew install python@3.11`) because building the `iconv` and `node-mac-permissions` packages relies on an old `node-gyp` version. That `node-gyp` version strictly requires the `distutils` Python module, which was entirely removed in Python 3.12 and newer.

## How to Uninstall / Clean Up (Future)

* **Remove Node 16**:
  ```zsh
  nvm uninstall 16
  ```
* **Uninstall Python 3.11** (if you don't need it for anything else):
  ```zsh
  brew uninstall python@3.11
  brew autoremove
  ```
* **Uninstall `nvm`** (if you no longer wish to manage Node versions this way):
  ```zsh
  brew uninstall nvm
  rm -rf ~/.nvm
  ```
  *(Remember to manually remove the `export NVM_DIR...` block from your `~/.zshrc` file if you had added it).*
* **Remove Project Artifacts** (to reclaim disk space):
  ```zsh
  rm -rf node_modules
  rm -rf release
  rm -rf dist
  ```
