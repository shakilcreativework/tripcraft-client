import PackageCard, { PackageCardProps } from "@/components/shared/PackageCard";

interface RelatedPackagesProps {
  packages: PackageCardProps[];
}

export default function RelatedPackages({ packages }: RelatedPackagesProps) {
  if (!packages.length) return null;

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {packages.map((pkg, i) => (
        <PackageCard key={pkg.id} {...pkg} priority={i < 2} />
      ))}
    </div>
  );
}
