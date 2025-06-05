import { MessageCircle } from "lucide-react";
import { useTranslation } from "react-i18next";

export default function ChatWithUsButton() {
  const { t } = useTranslation();

  return (
    <button className="btn chat-with-us">
      <MessageCircle />
      <span>{t("common.chatWithUs")}</span>
    </button>
  );
}
