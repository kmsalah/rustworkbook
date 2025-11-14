# Security Considerations

## Code Execution Security

This Rustlings IDE executes user-supplied Rust code on the server via the `/api/compile` endpoint. 

### Current Security Measures

- **Timeouts**: Compilation limited to 30 seconds, execution to 10 seconds
- **Temporary Isolation**: Each compilation uses a unique temporary directory
- **Automatic Cleanup**: Temporary files are deleted after compilation
- **Input Validation**: Code submissions are validated via Zod schemas

### Security Limitations

⚠️ **IMPORTANT**: The current implementation is **NOT sandboxed** and should only be used in:

- Personal/local development environments
- Single-user educational tools
- Trusted, authenticated learning platforms

### DO NOT USE in:

- ❌ Public-facing websites
- ❌ Multi-tenant applications
- ❌ Any environment with untrusted users

### Recommended Production Hardening

If deploying to production or multi-user environments, implement one of:

1. **Docker Sandboxing**
   ```typescript
   // Use Docker with resource limits and seccomp profiles
   const { stdout, stderr } = await execAsync(
     `docker run --rm --network=none --memory=128m --cpus=0.5 \\
       --security-opt seccomp=default.json rust:latest rustc code.rs`,
     { timeout: 30000 }
   );
   ```

2. **WebAssembly Execution**
   - Compile to WASM and execute in browser
   - No server-side code execution required
   - Tools: rust-wasm, wasm-pack

3. **Dedicated Sandbox Services**
   - Judge0 API
   - Piston API
   - Custom containerized execution services

4. **Firejail/Bubblewrap**
   ```bash
   firejail --noprofile --net=none --private rustc code.rs
   ```

## Additional Security Best Practices

- Implement rate limiting on the `/api/compile` endpoint
- Add user authentication and authorization
- Monitor resource usage and set per-user quotas
- Log all compilation requests for audit trails
- Use HTTPS in production
- Implement CSRF protection
- Set appropriate CORS policies

## Reporting Security Issues

If you discover a security vulnerability, please report it responsibly by contacting the maintainer directly rather than opening a public issue.
