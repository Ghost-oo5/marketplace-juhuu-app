<<<<<<< HEAD
# Project README

## Introduction

This project is a Next.js 14 web application leveraging Server-Side Rendering (SSR) and TypeScript. It's designed to run on Node.js version 20 or higher to ensure compatibility and performance. The application is automatically deployed to DigitalOcean upon any commits to the main branch, which acts as the production branch.

## Prerequisites

- Node.js v20 or higher
- npm (usually comes with Node.js)

## Development Workflow

### Cloning the Repository

To start working on the project, clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-name>
```

### Working with Branches

For any new features or bug fixes, please create a separate branch:

```bash
git checkout -b feature/<feature-name>
```

or

```bash
git checkout -b bugfix/<bug-name>
```

This approach ensures that the main branch remains stable and deployment-ready at all times.

### Installing Dependencies

After cloning the repository and navigating to the project directory, install the required dependencies:

```bash
npm install
```

### Local Development

You can start the development server to see your changes in real-time:

```bash
npm run dev
```

This command starts the Next.js development server, allowing you to test your application in a local environment.

### Testing Locally Before Merging

Before merging your changes into the main branch, ensure that your application builds correctly with Next.js:

```bash
npm run build
```

This command builds the application for production usage. It's crucial to run this locally to catch any potential build issues before deploying to production.

### Merging into Main

Once your feature or bugfix is ready and tested locally:

1. Push your branch to the remote repository:

```bash
git push origin feature/<feature-name>
```

2. Create a pull request from your branch to the main branch.
3. After reviewing and approving the pull request, merge it into the main branch.

### Deployment

The application is automatically deployed to DigitalOcean when changes are pushed to the main branch. Ensure that your changes are thoroughly tested before merging to avoid deployment issues.

## Contribution Guidelines

- Always create a new branch for your work.
- Test your changes locally before pushing to the main branch.
- Follow the coding standards and guidelines provided in the project documentation.
- Ensure your commits are meaningful and describe the changes made.

## Support

For any questions or issues, please open an issue on the GitHub repository, and a project maintainer will assist you.
=======
# Project README

## Introduction

This project is a Next.js 14 web application leveraging Server-Side Rendering (SSR) and TypeScript. It's designed to run on Node.js version 20 or higher to ensure compatibility and performance. The application is automatically deployed to DigitalOcean upon any commits to the main branch, which acts as the production branch.

## Prerequisites

- Node.js v20 or higher
- npm (usually comes with Node.js)

## Development Workflow

### Cloning the Repository

To start working on the project, clone the repository to your local machine:

```bash
git clone <repository-url>
cd <repository-name>
```

### Working with Branches

For any new features or bug fixes, please create a separate branch:

```bash
git checkout -b feature/<feature-name>
```

or

```bash
git checkout -b bugfix/<bug-name>
```

This approach ensures that the main branch remains stable and deployment-ready at all times.

### Installing Dependencies

After cloning the repository and navigating to the project directory, install the required dependencies:

```bash
npm install
```

### Local Development

You can start the development server to see your changes in real-time:

```bash
npm run dev
```

This command starts the Next.js development server, allowing you to test your application in a local environment.

### Testing Locally Before Merging

Before merging your changes into the main branch, ensure that your application builds correctly with Next.js:

```bash
npm run build
```

This command builds the application for production usage. It's crucial to run this locally to catch any potential build issues before deploying to production.

### Merging into Main

Once your feature or bugfix is ready and tested locally:

1. Push your branch to the remote repository:

```bash
git push origin feature/<feature-name>
```

2. Create a pull request from your branch to the main branch.
3. After reviewing and approving the pull request, merge it into the main branch.

### Deployment

The application is automatically deployed to DigitalOcean when changes are pushed to the main branch. Ensure that your changes are thoroughly tested before merging to avoid deployment issues.

## Contribution Guidelines

- Always create a new branch for your work.
- Test your changes locally before pushing to the main branch.
- Follow the coding standards and guidelines provided in the project documentation.
- Ensure your commits are meaningful and describe the changes made.

## Support

For any questions or issues, please open an issue on the GitHub repository, and a project maintainer will assist you.
>>>>>>> 692540d5dfa2208507b8809e0a7a3d145f0a32ec
