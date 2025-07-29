import { useState, useEffect, useCallback } from "react";

export const useChat = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isChatLoaded, setIsChatLoaded] = useState(false);

  // Check if Sprinklr chat is loaded
  useEffect(() => {
    const checkChatLoaded = () => {
      if (window.sprChat && typeof window.sprChat === "function") {
        setIsChatLoaded(true);
      }
    };

    // Check immediately
    checkChatLoaded();

    // Also check after a delay in case it loads later
    const timer = setTimeout(checkChatLoaded, 2000);

    return () => clearTimeout(timer);
  }, []);

  const openChat = useCallback(() => {
    if (window.sprChat && typeof window.sprChat === "function") {
      try {
        window.sprChat("open");
        setIsChatOpen(true);
      } catch (error) {
        console.error("Error opening chat:", error);
      }
    } else {
      console.warn("Sprinklr chat not loaded yet");
    }
  }, []);

  const closeChat = useCallback(() => {
    if (window.sprChat && typeof window.sprChat === "function") {
      try {
        window.sprChat("close");
        setIsChatOpen(false);
      } catch (error) {
        console.error("Error closing chat:", error);
      }
    }
  }, []);

  const toggleChat = useCallback(() => {
    if (isChatOpen) {
      closeChat();
    } else {
      openChat();
    }
  }, [isChatOpen, openChat, closeChat]);

  return {
    isChatOpen,
    isChatLoaded,
    openChat,
    closeChat,
    toggleChat,
  };
};
