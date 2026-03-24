import { getPublicInstituteData } from "@/lib/data-store";

export async function FloatingWhatsApp() {
  const data = await getPublicInstituteData();

  return (
    <a
      href={data.whatsappHref}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat with Smart Tutor on WhatsApp"
      className="bookmark-button fixed bottom-3 right-3 z-30 border border-white/20 bg-[#25D366] px-4 py-3 text-sm text-white shadow-[0_18px_40px_rgba(37,211,102,0.28)] sm:bottom-6 sm:right-6 sm:px-[1.1rem] sm:py-[0.95rem] sm:text-[0.95rem]"
      title="Chat on WhatsApp"
    >
      WhatsApp
    </a>
  );
}
