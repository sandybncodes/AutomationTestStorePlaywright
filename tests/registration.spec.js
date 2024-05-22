// @ts-nocheck
const { test, expect, chromium} = require('@playwright/test');

/*
    1. Important: Use different FIRST_NAME, LAST_NAME, EMAIL AND LOGIN for tests 2 and 3
    2. For test 4 you should use credentials for an existing account
    3. All data changes you can do in the constants declared in the registration details section 
*/

const URL = "https://automationteststore.com/";
const REGISTER_URL = "https://automationteststore.com/index.php?rt=account/create";
const ACCOUNT_SUCCESS_CREATED_URL = 'https://automationteststore.com/index.php?rt=account/success';
const LOGIN_REGISTER_BUTTON = 'Login or register';
const CONTINUE_REG_BUTTON = '[title="Continue"]';

// ======== registration details ======

// required fields values
const REQ_FIRST_NAME = 'Ion';
const REQ_LAST_NAME = 'Stog';
const REQ_EMAIL = 'ion_stog@gmail.com';
const REQ_ADDRESS_1 = 'Mountain 1/1';
const REQ_CITY = 'Bucuresti';
const REQ_REGION_STATE = 'Bucuresti';
const REQ_ZIP_CODE = '2080';
const REQ_COUNTRY = 'Romania';
const REQ_LOGIN_NAME = 'Ion_Stog';
const REQ_PASS_1 = 'pass1234';
const REQ_PASS_2 = 'pass1234';

// wrong required fields values
const REQ_WRONG_PASS_1 = 'wrongPassword_1'

// optional fields values
const OP_PHONE = '+37368987968';
const OP_FAX = '+373688578675';
const OP_COMPANY = 'Microsoft';
const OP_ADDRESS_2 = 'FIXIKI 22';

// required
const FIRST_NAME_ID = '[id="AccountFrm_firstname"]';
const LAST_NAME_ID = '[id="AccountFrm_lastname"]';
const EMAIL_ID = '[id="AccountFrm_email"]';
const ADDRESS1_ID = '[id="AccountFrm_address_1"]';
const CITY_ID = '[id="AccountFrm_city"]';
const REGION_STATE_ID = '[id="AccountFrm_zone_id"]';
const ZIP_CODE_ID = '[id="AccountFrm_postcode"]';
const COUNTRY_ID = '[id="AccountFrm_country_id"]';
const LOGIN_ID = '[id="AccountFrm_loginname"]';
const PASS1_ID = '[id="AccountFrm_password"]';
const PASS2_ID = '[id="AccountFrm_confirm"]';
const SUBSCRIBE_NO_ID = '[id="AccountFrm_newsletter0"]';
const AGREE_ID = '[id="AccountFrm_agree"]';

// optional
const PHONE_ID = '[id="AccountFrm_telephone"]';
const FAX_ID = '[id="AccountFrm_fax"]';
const COMPANY_ID = '[id="AccountFrm_company"]';
const ADDRESS2_ID = '[id="AccountFrm_address_2"]';

// allert messages
const ALLERT_MESSAGE = '[class="alert alert-error alert-danger"]';
const ERR_PASSWORD_MISMATCH = 'Password confirmation does not match password!';
const ERR_AGREE = 'Error: You must agree to the Privacy Policy!';
const ERR_EXISTING_EMAIL = 'Error: E-Mail Address is already registered!';


async function go_to_login_register(page) {
    await page.goto(URL);
    await page.getByRole('link', { name: LOGIN_REGISTER_BUTTON }).click();
}

async function register_required(page, first_name, last_name, email, address1, city, region_state, zip_code, country, login, pass1, pass2) {
    await page.locator(CONTINUE_REG_BUTTON).click();
    await expect(page).toHaveURL(REGISTER_URL);
    await page.waitForTimeout(1000);
    await page.locator(FIRST_NAME_ID).fill(first_name);
    await page.waitForTimeout(1000);
    await page.locator(LAST_NAME_ID).fill(last_name);
    await page.waitForTimeout(1000);
    await page.locator(EMAIL_ID).fill(email);
    await page.waitForTimeout(1000);
    await page.locator(ADDRESS1_ID).fill(address1);
    await page.waitForTimeout(1000);
    const country_element = await page.locator(COUNTRY_ID);
    await country_element.selectOption({label: country});
    await page.waitForTimeout(1000);
    const region_state_element = await page.locator(REGION_STATE_ID);
    region_state_element.selectOption({label: region_state});
    await page.waitForTimeout(1000);
    await page.locator(CITY_ID).fill(city);
    await page.waitForTimeout(1000);
    await page.locator(ZIP_CODE_ID).fill(zip_code);
    await page.waitForTimeout(1000);
    await page.locator(LOGIN_ID).fill(login);
    await page.waitForTimeout(1000);
    await page.locator(PASS1_ID).fill(pass1);
    await page.waitForTimeout(1000);
    await page.locator(PASS2_ID).fill(pass2);
    await page.waitForTimeout(1000);
    await page.locator(SUBSCRIBE_NO_ID).click();
    await page.waitForTimeout(1000);
}

async function register_optional(page, phone, fax, company, address2) {
    await page.locator(PHONE_ID).fill(phone);
    await page.waitForTimeout(1000);
    await page.locator(FAX_ID).fill(fax);
    await page.waitForTimeout(1000);
    await page.locator(COMPANY_ID).fill(company);
    await page.waitForTimeout(1000);
    await page.locator(ADDRESS2_ID).fill(address2);
}

test('REG_ACC_001: go to login-register page', async({ page }) => {
    await go_to_login_register(page);
});

test('REG_ACC_002: register only with required data + accept terms', async({ page }) => {
    await go_to_login_register(page);
    await register_required(page, REQ_FIRST_NAME, REQ_LAST_NAME, REQ_EMAIL, REQ_ADDRESS_1, REQ_CITY, REQ_REGION_STATE, REQ_ZIP_CODE, REQ_COUNTRY, REQ_LOGIN_NAME, REQ_PASS_1, REQ_PASS_2);
    await page.locator(AGREE_ID).setChecked(true);
    await page.waitForTimeout(1000);
    await page.locator(CONTINUE_REG_BUTTON).click();
    await page.waitForTimeout(1000);
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(ACCOUNT_SUCCESS_CREATED_URL);
});

test('REG_ACC_003: register with required + optional data + accept terms', async({ page }) => {
    await go_to_login_register(page);
    await register_required(page, REQ_FIRST_NAME, REQ_LAST_NAME, REQ_EMAIL, REQ_ADDRESS_1, REQ_CITY, REQ_REGION_STATE, REQ_ZIP_CODE, REQ_COUNTRY, REQ_LOGIN_NAME, REQ_PASS_1, REQ_PASS_2);
    await register_optional(page, OP_PHONE, OP_FAX, OP_COMPANY, OP_ADDRESS_2);
    await page.locator(AGREE_ID).setChecked(true);
    await page.waitForTimeout(1000);
    await page.locator(CONTINUE_REG_BUTTON).click();
    await page.waitForTimeout(1000);
    await expect(page).toHaveURL(ACCOUNT_SUCCESS_CREATED_URL);
});

// try to register an existing account
test('REG_ACC_004: register an account with existing email', async({ page }) => {
    await go_to_login_register(page);
    await register_required(page, REQ_FIRST_NAME, REQ_LAST_NAME, REQ_EMAIL, REQ_ADDRESS_1, REQ_CITY, REQ_REGION_STATE, REQ_ZIP_CODE, REQ_COUNTRY, REQ_LOGIN_NAME, REQ_PASS_1, REQ_PASS_2);
    await register_optional(page, OP_PHONE, OP_FAX, OP_COMPANY, OP_ADDRESS_2);
    await page.locator(AGREE_ID).setChecked(true);
    await page.waitForTimeout(1000);
    await page.locator(CONTINUE_REG_BUTTON).click();
    await page.waitForTimeout(1000);
    await expect(page.locator(ALLERT_MESSAGE)).toContainText(ERR_EXISTING_EMAIL);
});

test('REG_ACC_005: register only with optional data + accept terms', async({ page }) => {
    await go_to_login_register(page);
    await page.waitForTimeout(1000);
    await page.locator(CONTINUE_REG_BUTTON).click();
    await page.waitForTimeout(1000);
    //await register_required(page, REQ_FIRST_NAME, REQ_LAST_NAME, REQ_EMAIL, REQ_ADDRESS_1, REQ_CITY, REQ_REGION_STATE, REQ_ZIP_CODE, REQ_COUNTRY, REQ_LOGIN_NAME, REQ_PASS_1, REQ_PASS_2);
    await register_optional(page, OP_PHONE, OP_FAX, OP_COMPANY, OP_ADDRESS_2);
    await page.locator(AGREE_ID).setChecked(true);
    await page.waitForTimeout(1000);
    await page.locator(CONTINUE_REG_BUTTON).click();
    await page.waitForTimeout(1000);
    await expect(page.locator(ALLERT_MESSAGE)).toBeVisible();
});

test('REG_ACC_006: do not agree terms register with required + optional data', async({ page }) => {
    await go_to_login_register(page);
    await register_required(page, REQ_FIRST_NAME, REQ_LAST_NAME, REQ_EMAIL, REQ_ADDRESS_1, REQ_CITY, REQ_REGION_STATE, REQ_ZIP_CODE, REQ_COUNTRY, REQ_LOGIN_NAME, REQ_PASS_1, REQ_PASS_2);
    await register_optional(page, OP_PHONE, OP_FAX, OP_COMPANY, OP_ADDRESS_2);
    //await page.locator(AGREE_ID).click();
    await page.waitForTimeout(1000);
    await page.locator(CONTINUE_REG_BUTTON).click();
    await page.waitForTimeout(1000);
    await expect(page.locator(ALLERT_MESSAGE)).toBeVisible();
    await expect(page.locator(ALLERT_MESSAGE)).toContainText(ERR_AGREE);
});

// test case where passwords mismatch
test('REG_ACC_007: register a new account where password and confirm password mismatch.', async({ page }) => {
    await go_to_login_register(page);
    await register_required(page, REQ_FIRST_NAME, REQ_LAST_NAME, REQ_EMAIL, REQ_ADDRESS_1, REQ_CITY, REQ_REGION_STATE, REQ_ZIP_CODE, REQ_COUNTRY, REQ_LOGIN_NAME, REQ_WRONG_PASS_1, REQ_PASS_2);
    await register_optional(page, OP_PHONE, OP_FAX, OP_COMPANY, OP_ADDRESS_2);
    await page.waitForTimeout(1000);
    await page.locator(AGREE_ID).setChecked(true);
    await page.waitForTimeout(1000);
    await page.locator(CONTINUE_REG_BUTTON).click();
    await page.waitForTimeout(1000);
    await expect(page.locator(ALLERT_MESSAGE)).toBeVisible();
    await expect(page.locator(ALLERT_MESSAGE)).toContainText(ERR_PASSWORD_MISMATCH);
});