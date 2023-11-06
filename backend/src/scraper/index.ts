import puppeteer from "puppeteer";
import fs from "fs";

export const getSiteData = async () => {
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto("https://www.sreality.cz/en/search/for-sale/apartments");

    // Wait for the selector that indicates the presence of listings on each page
    const listingsSelector = "body .page-layout .dir-property-list";
    await page.waitForSelector(listingsSelector);

    let allData: any = [];
    let pageNumber = 0;

    while (pageNumber < 26) {
      pageNumber++;

      // Scrape data from the current page
      const images = await page.evaluate(() => {
        const propertyElements = document.querySelectorAll(
          "body .page-layout .dir-property-list .property"
        );

        const groupedImages = Array.from(
          propertyElements,
          (propertyElement) => {
            const imagesForProperty = Array.from(
              propertyElement.querySelectorAll("a img"),
              (imageElement) => imageElement.getAttribute("src")
            );
            return imagesForProperty;
          }
        );

        return groupedImages;
      });

      const flats = await page.evaluate(() =>
        Array.from(
          document.querySelectorAll(
            "body .page-layout .dir-property-list .property .info .basic"
          ),
          (propertyElement) => {
            const title = propertyElement.querySelector(".name")?.textContent;
            const price =
              propertyElement.querySelector(".norm-price")?.textContent;
            const locality =
              propertyElement.querySelector(".locality")?.textContent;

            return { title, price, locality };
          }
        )
      );

      // Combine and add the data to the result array
      allData = allData.concat(
        images.map((imageGroup, index) => ({
          images: imageGroup,
          ...flats[index],
        }))
      );

      // Check if there's a "Next" button for pagination
      const nextButton = await page.$(".btn-paging");
      if (nextButton) {
        console.log("Navigating to next page...");
        await nextButton.click();
        await page.waitForSelector(listingsSelector);
      } else {
        break;
      }
    }

    const jsonData = JSON.stringify(allData, null, 2);
    fs.writeFileSync("siteData.json", jsonData);
    console.log("Data saved to siteData.json");

    await browser.close();
  } catch (error) {
    console.error(error);
  }
};
