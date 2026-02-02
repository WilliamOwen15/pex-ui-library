"use client";

import { ListCollection } from "@/components/glide/list-collection";
import { Badge } from "@/components/ui/badge";

// Sample data without functions (for static rendering compatibility)
const teamMembersBase = [
	{
		title: "Sarah Johnson",
		description: "Lead Product Designer with 8 years of experience",
		image:
			"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
		meta: "Product Design",
	},
	{
		title: "Michael Chen",
		description: "Senior Frontend Engineer specializing in React",
		image:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
		meta: "Engineering",
	},
	{
		title: "Emma Williams",
		description: "Product Manager driving user-centric solutions",
		image:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
		meta: "Product",
	},
];

const documents = [
	{
		title: "Q4 Marketing Strategy",
		description: "Comprehensive plan for product launches and campaigns",
		image:
			"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
		meta: "Active",
		id: 1,
	},
	{
		title: "Brand Guidelines 2024",
		description: "Updated visual identity and usage standards",
		image:
			"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop",
		meta: "Draft",
		id: 2,
	},
	{
		title: "User Research Findings",
		description: "Insights from recent customer interviews and surveys",
		image:
			"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
		meta: "Archived",
		id: 3,
	},
	{
		title: "Product Roadmap",
		description: "Strategic vision for next 12 months",
		image:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
		meta: "Active",
		id: 4,
	},
];

const activities = [
	{
		title: "New team member joined",
		description: "Emma Williams joined the Product team",
		image:
			"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
		meta: "2 hours ago",
	},
	{
		title: "Project milestone reached",
		description: "Design system v2.0 successfully launched",
		image:
			"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=400&fit=crop",
		meta: "5 hours ago",
	},
	{
		title: "Document updated",
		description: "Q4 Marketing Strategy has been revised",
		image:
			"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=400&fit=crop",
		meta: "1 day ago",
	},
	{
		title: "Comment added",
		description: "Michael Chen commented on your proposal",
		image:
			"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
		meta: "2 days ago",
	},
	{
		title: "File uploaded",
		description: "Brand Guidelines 2024.pdf was uploaded",
		image:
			"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=400&h=400&fit=crop",
		meta: "3 days ago",
	},
];

const productsBase = [
	{
		title: "Wireless Headphones Pro",
		description: "Premium noise-cancelling with 40hr battery life",
		image:
			"https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
		meta: "Electronics",
	},
	{
		title: "Smart Watch Series 5",
		description: "Health tracking and notifications on your wrist",
		image:
			"https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
		meta: "Wearables",
	},
	{
		title: "Ergonomic Keyboard",
		description: "Mechanical switches for comfortable typing",
		image:
			"https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
		meta: "Accessories",
	},
];

// Example Components

export function TeamMemberList() {
	// Add actions inside component to avoid serialization issues
	const teamMembers = teamMembersBase.map((member) => ({
		...member,
		actions: [
			{
				label: "View Profile",
				// biome-ignore lint/suspicious/noConsole: Demo code needs user feedback
				onClick: () => console.log("View profile"),
			},
			{
				label: "Send Message",
				// biome-ignore lint/suspicious/noConsole: Demo code needs user feedback
				onClick: () => console.log("Send message"),
			},
			{
				label: "Remove",
				// biome-ignore lint/suspicious/noConsole: Demo code needs user feedback
				onClick: () => console.log("Remove"),
				variant: "destructive" as const,
			},
		],
	}));

	return (
		<ListCollection imageShape="circle" items={teamMembers} variant="default" />
	);
}

export function DocumentListWithBadges() {
	const getStatusVariant = (
		status: string,
	): "default" | "secondary" | "outline" => {
		switch (status.toLowerCase()) {
			case "active":
				return "default";
			case "draft":
				return "secondary";
			case "archived":
				return "outline";
			default:
				return "secondary";
		}
	};

	return (
		<ListCollection
			items={documents}
			renderMeta={(meta) => (
				<Badge variant={getStatusVariant(meta)}>{meta}</Badge>
			)}
			size="compact"
			variant="default"
		/>
	);
}

export function ActivityFeed() {
	return (
		<ListCollection
			imageShape="circle"
			items={activities}
			limit={5}
			size="compact"
			variant="default"
		/>
	);
}

export function ProductListCard() {
	// Add actions inside component to avoid serialization issues
	const products = productsBase.map((product) => ({
		...product,
		actions: [
			{
				label: "Edit",
				// biome-ignore lint/suspicious/noConsole: Demo code needs user feedback
				onClick: () => console.log("Edit"),
			},
			{
				label: "Duplicate",
				// biome-ignore lint/suspicious/noConsole: Demo code needs user feedback
				onClick: () => console.log("Duplicate"),
			},
			{
				label: "Delete",
				// biome-ignore lint/suspicious/noConsole: Demo code needs user feedback
				onClick: () => console.log("Delete"),
				variant: "destructive" as const,
			},
		],
	}));

	return <ListCollection items={products} titleStyle="bold" variant="card" />;
}

export function ClickableList() {
	// Add hrefs inside component to avoid serialization issues
	const teamMembers = teamMembersBase.map((member) => ({
		...member,
		href: `/team/${member.title.toLowerCase().replace(/\s+/g, "-")}`,
	}));

	return (
		<ListCollection
			imageShape="circle"
			items={teamMembers}
			onItemClick={(item, index) => {
				// biome-ignore lint/suspicious/noConsole: Demo code needs user feedback
				console.log(`Clicked item ${index}:`, item.title);
			}}
			variant="default"
		/>
	);
}

export function CompactCardList() {
	return (
		<ListCollection
			imageShape="square"
			items={documents.slice(0, 3)}
			size="compact"
			variant="card"
		/>
	);
}
