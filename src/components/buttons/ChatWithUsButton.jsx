import { useTranslation } from "react-i18next";
import { useState } from "react";
import chatWithUsIcon from "../../assets/icons/message.svg";

export default function ChatWithUsButton() {
  const { t } = useTranslation();
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatClick = () => {
    if (window.sprChat) {
      if (isChatOpen) {
        window.sprChat("close");
        setIsChatOpen(false);
      } else {
        window.sprChat("open");
        setIsChatOpen(true);
      }
    }
  };

  return (
    <button className="btn chat-with-us" onClick={handleChatClick}>
      <img src={chatWithUsIcon} alt="Chat" className="chat-icon" />
      <span>{t("common.chatWithUs")}</span>
    </button>
  );
}
