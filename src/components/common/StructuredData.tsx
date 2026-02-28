import type { Cancer } from "@/types/cancer";

export function MedicalConditionSchema({ cancer }: { cancer: Cancer }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: cancer.name,
    alternateName: cancer.nameEn,
    description: cancer.longDescription,
  };

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />;
}
