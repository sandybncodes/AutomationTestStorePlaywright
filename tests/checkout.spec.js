// @ts-nocheck
const { test, expect, chromium} = require('@playwright/test');

const URL = "https://automationteststore.com/";
const LOGIN_URL = "https://automationteststore.com/index.php?rt=account/login";
const ACCOUNT_URL = 'https://automationteststore.com/index.php?rt=account/account';
const LOGIN_REGISTER_BUTTON = 'Login or register';

const LOGIN_NAME_ID = '[id="loginFrm_loginname"]';
const PASSWORD_ID = '[id="loginFrm_password"]';
const LOGIN_BUTTON = '[title="Login"]';

// valid account login
const VALID_LOGIN_NAME = 'Alexandru_Bolocan';
const VALID_PASSWORD = 'pass1234';

async function go_to_login(page) {
    await page.goto(URL);
    await page.getByRole('link', { name: LOGIN_REGISTER_BUTTON }).click();
}

async function login(page, username, password) {
    await page.locator(LOGIN_NAME_ID).fill(username);
    await page.waitForTimeout(1000);
    await page.locator(PASSWORD_ID).fill(password);
    await page.waitForTimeout(1000);
    await page.locator(LOGIN_BUTTON).click();
    await page.waitForTimeout(1000);
}

async function checkout(page) {
    await page.getByRole('link', { name: 'Apparel & accessories' }).click();
    await page.waitForTimeout(1000);
    await page.locator('#maincontainer').getByRole('listitem').filter({ hasText: 'T-shirts' }).getByRole('link').first().click();
    await page.waitForTimeout(1000);
    await page.getByRole('link', { name: '' }).first().click();
    await page.waitForTimeout(1000);
    await page.getByRole('link', { name: ' Add to Cart' }).click();
    await page.waitForTimeout(1000);
    await page.locator('#cart_checkout1').click();
    await page.waitForTimeout(1000);
    await page.locator('#checkout_btn').click();
}

test('LOG_ACC_001: go to login page', async({ page }) => {
    await go_to_login(page);
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(LOGIN_URL);
});

test('LOG_ACC_002: login with valid credentials', async({ page }) => {
    await go_to_login(page);
    await page.waitForTimeout(1000);
    await login(page, VALID_LOGIN_NAME, VALID_PASSWORD);
    await expect(page).toHaveURL(ACCOUNT_URL);
});

test('LOG_ACC_003: login with valid username and wrong password', async({ page }) => {
    await go_to_login(page);
    await page.waitForTimeout(1000);
    await login(page, VALID_LOGIN_NAME, WRONG_PASSWORD);
    await expect(page.locator(ERR_MESSAGE_CLASS)).toBeVisible();
    await expect(page.locator(ERR_MESSAGE_CLASS)).toContainText(ERR_MESSAGE);
});

test('LOG_ACC_004: login with wrong username and valid password', async({ page }) => {
    await go_to_login(page);
    await page.waitForTimeout(1000);
    await login(page, WRONG_LOGIN_NAME, VALID_PASSWORD);
    await expect(page.locator(ERR_MESSAGE_CLASS)).toBeVisible();
    await expect(page.locator(ERR_MESSAGE_CLASS)).toContainText(ERR_MESSAGE);
});

test('LOG_ACC_005: login with wrong username and wrong password', async({ page }) => {
    await go_to_login(page);
    await page.waitForTimeout(1000);
    await login(page, WRONG_LOGIN_NAME, WRONG_PASSWORD);
    await expect(page.locator(ERR_MESSAGE_CLASS)).toBeVisible();
    await expect(page.locator(ERR_MESSAGE_CLASS)).toContainText(ERR_MESSAGE);
});

test('CH_001: buy a product', async({ page }) => {
    await go_to_login(page);
    await page.waitForTimeout(1000);
    await login(page, VALID_LOGIN_NAME, VALID_PASSWORD);
    await expect(page).toHaveURL(ACCOUNT_URL);
    await checkout(page);
});