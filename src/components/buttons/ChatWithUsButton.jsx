import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";
import chatWithUsIcon from "../../assets/icons/message.svg";
import closeIcon from "../../assets/icons/close.svg";

export default function ChatWithUsButton() {
  const { t } = useTranslation();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [animationClass, setAnimationClass] = useState("");

  // Listen for Sprinklr chat state changes
  useEffect(() => {
    // Function to check if Sprinklr chat is open
    const checkChatState = (previousState) => {
      // Multiple ways to check if chat is open
      const chatBox = document.querySelector(".spr-chat__box");
      const chatWidget = document.querySelector(".ezg1tqb1"); // Sprinklr chat container

      let isOpen = false;

      // Check various indicators of chat being open
      if (chatBox) {
        isOpen =
          !chatBox.classList.contains("spr-chat--minimized") &&
          chatBox.style.display !== "none";
      } else if (chatWidget) {
        isOpen = chatWidget.style.display !== "none";
      }

      // Trigger animation when state changes
      if (isOpen !== previousState) {
        setAnimationClass(isOpen ? "is-opening" : "is-closing");
        setTimeout(() => setAnimationClass(""), 500);
      }

      setIsChatOpen(isOpen);
    };

    // Set up observer to watch for Sprinklr chat state changes
    let currentState = false;
    const observer = new MutationObserver(() => {
      checkChatState(currentState);
      // Update current state after check
      const chatBox = document.querySelector(".spr-chat__box");
      const chatWidget = document.querySelector(".ezg1tqb1");
      if (chatBox) {
        currentState =
          !chatBox.classList.contains("spr-chat--minimized") &&
          chatBox.style.display !== "none";
      } else if (chatWidget) {
        currentState = chatWidget.style.display !== "none";
      }
    });

    // Start observing when Sprinklr is loaded
    const waitForSprinklr = setInterval(() => {
      const chatElements = document.querySelector(".spr-chat__box, .ezg1tqb1");
      if (chatElements || window.sprChat) {
        clearInterval(waitForSprinklr);

        // Observe the entire body for Sprinklr changes
        observer.observe(document.body, {
          attributes: true,
          childList: true,
          subtree: true,
          attributeFilter: ["class", "style"],
        });

        // Initial check
        checkChatState(false);

        // Also listen for Sprinklr events if available
        if (window.sprChat && window.sprChat.on) {
          window.sprChat.on("open", () => {
            setAnimationClass("is-opening");
            setTimeout(() => setAnimationClass(""), 500);
            setIsChatOpen(true);
          });
          window.sprChat.on("close", () => {
            setAnimationClass("is-closing");
            setTimeout(() => setAnimationClass(""), 500);
            setIsChatOpen(false);
          });
        }
      }
    }, 100);

    return () => {
      clearInterval(waitForSprinklr);
      observer.disconnect();
    };
  }, []);

  const handleChatClick = () => {
    if (window.sprChat) {
      if (isChatOpen) {
        window.sprChat("close");
      } else {
        window.sprChat("open");
      }
    }
    // State will be updated by the observer
  };

  return (
    <button
      className={`btn chat-with-us ${animationClass}`}
      onClick={handleChatClick}
    >
      <img
        src={isChatOpen ? closeIcon : chatWithUsIcon}
        alt={isChatOpen ? "Close" : "Chat"}
        className="chat-icon"
      />
      {!isChatOpen && <span>{t("common.chatWithUs")}</span>}
    </button>
  );
}
