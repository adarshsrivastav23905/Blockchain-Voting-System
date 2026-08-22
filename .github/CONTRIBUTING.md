# Contributing to Blockchain-Based Voting System

## Getting Started

1. Fork the repository
2. Clone your fork
3. Create a feature branch (`git checkout -b feature/amazing-feature`)
4. Install dependencies: `npm run install:all`

## Development Workflow

1. Start local Ethereum node: `npm run contracts:node`
2. Deploy contracts: `npm run contracts:deploy`
3. Start backend: `npm run backend:dev`
4. Start frontend: `npm run frontend:dev`

## Testing

- Run contract tests: `npm run contracts:test`
- Run test coverage: `npm run contracts:test -- --coverage`

## Code Style

- Use TypeScript for all new code
- Follow naming conventions (camelCase for variables, PascalCase for types/classes)
- Add comments for complex logic
- Write tests for new features

## Smart Contract Guidelines

- All state-changing functions should have proper access control
- Implement reentrancy protection where needed
- Emit events for important actions
- Include extensive inline documentation

## Pull Request Process

1. Update README.md with any new features
2. Run tests locally to ensure everything passes
3. Push to your feature branch
4. Create a Pull Request with clear description
5. Request review from maintainers

## Security

If you find a security vulnerability, please email us privately instead of opening a public issue.
