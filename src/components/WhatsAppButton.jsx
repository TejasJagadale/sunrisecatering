import { MessageCircle } from 'lucide-react';
import { whatsappLink } from '../config/site';

export default function WhatsAppButton() {
  return (
    <a
      className="wa-fab"
      href={whatsappLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Sunrise Caterers on WhatsApp (opens in a new tab)"
    >
      <MessageCircle size={26} aria-hidden="true" />
      <span className="wa-label">WhatsApp us</span>
    </a>
  );
}
