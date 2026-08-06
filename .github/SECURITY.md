# Security Policy

## Reporting Security Vulnerabilities

If you discover a security vulnerability, please email **wagnerfjr@gmail.com** instead of using the issue tracker.

Please include:
- Description of the vulnerability
- Steps to reproduce
- Potential impact
- Suggested fix (if available)

## Security Best Practices

### Environment Variables
- Never commit `.env` files or secrets
- Use Vercel's environment variables for sensitive data
- Rotate tokens regularly
- Use OAuth where possible instead of API keys

### Code Security
- Keep dependencies updated: `npm audit fix`
- Review pull requests before merging
- Enable branch protection on main
- Require status checks to pass before merge

### Meta Business API
- Store `VITE_META_PIXEL_ID` in environment variables only
- Never expose access tokens in client-side code
- Use server-side requests for sensitive Meta API operations
- Implement rate limiting on backend endpoints

### Vercel Deployment
- Use preview deployments for testing PRs
- Require approval before production deploys
- Monitor deployment logs for errors
- Enable Vercel's security features (DDoS protection, WAF)

## Supported Versions

| Version | Status | Support Until |
|---------|--------|-----------------|
| 1.0.x   | Active | 2027-08-05      |

## Security Updates

Critical security updates will be released as patches. Subscribe to GitHub releases for notifications.

## Data Privacy

- User data is collected via Meta Pixel only
- No personal data is stored on our servers
- All data transfers use HTTPS/TLS
- Comply with GDPR and CCPA regulations

## Third-Party Dependencies

We use the following critical dependencies:
- React 18.x
- Vite 4.x
- TailwindCSS 4.x
- axios (for API requests)

Security updates for these are applied regularly.
