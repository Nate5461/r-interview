import { type } from "os";

chrome.action.onClicked.addListener((tab) => {
    
    // Check to see that the background script is running
    //console.log("Button clicked");

    // Execute the webscraper script in the current tab
    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['webscraper.js']
    }, () => {

      // Check for errors
      if (chrome.runtime.lastError) {
        console.error("Script injection failed: ", chrome.runtime.lastError.message);
      } else {
        console.log("Script injected successfully");
      }
    });
  });
  