import { MessageCircle } from "lucide-react";

export default function ChatWithUsButton() {
  return (
    <button className="btn chat-with-us">
      <MessageCircle />
      <span>Chat With Us</span>
    </button>
  );
}
