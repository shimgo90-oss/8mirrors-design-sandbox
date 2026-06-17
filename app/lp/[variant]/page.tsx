import { notFound } from "next/navigation";
import { LandingExperience } from "../../landing/page";
import type { SectionKey } from "../../landing/page";
import { VARIANTS, VARIANT_MAP } from "../../landing/_variants";
import PdpTemplate from "../../landing/_tpl-pdp";
import StoryTemplate from "../../landing/_tpl-story";

export function generateStaticParams() {
  return VARIANTS.map((v) => ({ variant: v.slug }));
}

export default async function LandingVariantPage({
  params,
}: {
  params: Promise<{ variant: string }>;
}) {
  const { variant } = await params;
  const v = VARIANT_MAP[variant];
  if (!v) notFound();
  if (v.Custom) {
    const Custom = v.Custom;
    return <Custom />;
  }
  if (v.template === "pdp") {
    return <PdpTemplate config={v} />;
  }
  if (v.template === "story") {
    return <StoryTemplate config={v} />;
  }
  return <LandingExperience sections={v.sections as SectionKey[] | undefined} copy={v.copy} />;
}
