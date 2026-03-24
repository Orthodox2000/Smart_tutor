import { SiteHeaderClient } from "@/components/site-header-client";
import { getDemoCredentials } from "@/lib/data-store";
import { getSessionUser } from "@/lib/auth";

export async function SiteHeader() {
  const [session, credentials] = await Promise.all([getSessionUser(), getDemoCredentials()]);

  return <SiteHeaderClient session={session} credentials={credentials} />;
}
