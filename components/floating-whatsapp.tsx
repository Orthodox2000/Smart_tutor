import { getPublicInstituteData } from "@/lib/mock-data";

export function FloatingWhatsApp() {
  const data = getPublicInstituteData();

  return (
    <a
      href={data.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with SmartIQ Academy on WhatsApp"
      className="bookmark-button fixed bottom-4 right-4 z-30 border border-white/20 bg-[#25D366] text-white shadow-[0_18px_40px_rgba(37,211,102,0.28)] sm:bottom-6 sm:right-6"
      title="Chat on WhatsApp"
    >
      WhatsApp
    </a>
  );
}
