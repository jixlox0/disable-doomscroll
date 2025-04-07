chrome.runtime.onMessage.addListener((msg, sender, sendResponse) => {
  if (msg.type === "MODIFY_PAGE") {
    chrome.scripting.executeScript({
      target: { tabId: msg.tabID },
      func: (event) => {
        if (
          window.location.href.startsWith("https://www.instagram.com/reels/")
        ) {
          window.Location.href = "https://www.instagram.com/";
          window.location.reload();
        }
      },
    });
    sendResponse({ status: "done" });
  }
  return true;
});

chrome.runtime.onInstalled.addListener(() => {
  console.log("🧠 Extension installed!");

  // You can run any setup logic here, like:
  // - Show a welcome page
  // - Inject scripts into tabs
  // - Set default storage values

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    for (let tab of tabs) {
      // Example: inject script into all open tabs
      if (tab.id) {
        chrome.scripting.executeScript({
          target: { tabId: tab.id },
          func: () => {
            if (
              window.location.href.startsWith(
                "https://www.instagram.com/reels/"
              )
            ) {
              window.Location.href = "https://www.instagram.com/";
              window.location.reload();
            }
          },
        });
      }
      return true;
    }
  });
});
