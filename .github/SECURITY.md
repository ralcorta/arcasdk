# Security Policy

## Reporting Security Vulnerabilities

We take security seriously. If you discover a security vulnerability in arcasdk, please **do not** open a public issue. Instead, follow these steps:

### How to Report

1. **Email**: Send a detailed report to the repository maintainers (check CONTRIBUTING.md for contact info)
2. **Include**:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if you have one)

### What to Expect

- Acknowledgment of your report within 48 hours
- Regular updates on our progress
- Credit in security advisories (unless you prefer anonymity)
- Coordinated disclosure timeline

## Security Best Practices for Users

### For SDK Users

1. **Keep dependencies updated**:
   ```bash
   npm audit
   npm update
   ```

2. **Use in secure environments**:
   - Only use in trusted environments
   - Protect your credentials (certificates, keys)
   - Don't commit credentials to version control

3. **Certificate Management**:
   - Store certificates securely (e.g., environment variables, AWS Secrets Manager)
   - Use separate certificates for testing and production
   - Rotate certificates periodically

4. **Audit Logging**:
   - Log API calls for compliance
   - Monitor for unusual activity

## Supported Versions

| Version | Supported | Notes |
|---------|-----------|-------|
| 0.3.x   | ✅ Yes    | Current stable |
| 0.2.x   | ⚠️ Limited | Security fixes only |
| < 0.2   | ❌ No     | End of life |

## Known Issues

None currently reported. Check [GitHub Issues](https://github.com/ralcorta/arcasdk/issues) for any open discussions.

## Compliance

- **AFIP Integration**: Follows AFIP security guidelines for electronic invoicing
- **SSL/TLS**: Uses secure protocols for all communications
- **Input Validation**: All inputs are validated before processing

## Dependencies Security

We use:
- **npm audit** in CI/CD to detect vulnerabilities
- **Dependabot** for automated dependency updates
- Regular dependency reviews

