"use client";

import { CardCollection } from "@/components/glide/card-collection";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const sampleItems = [
  {
    title: "Premium Content",
    description: "Exclusive access to premium features",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    meta: "PRO",
  },
  {
    title: "Beta Feature",
    description: "Try our newest functionality",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
    meta: "BETA",
  },
  {
    title: "Limited Time",
    description: "Special offer ends soon",
    image:
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=400&h=400&fit=crop",
    meta: "SALE",
  },
];

const actionItems = [
  {
    title: "Project Alpha",
    description: "Innovative design system",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
    meta: "ACTIVE",
  },
  {
    title: "Project Beta",
    description: "Next-gen user interface",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
    meta: "PENDING",
  },
];

const footerItems = [
  {
    title: "Popular Post",
    description: "Most viewed content this week",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop",
  },
  {
    title: "Trending Topic",
    description: "Hot discussions happening now",
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=400&fit=crop",
  },
];

export function CardCollectionWithBadges() {
  return (
    <CardCollection
      items={sampleItems}
      renderMeta={(meta) => <Badge variant="secondary">{meta}</Badge>}
    />
  );
}

export function CardCollectionWithActions() {
  return (
    <CardCollection
      items={actionItems}
      renderAction={() => (
        <Button size="sm" variant="outline">
          View
        </Button>
      )}
    />
  );
}

export function CardCollectionWithFooter() {
  return (
    <CardCollection
      items={footerItems}
      renderFooter={(_item, _index) => (
        <div className="flex gap-4 text-muted-foreground text-xs">
          <span>👁️ {Math.floor(Math.random() * 1000)} views</span>
          <span>❤️ {Math.floor(Math.random() * 100)} likes</span>
        </div>
      )}
    />
  );
}
