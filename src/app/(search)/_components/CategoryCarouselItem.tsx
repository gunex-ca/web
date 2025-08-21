import {
  Archive,
  Bomb,
  Book,
  Crosshair,
  Eye,
  Package,
  Shield,
  Sword,
  Target,
  TreePine,
  Users,
  Wrench,
  Zap,
} from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "~/components/ui/card";
import { cn } from "~/components/utils";

// Map category IDs to appropriate icons
const getCategoryIcon = (categoryId: string) => {
  const iconMap: Record<string, typeof Target> = {
    firearms: Crosshair,
    "firearm-components-accessories-tools": Wrench,
    "shooting-range-gear": Shield,
    "airgun-airsoft": Target,
    archery: Target,
    optics: Eye,
    ammunition: Bomb,
    reloading: Package,
    "muzzleloading-supplies": Package,
    targets: Target,
    "cases-storage": Archive,
    hunting: TreePine,
    blades: Sword,
    books: Book,
    services: Users,
  };

  const IconComponent = iconMap[categoryId] || Package;
  return <IconComponent className="h-6 w-6" />;
};

type CategoryCarouselItemProps = {
  category: {
    id: string;
    name: string;
  };
  className?: string;
};

export function CategoryCarouselItem({
  category,
  className,
}: CategoryCarouselItemProps) {
  return (
    <Link
      href={`/listings?category=${category.id}`}
      className={cn("block", className)}
    >
      <Card className="group hover:-translate-y-0.5 aspect-square cursor-pointer border-border/50 transition-all duration-200 hover:border-border hover:shadow-md">
        <CardContent className="flex h-full flex-col items-center justify-center gap-2 p-3">
          <div className="flex-shrink-0 rounded-full bg-primary/10 p-2 transition-colors duration-200 group-hover:bg-primary/15">
            <div className="text-primary group-hover:text-primary/80">
              {getCategoryIcon(category.id)}
            </div>
          </div>
          <div className="text-center">
            <h3 className="line-clamp-2 font-medium text-xs leading-tight transition-colors duration-200 group-hover:text-primary">
              {category.name}
            </h3>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
