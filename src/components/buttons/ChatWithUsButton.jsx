import { useTranslation } from "react-i18next";
import chatWithUsIcon from "../../assets/icons/message.svg";
import { useChat } from "../../hooks/useChat";

export default function ChatWithUsButton() {
  const { t } = useTranslation();
  const { toggleChat, isChatLoaded } = useChat();

  const handleChatClick = () => {
    if (isChatLoaded) {
      toggleChat();
    } else {
      console.warn("Chat not loaded yet");
    }
  };

  return (
    <button className="btn chat-with-us" onClick={handleChatClick}>
      <img src={chatWithUsIcon} alt="Chat" className="chat-icon" />
      <span>{t("common.chatWithUs")}</span>
    </button>
  );
}
