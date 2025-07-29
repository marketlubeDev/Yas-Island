import { useTranslation } from "react-i18next";
import chatWithUsIcon from "../../assets/icons/message.svg";

export default function ChatWithUsButton() {
  const { t } = useTranslation();

  const handleChatClick = () => {
    if (window.sprChat) {
      // Toggle chat box - if open, close it; if closed, open it
      window.sprChat("toggle");
    }
  };

  return (
    <button className="btn chat-with-us" onClick={handleChatClick}>
      <img src={chatWithUsIcon} alt="Chat" className="chat-icon" />
      <span>{t("common.chatWithUs")}</span>
    </button>
  );
}
