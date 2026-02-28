# Contributing to AI-ATS

Thank you for your interest in contributing to AI-ATS! This document provides guidelines and instructions for contributing.

## 🤝 How to Contribute

### Reporting Bugs

1. Check if the bug has already been reported in [Issues](https://github.com/rana16241-ac/ai-ats-free/issues)
2. If not, create a new issue with:
   - Clear title and description
   - Steps to reproduce
   - Expected vs actual behavior
   - Screenshots if applicable
   - Your environment (OS, Node version, browser)

### Suggesting Features

1. Check [Issues](https://github.com/rana16241-ac/ai-ats-free/issues) for existing feature requests
2. Create a new issue with:
   - Clear description of the feature
   - Use cases and benefits
   - Possible implementation approach

### Pull Requests

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```

3. **Make your changes**
   - Follow the existing code style
   - Add comments for complex logic
   - Update documentation if needed

4. **Test your changes**
   ```bash
   npm run dev
   # Test manually in browser
   ```

5. **Commit your changes**
   ```bash
   git commit -m "Add amazing feature"
   ```
   - Use clear, descriptive commit messages
   - Reference issues if applicable (#123)

6. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```

7. **Open a Pull Request**
   - Describe what you changed and why
   - Link related issues
   - Add screenshots for UI changes

## 📝 Code Style

### TypeScript/JavaScript
- Use TypeScript for type safety
- Use functional components with hooks
- Follow existing naming conventions
- Add JSDoc comments for complex functions

### CSS/Styling
- Use Tailwind CSS utility classes
- Keep custom CSS minimal
- Follow mobile-first approach

### File Organization
```
app/          # Next.js pages
lib/          # Utility functions and AI logic
components/   # Reusable React components
```

## 🧪 Testing

Currently, we don't have automated tests. When contributing:
- Test your changes manually
- Check different screen sizes
- Test with different resume formats
- Verify database operations work

## 🎯 Priority Areas

We especially welcome contributions in:

1. **UI/UX Improvements**
   - Better mobile responsiveness
   - Accessibility enhancements
   - Loading states and error handling

2. **AI Enhancements**
   - Better resume parsing
   - More accurate skill matching
   - Support for more file formats

3. **Features**
   - Email notifications
   - User authentication
   - Candidate management dashboard
   - Export to PDF/Excel

4. **Documentation**
   - Tutorials and guides
   - API documentation
   - Video walkthroughs

## 🚫 What Not to Contribute

- Breaking changes without discussion
- Features that require paid services
- Code that violates LinkedIn ToS
- Unnecessary dependencies

## 📜 Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow
- Focus on what's best for the project

## 🏆 Recognition

Contributors will be:
- Listed in README.md
- Mentioned in release notes
- Given credit in documentation

## 📞 Questions?

- Open a [Discussion](https://github.com/rana16241-ac/ai-ats-free/discussions)
- Comment on relevant issues
- Reach out to maintainers

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for making AI-ATS better! 🚀**