<div align="center">
<h2> Wooster </h2>

<img src="./public/wooster-face-front-no-bg-alt.png" alt="Wooster Logo" width="200"/>

## AI-Powered Trip Planning

Leverage AI-generated trip recommendations, explore the world with an interactive 3D globe, and build detailed, personalized itineraries.

![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)
![Tests: Passing](https://img.shields.io/github/actions/workflow/status/joshuaisaact/Wooster/test.yml?branch=main&label=tests&style=flat-square&logo=github)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/joshuaisaact/wooster/deploy.yml?label=Build%20%26%20Deploy)
![Deployed on Digital Ocean](https://img.shields.io/badge/Deployed%20on-Digital%20Ocean-0070B8?style=flat&logo=digitalocean)

![Demo GIF](./docs/videos/wooster.gif)

[![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Context API](https://img.shields.io/badge/contextapi-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/docs/context.html)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Threejs](https://img.shields.io/badge/threejs-black?style=for-the-badge&logo=three.js&logoColor=white)](https://threejs.org/)
[![Vitest](https://img.shields.io/badge/-Vitest-252529?style=for-the-badge&logo=vitest&logoColor=FCC72B)](https://vitest.dev/)

## Backend Repository

The backend for this project powers AI recommendations, manages user data, and integrates with external APIs.

<img src="./public/wooster-server.png" alt="Wooster Logo" width="250"/>

### [**Explore the Wooster Backend API and Server**](https://github.com/joshuaisaact/Wooster-server/tree/main#)

[![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)](https://expressjs.com/)
[![Supabase](https://img.shields.io/badge/supabase-3ECF8E?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)
[![PostgreSQL](https://img.shields.io/badge/postgresql-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Drizzle](https://img.shields.io/badge/drizzle-C5F74F?style=for-the-badge&logo=drizzle&logoColor=black)](https://orm.drizzle.team/)

</div>

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Testing Architecture](#testing-architecture)
- [Installation](#installation)
- [Development](#development)
- [Scripts](#scripts)
- [Contributing](#contributing)
- [License](#license)

## Overview

Wooster's frontend provides users with an interactive interface to explore destinations and plan trips. It includes an "Explore" page featuring a 3D globe where users can visualize destinations and trip details. The application fetches data from the Gemini backend via an Express.js API to generate trips and display detailed destination data.

## Key Features

1. **Explore Destinations**:

   - A 3D interactive globe using `three.js` and `globe.gl`.
   - Leaflet integration for detailed maps and destination exploration.

2. **Trip Planning**:

   - AI-powered trip generation using Gemini.
   - Interactive forms and suggestions powered by React Hook Form and Zod for input validation.

3. **Responsive Design**:

   - Tailwind CSS for dynamic styling and responsive layout.

4. **State Management**:

   - Centralized state management using React's reducer pattern.

5. **Destination Summaries**:

   - Fetch and display detailed summaries for each destination based on AI-generated data.

6. **User Trips**:

   - View planned trips and explore detailed trip itineraries with a focus on user-friendly navigation.

7. **AI art**:

   - Dog art generated using Stable Diffusion.

## Testing Architecture

The project employs a comprehensive testing strategy using modern testing tools and practices:

### Testing Stack

- **Vitest**: Main testing framework, chosen for its excellent Vite integration and improved performance over Jest
- **Testing Library**: For testing React components with a focus on user behavior
- **Mock Service Worker (MSW)**: For intercepting and mocking API requests at the network level
- **Jest DOM**: For extended DOM element matchers

### Testing Approach

1. **API Mocking**:

- MSW intercepts HTTP requests during tests
- Realistic API simulation with proper response structures
- Error scenarios handled within route handlers
- Network-level mocking instead of function mocks

2. **Component Testing**:

- Integration tests using Testing Library
- Focus on user interactions and behavior
- Accessibility testing built into component tests

3. **Unit Testing**:

- Utility functions tested in isolation
- Type validation using TypeScript
- Edge cases covered with extensive test suites

## Installation

To get started with the Wooster frontend, clone the repository and install the required dependencies:

```bash
git clone https://github.com/yourusername/wooster-frontend.git
cd wooster-frontend
npm install
```

Ensure that you also have the backend service (Gemini) set up for API interaction.

## Development

To start the development server, run:

```bash
npm run dev
```

This will start a Vite-powered development environment with hot module reloading for seamless development.

## Scripts

- `npm run dev`: Start the development server.
- `npm run build`: Build the project for production (TypeScript compilation followed by Vite build).
- `npm run lint`: Lint the code using ESLint.
- `npm run lint:fix`: Automatically fix linting issues.
- `npm run format`: Format the code using Prettier.
- `npm run type-check`: Run TypeScript type checking without emitting any files.
- `npm run vitest`: Run Vitest testing suite
- `npm run vitest:full`: Run the Vitest testing suite in verbose mode, showing all test names (including passing tests).
- `npm run vitest:ui`: Open the Vitest interactive testing UI.
- `npm run test:coverage`: Run the Vitest testing suite with coverage reporting.

## Contributing

Contributions are welcome! If you'd like to improve the app, feel free to submit a pull request or file an issue. Please follow the established coding conventions and make sure all changes are thoroughly tested.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE.md) file for details.
