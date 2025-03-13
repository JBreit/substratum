# Substratum

## Table of Contents

- [Substratum](#substratum)
  - [Table of Contents](#table-of-contents)
    - [Installation](#installation)
    - [Dependencies](#dependencies)
    - [NPM Package Mangement](#npm-package-mangement)
    - [Mono-Repository](#mono-repository)

### Installation

### Dependencies

### NPM Package Mangement

```bash
# Initialize Package
npm init --scope @innermindco --workspace ./packages/<package_name>

# Build package
npm run build --workspace ./packages/<package_name>

# Install Internal Packages
npm install @innermindco/server ./packages/<package_name> --save

# Install External Package
npm install package_name --workspace ./packages/server --save

# Install Internal Package to root ./src
npm install @innermindco/server @innermindco/<package_name> --save

# building the monorepo and all its packages
npm run build

# running the compiled index.js
node dist/main.js
```

### Mono-Repository
