import { NextResponse } from "next/server";

import { getPublicInstituteData } from "@/lib/mock-data";
import { isMongoConfigured } from "@/lib/mongodb";

export async function GET() {
  return NextResponse.json({
    institute: getPublicInstituteData(),
    databaseConfigured: isMongoConfigured(),
  });
}
