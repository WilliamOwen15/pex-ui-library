"use client";

import {
  Activity,
  Calendar,
  MessageSquare,
  Shield,
  ThumbsUp,
  UserPlus,
  Users,
} from "lucide-react";
import { BigNumberCollection } from "@/components/glide/big-number-collection";
import { BigNumberItem } from "@/components/glide/big-number-item";
import { Badge } from "@/components/ui/badge";

// Basic Example: Simple 3-column grid with attendance numbers
export function BasicExample() {
  return (
    <BigNumberCollection
      columns={3}
      items={[
        {
          value: 847,
          label: "Total Attendance",
          description: "This month",
        },
        {
          value: 23,
          label: "Active Groups",
          description: "Meeting regularly",
        },
        {
          value: "92%",
          label: "Attendance Rate",
          description: "vs last month",
        },
      ]}
    />
  );
}

// With Icons Example: Big numbers with Lucide icons
export function WithIconsExample() {
  return (
    <BigNumberCollection
      columns={3}
      items={[
        {
          value: 847,
          label: "Total Attendance",
          description: "This month",
          icon: <Users className="h-5 w-5" />,
        },
        {
          value: 23,
          label: "Active Groups",
          description: "Meeting regularly",
          icon: <Calendar className="h-5 w-5" />,
        },
        {
          value: "92%",
          label: "Attendance Rate",
          description: "vs last month",
          icon: <Activity className="h-5 w-5" />,
        },
      ]}
    />
  );
}

// Dashboard Example: 4-column KPI dashboard for Project Exodus
export function DashboardExample() {
  return (
    <BigNumberCollection
      columns={4}
      items={[
        {
          value: 156,
          label: "New Sign-ups",
          description: "This month",
          icon: <UserPlus className="h-6 w-6" />,
        },
        {
          value: 1247,
          label: "Total Members",
          icon: <Users className="h-6 w-6" />,
        },
        {
          value: 34,
          label: "Facilitators",
          icon: <Shield className="h-6 w-6" />,
        },
        {
          value: "98%",
          label: "Satisfaction",
          icon: <ThumbsUp className="h-6 w-6" />,
        },
      ]}
      size="lg"
    />
  );
}

// Gradient Values Example: Large centered numbers with gradient effect
export function GradientValuesExample() {
  return (
    <BigNumberCollection
      alignment="center"
      columns={3}
      items={[
        { value: "10K+", label: "Lives Changed" },
        { value: "500+", label: "Active Groups" },
        { value: "15", label: "Years of Impact" },
      ]}
      size="xl"
      valueVariant="gradient"
      variant="minimal"
    />
  );
}

// Clickable Example: Big numbers with onClick handlers
export function ClickableExample() {
  return (
    <BigNumberCollection
      columns={3}
      items={[
        {
          value: 847,
          label: "Total Attendance",
          description: "Click to view details",
          icon: <Users className="h-5 w-5" />,
          onClick: () => alert("Viewing attendance details"),
        },
        {
          value: 23,
          label: "Active Groups",
          description: "Click to see groups",
          icon: <Calendar className="h-5 w-5" />,
          href: "/groups",
        },
        {
          value: "92%",
          label: "Attendance Rate",
          description: "Click for analytics",
          icon: <Activity className="h-5 w-5" />,
          onClick: () => alert("Opening analytics"),
        },
      ]}
    />
  );
}

// Custom Render Example: Using render functions for custom formatting
export function CustomRenderExample() {
  return (
    <BigNumberCollection
      columns={3}
      items={[
        {
          value: 847_000,
          label: "Revenue",
          icon: <Users className="h-5 w-5" />,
        },
        {
          value: 23,
          label: "Active Groups",
          icon: <Calendar className="h-5 w-5" />,
        },
        {
          value: 92,
          label: "Satisfaction Score",
          icon: <ThumbsUp className="h-5 w-5" />,
        },
      ]}
      renderValue={(item) => {
        if (typeof item.value === "number" && item.value > 1000) {
          return (
            <div className="min-w-0 overflow-hidden break-all font-bold text-3xl tabular-nums tracking-tight sm:text-4xl">
              ${(item.value / 1000).toFixed(0)}K
            </div>
          );
        }
        if (item.label === "Satisfaction Score") {
          return (
            <div className="min-w-0 overflow-hidden break-all font-bold text-3xl tabular-nums tracking-tight sm:text-4xl">
              {item.value}/100
            </div>
          );
        }
        return (
          <div className="min-w-0 overflow-hidden break-all font-bold text-3xl tabular-nums tracking-tight sm:text-4xl">
            {item.value}
          </div>
        );
      }}
    />
  );
}

// Minimal Variant Example: Minimal style for landing pages
export function MinimalVariantExample() {
  return (
    <BigNumberCollection
      alignment="center"
      columns={3}
      items={[
        {
          value: "10M+",
          label: "Users Worldwide",
          description: "Trusted by millions",
        },
        {
          value: "99.9%",
          label: "Uptime SLA",
          description: "Enterprise-grade reliability",
        },
        {
          value: "24/7",
          label: "Support",
          description: "Always here to help",
        },
      ]}
      size="xl"
      variant="minimal"
    />
  );
}

// Mixed Sizes Example: Different sizes in same collection
export function MixedSizesExample() {
  return (
    <BigNumberCollection
      columns={3}
      items={[
        {
          value: 847,
          label: "Small Size",
          description: "This uses sm size",
          size: "sm",
        },
        {
          value: 23,
          label: "Medium Size",
          description: "This uses md size (default)",
          size: "md",
        },
        {
          value: "92%",
          label: "Large Size",
          description: "This uses lg size",
          size: "lg",
        },
      ]}
      showIcon={false}
    />
  );
}

// Outline Variant Example
export function OutlineVariantExample() {
  return (
    <BigNumberCollection
      columns={3}
      items={[
        {
          value: "$142K",
          label: "Revenue",
          description: "This quarter",
          icon: <Activity className="h-5 w-5" />,
        },
        {
          value: 2847,
          label: "Active Users",
          description: "Last 30 days",
          icon: <Users className="h-5 w-5" />,
        },
        {
          value: 156,
          label: "Support Tickets",
          description: "Resolved this week",
          icon: <MessageSquare className="h-5 w-5" />,
        },
      ]}
      variant="outline"
    />
  );
}

// Single Item Example: Featured metric
export function SingleItemExample() {
  return (
    <BigNumberItem
      alignment="center"
      item={{
        value: 1247,
        label: "Daily Active Users",
        description: "Across all platforms",
        icon: <Users className="h-6 w-6" />,
      }}
      size="xl"
      variant="card"
    />
  );
}

// With Custom Slots Example
export function WithCustomSlotsExample() {
  return (
    <BigNumberCollection
      columns={3}
      items={[
        {
          value: 847,
          label: "Total Attendance",
          icon: <Users className="h-5 w-5" />,
          header: <Badge variant="secondary">NEW</Badge>,
          footer: (
            <div className="text-muted-foreground text-xs">
              Updated 5 minutes ago
            </div>
          ),
        },
        {
          value: 23,
          label: "Active Groups",
          icon: <Calendar className="h-5 w-5" />,
          header: <Badge variant="default">TRENDING</Badge>,
          footer: (
            <div className="text-muted-foreground text-xs">
              +12% from last week
            </div>
          ),
        },
        {
          value: "92%",
          label: "Attendance Rate",
          icon: <Activity className="h-5 w-5" />,
          footer: (
            <div className="text-muted-foreground text-xs">
              Above target (90%)
            </div>
          ),
        },
      ]}
    />
  );
}

// Prefix and Suffix Example
export function PrefixSuffixExample() {
  return (
    <BigNumberCollection
      columns={4}
      items={[
        {
          value: "142,894",
          prefix: "$",
          label: "Revenue",
          description: "This month",
        },
        {
          value: "98.2",
          suffix: "%",
          label: "Uptime",
          description: "Last 30 days",
        },
        {
          value: "2.5",
          suffix: "K",
          label: "New Users",
          description: "This week",
        },
        {
          value: "45",
          suffix: " min",
          label: "Avg. Session",
          description: "User engagement",
        },
      ]}
    />
  );
}
