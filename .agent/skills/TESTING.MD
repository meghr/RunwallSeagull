# Testing Skill - Runwal Seagull

## Test Isolation Principles

### 1. Each Test Suite is Self-Contained
Every test file should:
- **Setup its own data** in `beforeAll` or `beforeEach`
- **Cleanup its data** in `afterAll` or `afterEach`
- **Use unique prefixes** for all test data to avoid conflicts

### 2. Database State Management

```typescript
const PREFIX = "E2E_MYTEST_";  // Unique prefix for this test file

test.beforeAll(async () => {
    // STEP 1: Aggressive cleanup of any leftover data
    await prisma.user.deleteMany({ where: { email: { startsWith: PREFIX } } });
    await prisma.flat.deleteMany({ where: { flatNumber: { startsWith: PREFIX } } });
    await prisma.flat.deleteMany({ where: { building: { buildingCode: "UNIQUE_CODE" } } });
    await prisma.building.deleteMany({ where: { name: { startsWith: PREFIX } } });
    await prisma.building.deleteMany({ where: { buildingCode: "UNIQUE_CODE" } });

    // STEP 2: Create fresh test data with ALL required fields
    const building = await prisma.building.create({
        data: {
            name: PREFIX + "Building",
            buildingCode: "UNIQUE_CODE",  // Must be truly unique
            isActiveForRegistration: true, // IMPORTANT: Explicitly set!
        }
    });
});

test.afterAll(async () => {
    // STEP 3: Cleanup (mirror of beforeAll cleanup)
    await prisma.user.deleteMany({ where: { email: { startsWith: PREFIX } } });
    await prisma.flat.deleteMany({ where: { flatNumber: { startsWith: PREFIX } } });
    await prisma.flat.deleteMany({ where: { building: { buildingCode: "UNIQUE_CODE" } } });
    await prisma.building.deleteMany({ where: { name: { startsWith: PREFIX } } });
    await prisma.building.deleteMany({ where: { buildingCode: "UNIQUE_CODE" } });
});
```

### 3. Key Rules for Building Test Data

When creating buildings for registration tests, ALWAYS include:
```typescript
await prisma.building.create({
    data: {
        name: PREFIX + "Building",
        buildingCode: "UNIQUE_PREFIX_CODE",  // Use prefix-based unique codes
        isActiveForRegistration: true,       // REQUIRED for registration dropdown!
        totalFloors: 5,                      // Optional but good for realism
    }
});
```

### 4. Unique Code Naming Convention

| Test File | Prefix | Building Code Example |
|-----------|--------|----------------------|
| `registration.spec.ts` | `REG_E2E` | `REG_E2E` |
| `login.spec.ts` | `LOGIN_E2E` | `LOGIN_E2E` |
| `user-journey.spec.ts` | `E2E_JOURNEY_` | `E2EJN_BA1` |
| `admin-users.spec.ts` | `E2E_AUSR_` | `E2EAUSR_B1` |

### 5. Cleanup Order (Respecting Foreign Keys)

Always cleanup in this order:
1. Activity logs
2. Event registrations
3. Vehicles
4. Marketplace ads
5. Complaints (and related tables)
6. Notices
7. Events
8. Users (after clearing `approvedBy` self-references)
9. Flats
10. Buildings

### 6. Running Tests

```bash
# Run all tests
npm run test:e2e

# Run specific test file
npx playwright test __tests__/e2e/registration.spec.ts

# Run with UI for debugging
npx playwright test --ui

# View last report
npx playwright show-report
```

### 7. Debugging Failed Tests

1. Check the Playwright HTML report: `npx playwright show-report`
2. View the trace for a failing test: `npx playwright show-trace <trace.zip>`
3. Check screenshots in `playwright-results/`
4. Verify test data exists in database with Prisma Studio: `npx prisma studio`

### 8. Common Issues

| Issue | Cause | Solution |
|-------|-------|----------|
| Building not in dropdown | `isActiveForRegistration: false` | Explicitly set to `true` |
| Unique constraint error | BuildingCode conflict | Use PREFIX-based unique codes |
| Login fails after registration | User status is PENDING | Approve user in DB before login |
| Test timeout | Slow database or network | Increase timeout or check DB connection |
| Data left in DB after test | Missing `afterAll` cleanup | Add cleanup in `afterAll` |

## ⚠️ Important Checklist

Before committing an E2E test, ensure:
- [ ] Unique `PREFIX` defined (e.g., `E2E_MYTEST_`)
- [ ] `beforeAll` has cleanup AND seed steps
- [ ] `afterAll` has cleanup (mirror of beforeAll cleanup)
- [ ] Buildings have `isActiveForRegistration: true`
- [ ] Building codes use the PREFIX to be unique
- [ ] Cleanup order respects foreign key constraints

---

## 📱 Mobile Physical Device Testing

When testing on a physical mobile device connected to the same WiFi network:

### NEXTAUTH_URL Configuration

The `NEXTAUTH_URL` environment variable controls where NextAuth redirects after login.

| Testing Environment | NEXTAUTH_URL Value |
|---------------------|-------------------|
| Local Development (Desktop) | `http://localhost:3000` |
| Mobile Device Testing | `http://YOUR_LOCAL_IP:3000` (e.g., `http://192.168.29.140:3000`) |
| Production | `https://your-domain.vercel.app` |

### Steps for Mobile Testing

1. **Update `.env.local`**:
   - Change `NEXTAUTH_URL` to your local IP address
   - Example: `NEXTAUTH_URL="http://192.168.29.140:3000"`

2. **Restart dev server**: `npm run dev`

3. **On your phone**: Navigate to `http://YOUR_LOCAL_IP:3000`

4. **Important**: Both devices must be on the same WiFi network

### ⚠️ Before Pushing to Production

**ALWAYS revert NEXTAUTH_URL before deploying**:

- Change from: `http://192.168.29.140:3000` (local IP)
- Change to: `https://your-domain.vercel.app` (production URL)

### Pre-Production Checklist

- [ ] Change NEXTAUTH_URL from local IP back to production URL
- [ ] Verify `.env.local` changes are NOT committed to Git
- [ ] Test login flow redirects correctly on production URL
