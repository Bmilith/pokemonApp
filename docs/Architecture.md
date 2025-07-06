# 🧱 Architecture Documentation: Pokémon GO

.
├── .gitignore # Git ignored files
├── .prettierrc.json # Prettier config
├── eslint.config.js # ESLint config
├── index.html # App HTML entry point
├── jest.config.ts # Jest test configuration
├── package.json # Project metadata and scripts
├── package-lock.json # Dependency lock file
├── README.md # Project overview
├── tailwind.config.js # TailwindCSS config
├── tsconfig.json # TypeScript root config
├── tsconfig.app.json # App-specific TS config
├── tsconfig.node.json # Node-specific TS config
├── tsconfig.tsbuildinfo # TypeScript incremental build info
├── vite.config.ts # Vite build configuration
└── src/ # Application source code
├── assets/ # Static images, icons, fonts
├── components/ # Shared UI components
│ └── core/ # Atomic UI elements (Button, Card, Sidebar, etc.)
│ └── features/ # Feature-specific UI and logic
├── constants/ # Global constants (e.g., config, enums)
├── context/ # React context providers and initial values
├── hooks/ # Reusable custom React hooks
├── layouts/ # Page or section layout components
├── pages/ # Top-level route views
├── router/ # Routing configuration
├── services/ # Handles API calls, data fetching
├── storage/ # Local storage/session persistence helpers
├── types/ # TypeScript type declarations
├── utils/ # Helper functions, utilities
├── App.tsx # Root component
├── main.tsx # App entry point
├── i18n.ts # Internationalization setup
├── index.css # Global CSS/Tailwind styles
└── setupTests.ts # Vitest + React Testing Library setup
