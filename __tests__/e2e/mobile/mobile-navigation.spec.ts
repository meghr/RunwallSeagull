import { test, expect, devices } from "@playwright/test";

/**
 * Mobile Responsiveness Tests - Task 1.1
 * 
 * Tests for the mobile navigation implementation on the landing page.
 * Verifies hamburger menu, drawer functionality, and navigation links.
 */

// Use iPhone 12 viewport as default mobile device
const mobileViewport = { width: 390, height: 844 };
const tabletViewport = { width: 768, height: 1024 };
const desktopViewport = { width: 1280, height: 800 };

test.describe("Mobile Navigation Tests - Landing Page", () => {

    test.describe("Mobile Viewport (<768px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize(mobileViewport);
        });

        test("MOB-NAV-001: Hamburger menu icon is visible on mobile", async ({ page }) => {
            await page.goto("/");

            // Desktop nav should be hidden
            const desktopNav = page.locator('nav.hidden.md\\:flex');
            await expect(desktopNav).not.toBeVisible();

            // Hamburger menu button should be visible
            const hamburgerButton = page.locator('button[aria-label="Open menu"]');
            await expect(hamburgerButton).toBeVisible();
        });

        test("MOB-NAV-002: Clicking hamburger opens mobile drawer", async ({ page }) => {
            await page.goto("/");

            // Click hamburger menu
            await page.click('button[aria-label="Open menu"]');

            // Wait for drawer animation
            await page.waitForTimeout(350);

            // Verify drawer is open - check for Menu header
            await expect(page.locator('text=Menu').first()).toBeVisible();

            // Verify navigation links are visible
            await expect(page.locator('a[href="#notices"]').last()).toBeVisible();
            await expect(page.locator('a[href="#events"]').last()).toBeVisible();
            await expect(page.locator('a[href="#features"]').last()).toBeVisible();
            await expect(page.locator('a[href="#about"]').last()).toBeVisible();
            await expect(page.locator('a[href="#contact"]').last()).toBeVisible();
        });

        test("MOB-NAV-003: Login and Register buttons visible in drawer", async ({ page }) => {
            await page.goto("/");

            // Open drawer
            await page.click('button[aria-label="Open menu"]');
            await page.waitForTimeout(350);

            // Check for Login button in drawer
            const loginButton = page.locator('a[href="/login"] button').last();
            await expect(loginButton).toBeVisible();
            await expect(loginButton).toContainText("Login");

            // Check for Register button in drawer
            const registerButton = page.locator('a[href="/register"] button').last();
            await expect(registerButton).toBeVisible();
            await expect(registerButton).toContainText("Register");
        });

        test("MOB-NAV-004: Drawer closes on navigation link click", async ({ page }) => {
            await page.goto("/");

            // Open drawer
            await page.click('button[aria-label="Open menu"]');
            await page.waitForTimeout(350);

            // Click Features link
            await page.click('a[href="#features"]');
            await page.waitForTimeout(350);

            // Drawer should be closed - hamburger should say "Open menu" again
            const hamburgerButton = page.locator('button[aria-label="Open menu"]');
            await expect(hamburgerButton).toBeVisible();

            // Page should have scrolled to features section
            await expect(page).toHaveURL(/#features/);
        });

        test("MOB-NAV-005: Drawer closes on close button click", async ({ page }) => {
            await page.goto("/");

            // Open drawer
            await page.click('button[aria-label="Open menu"]');
            await page.waitForTimeout(350);

            // Click close button
            await page.click('button[aria-label="Close menu"]');
            await page.waitForTimeout(350);

            // Drawer should be closed
            const hamburgerButton = page.locator('button[aria-label="Open menu"]');
            await expect(hamburgerButton).toBeVisible();
        });

        test("MOB-NAV-006: Drawer closes on overlay click", async ({ page }) => {
            await page.goto("/");

            // Open drawer
            await page.click('button[aria-label="Open menu"]');
            await page.waitForTimeout(350);

            // Click on the overlay (left side of screen, away from drawer)
            await page.click('div.backdrop-blur-sm', { position: { x: 50, y: 300 } });
            await page.waitForTimeout(350);

            // Drawer should be closed
            const hamburgerButton = page.locator('button[aria-label="Open menu"]');
            await expect(hamburgerButton).toBeVisible();
        });

        test("MOB-NAV-007: Login navigation works from drawer", async ({ page }) => {
            await page.goto("/");

            // Open drawer
            await page.click('button[aria-label="Open menu"]');
            await page.waitForTimeout(350);

            // Click Login button
            await page.locator('a[href="/login"]').last().click();

            // Should navigate to login page
            await expect(page).toHaveURL(/\/login/);
        });

        test("MOB-NAV-008: Register navigation works from drawer", async ({ page }) => {
            await page.goto("/");

            // Open drawer
            await page.click('button[aria-label="Open menu"]');
            await page.waitForTimeout(350);

            // Click Register button
            await page.locator('a[href="/register"]').last().click();

            // Should navigate to register page
            await expect(page).toHaveURL(/\/register/);
        });

        test("MOB-NAV-009: Logo remains visible on mobile", async ({ page }) => {
            await page.goto("/");

            // Logo should be visible
            await expect(page.locator('text=Runwal Seagull').first()).toBeVisible();
        });

        test("MOB-NAV-010: Body scroll is prevented when drawer is open", async ({ page }) => {
            await page.goto("/");

            // Open drawer
            await page.click('button[aria-label="Open menu"]');
            await page.waitForTimeout(350);

            // Check body overflow style
            const bodyOverflow = await page.evaluate(() => {
                return window.getComputedStyle(document.body).overflow;
            });

            expect(bodyOverflow).toBe("hidden");

            // Close drawer
            await page.click('button[aria-label="Close menu"]');
            await page.waitForTimeout(350);

            // Body scroll should be restored
            const bodyOverflowAfter = await page.evaluate(() => {
                return window.getComputedStyle(document.body).overflow;
            });

            expect(bodyOverflowAfter).not.toBe("hidden");
        });
    });

    test.describe("Desktop Viewport (>=768px)", () => {
        test.beforeEach(async ({ page }) => {
            await page.setViewportSize(desktopViewport);
        });

        test("MOB-NAV-011: Desktop navigation visible, hamburger hidden", async ({ page }) => {
            await page.goto("/");

            // Desktop nav should be visible
            const desktopNavLinks = page.locator('nav.hidden.md\\:flex a');
            await expect(desktopNavLinks.first()).toBeVisible();

            // Hamburger should be hidden
            const hamburgerButton = page.locator('button[aria-label="Open menu"]');
            await expect(hamburgerButton).not.toBeVisible();
        });

        test("MOB-NAV-012: All navigation links visible in desktop nav", async ({ page }) => {
            await page.goto("/");

            // Check all navigation links are visible
            await expect(page.locator('nav.hidden.md\\:flex a[href="#notices"]')).toBeVisible();
            await expect(page.locator('nav.hidden.md\\:flex a[href="#events"]')).toBeVisible();
            await expect(page.locator('nav.hidden.md\\:flex a[href="#features"]')).toBeVisible();
            await expect(page.locator('nav.hidden.md\\:flex a[href="#about"]')).toBeVisible();
            await expect(page.locator('nav.hidden.md\\:flex a[href="#contact"]')).toBeVisible();
        });

        test("MOB-NAV-013: Login and Register buttons in desktop nav", async ({ page }) => {
            await page.goto("/");

            // Check Login button is visible in header
            const loginButton = page.locator('nav.hidden.md\\:flex a[href="/login"]');
            await expect(loginButton).toBeVisible();

            // Check Register button is visible in header
            const registerButton = page.locator('nav.hidden.md\\:flex a[href="/register"]');
            await expect(registerButton).toBeVisible();
        });
    });

    test.describe("Responsive Breakpoint Transitions", () => {
        test("MOB-NAV-014: Nav switches correctly between mobile and desktop", async ({ page }) => {
            // Start at mobile
            await page.setViewportSize(mobileViewport);
            await page.goto("/");

            // Should see hamburger
            await expect(page.locator('button[aria-label="Open menu"]')).toBeVisible();

            // Resize to desktop
            await page.setViewportSize(desktopViewport);
            await page.waitForTimeout(200);

            // Should see desktop nav, hamburger hidden
            await expect(page.locator('nav.hidden.md\\:flex a').first()).toBeVisible();
            await expect(page.locator('button[aria-label="Open menu"]')).not.toBeVisible();

            // Resize back to mobile
            await page.setViewportSize(mobileViewport);
            await page.waitForTimeout(200);

            // Should see hamburger again
            await expect(page.locator('button[aria-label="Open menu"]')).toBeVisible();
        });
    });
});
