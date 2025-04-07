import { useEffect, useState } from "react";

function App() {
  const [url, setUrl] = useState<string>();
  const [tab, setTab] = useState<chrome.tabs.Tab>();
  const [found, setFound] = useState<boolean>(false);

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]?.url) {
        setTab(tabs[0]);
        setUrl(tabs[0].url);
      }
    });
  }, []);

  useEffect(() => {
    if (url?.startsWith("https://www.instagram.com/reels/")) {
      setFound(true);
      if (tab) {
        chrome.runtime.sendMessage({
          type: "MODIFY_PAGE",
          tabID: tab.id,
        });
      }
    }
  }, [url, tab]);

  return (
    <div className="container">
      <h3 className="title">Disable DoomScrolling</h3>
      <p>url:{tab && tab.id}</p>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="main">
          <h4>Youtube : {found ? "true" : "false"}</h4>
          <div
            style={{
              color: "gray",
              opacity: "initial",
              paddingLeft: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "5px",
            }}
          >
            Shorts
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>
        <div className="main">
          <h4>Instagram</h4>
          <div
            style={{
              color: "gray",
              opacity: "initial",
              paddingLeft: "5px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            Reels
            <label className="switch">
              <input type="checkbox" />
              <span className="slider"></span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
