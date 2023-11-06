import { launch } from 'puppeteer';

export async function isElementVisibleByBoundingBox(elementHandle) {
  return Boolean(await elementHandle.boundingBox());
}

export async function isElementVisibleByIsVisible(elementHandle) {
  return await elementHandle.isVisible();
}

export async function getVisibleElementByBoundingBox(page, selector) {
  const element = await page.$(selector);
  if (element && (await isElementVisibleByBoundingBox(element))) {
    return element;
  }
}

export async function getVisibleElementByIsVisible(page, selector) {
  const element = await page.$(selector);
  if (element && (await isElementVisibleByIsVisible(element))) {
    return element;
  }
}

(async () => {
  const browser = await launch({ headless: false });
  const page = await browser.newPage();

  await page.goto('https://puppeteer-boundingbox-isvisible.vercel.app/');

  const elementWithBoundingBox = await getVisibleElementByBoundingBox(
    page,
    '[data-test-id="link-about"]',
  );

  if (elementWithBoundingBox) {
    console.log('[data-test-id="link-about"] is visible with boundingBox()');
  } else {
    console.log(
      '[data-test-id="link-about"] is not visible with boundingBox()',
    );
  }

  const elementWithIsVisible = await getVisibleElementByIsVisible(
    page,
    '[data-test-id="link-about"]',
  );

  if (elementWithIsVisible) {
    console.log('[data-test-id="link-about"] is visible with isVisible()');
  } else {
    console.log('[data-test-id="link-about"] is not visible with isVisible()');
  }

  await browser.close();
})();
