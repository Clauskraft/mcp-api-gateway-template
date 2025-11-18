# Contributing to MCP API Gateway Template

Thank you for your interest in contributing! This document provides guidelines for contributing to this project.

## How to Contribute

### Adding New API Configurations

1. Create a new file in `src/apis/` for your API configuration
2. Follow the existing pattern in `weather.ts` or `placeholder.ts`
3. Export your API configuration with proper TypeScript types
4. Add your API to the exports in `src/apis/index.ts`
5. Update the README with documentation about your new API

### Code Style

- Use TypeScript for all new code
- Follow the existing code structure and naming conventions
- Add JSDoc comments for public functions and types
- Ensure code is properly formatted

### Testing Your Changes

1. Build the project: `npm run build`
2. Test with Claude Desktop by updating your config
3. Verify all tools work as expected
4. Check for TypeScript errors: `npx tsc --noEmit`

### Submitting Changes

1. Fork the repository
2. Create a new branch for your changes
3. Make your changes following the guidelines above
4. Commit with clear, descriptive messages
5. Push to your fork and submit a pull request

### Pull Request Guidelines

- Provide a clear description of the changes
- Include examples of how to use new features
- Update documentation as needed
- Ensure the build passes
- Keep changes focused and minimal

## API Configuration Best Practices

When adding new APIs:

1. **Security**: Never commit API keys or secrets
2. **Documentation**: Provide clear descriptions for all endpoints and parameters
3. **Error Handling**: Consider edge cases and error scenarios
4. **Types**: Use proper TypeScript types for all parameters
5. **Testing**: Test thoroughly with Claude Desktop before submitting

## Questions?

Feel free to open an issue for:
- Questions about contributing
- Feature requests
- Bug reports
- General discussion

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on what's best for the community

Thank you for contributing to MCP API Gateway Template!
