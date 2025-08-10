import { useTranslation } from "react-i18next";
import { useState } from "react";
import chatWithUsIcon from "../../assets/icons/message.svg";
import closeIcon from "../../assets/icons/close.svg";

export default function ChatWithUsButton() {
  const { t } = useTranslation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  // const handleChatClick = () => {
  //   if (window.sprChat) {
  //     if (isChatOpen) {
  //       window.sprChat("close");
  //       setIsChatOpen(false);
  //     } else {
  //       window.sprChat("open");
  //       setIsChatOpen(true);
  //     }
  //   }
  // };

  return (
    <button
      className="btn chat-with-us"
      onClick={() => setIsChatOpen((val) => !val)}
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
