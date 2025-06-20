import { MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ChatWithUsButton() {
  const { t } = useTranslation();

  const handleChatClick = () => {
    console.log(window.sprChat, "sprChat");
    if (window.sprChat) {
      window.sprChat('open');
    }
  };

  return (
    <button className="btn chat-with-us" onClick={handleChatClick}>
      <MessageCircle />
      <span>{t("common.chatWithUs")}</span>
    </button>
  );
}
