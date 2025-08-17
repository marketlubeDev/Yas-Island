import React, { useEffect } from "react";

export default function YasChat() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const settings = {
      appId: "670e1a41771ace477a7b6b14_app_1111003793",
      skin: "MODERN",
    };

    window.sprChatSettings = settings;

    const scriptId = "spr-chat-widget";
    const scriptSrc =
      "https://prod15-live-chat.sprinklr.com/api/livechat/handshake/widget/" +
      settings.appId;

    const loadScript = () => {
      const existing = document.getElementById(scriptId);
      if (existing) return;

      const script = document.createElement("script");
      script.id = scriptId;
      script.type = "text/javascript";
      script.async = true;
      script.src = scriptSrc;
      script.onerror = function () {
        if (window.sprChat) window.sprChat.loaded = false;
      };
      script.onload = function () {
        if (window.sprChat) window.sprChat.loaded = true;
      };
      const firstScript = document.getElementsByTagName("script")[0];
      firstScript.parentNode.insertBefore(script, firstScript);
    };

    const ensureStub = () => {
      const current = window.sprChat;
      const isLoaded = typeof current === "function" && !!current.loaded;
      if (isLoaded) return current;

      if (typeof current !== "function") {
        const stub = function () {
          stub.m(arguments);
        };
        stub.q = [];
        stub.m = function (args) {
          stub.q.push(args);
        };
        window.sprChat = stub;
        return stub;
      }
      return current;
    };

    const spr = ensureStub();

    if (typeof spr === "function" && spr.loaded) {
      spr("update", settings);
    } else if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", loadScript);
    } else {
      loadScript();
    }
  }, []);

  return null;
}
