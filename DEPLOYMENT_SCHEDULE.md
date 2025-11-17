# Rust Workbook Scheduled Deployment Configuration

## Overview

This document explains how to set up scheduled deployments for periodic health checks and automated testing.

## Setting up Scheduled Deployment

### 1. Deploy Your Application

First, deploy your application using Replit's deployment feature:
1. Click the "Deploy" button in your Replit workspace
2. Choose "Scheduled Deployments"
3. Configure as described below

### 2. Configure Schedule

**Deployment Type**: Scheduled
**Schedule**: Every 2 hours (or custom CRON expression: `0 */2 * * *`)
**Command**: `./scripts/periodic-tests.sh`

### 3. Environment Variables

Ensure these environment variables are set in your deployment:
- `DATABASE_URL` - PostgreSQL connection string
- `SESSION_SECRET` - Session encryption key
- `NODE_ENV` - Set to "test" for health checks

### 4. What Gets Tested

The periodic health check (`periodic-tests.sh`) performs:
- Full test suite execution (39 tests)
- Database connectivity verification
- Piston API availability check
- Comprehensive health report generation

### 5. Monitoring

Check deployment logs to monitor health check results:
- ✅ Green checks indicate healthy systems
- ⚠️ Yellow warnings for degraded services
- ❌ Red crosses for critical failures

### 6. Alerts (Optional)

You can modify `scripts/periodic-tests.sh` to send alerts:
- Email notifications on failure
- Slack/Discord webhooks
- Custom monitoring integrations

## Manual Testing

If you need to run health checks manually:

```bash
# Run full health check
./scripts/periodic-tests.sh

# Quick test suite only
./scripts/run-tests.sh

# Continuous testing during development
./scripts/watch-tests.sh
```

## Rollback Strategy

If health checks fail after deployment:
1. Check the deployment logs for specific failures
2. Use Replit's checkpoint feature to rollback
3. Run `./scripts/pre-checkpoint.sh` before creating new checkpoints

## Schedule Recommendations

- **Production**: Every 2 hours
- **Staging**: Every 6 hours
- **Development**: On-demand only

## Notes

- Health checks run in the deployment environment, not your development workspace
- Failed health checks don't automatically rollback deployments
- Monitor the first few scheduled runs to ensure proper configuration