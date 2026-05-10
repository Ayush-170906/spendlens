# Tests

## Test File
src/__tests__/auditEngine.test.ts

## How to Run
npm test

## Test Coverage

| Test | What it covers | Status |
|------|---------------|--------|
| Zero savings for correct pricing | Correctly priced tool returns $0 savings | Pass |
| Detects overpaying | User paying more than official price is flagged | Pass |
| Downgrade recommendation | Small team on Business plan gets downgrade suggestion | Pass |
| Use case recommendation | ChatGPT for coding recommends Cursor | Pass |
| Annual = 12x monthly | Math consistency check | Pass |
| Multiple tools | Handles array of tools correctly | Pass |
| Free plan zero savings | Free plan users get no false savings | Pass |

## CI
Runs automatically on every push to main via .github/workflows/ci.yml
