import { getPublicInstituteData } from "@/lib/mock-data";

export function FloatingWhatsApp() {
  const data = getPublicInstituteData();

  return (
    <a
      href={data.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with SmartIQ Academy on WhatsApp"
      className="action-button fixed bottom-5 right-5 z-30 h-14 w-14 justify-center rounded-full text-xl shadow-[0_18px_40px_rgba(168,127,38,0.35)]"
      title="Chat on WhatsApp"
    >
      WA
    </a>
  );
}
