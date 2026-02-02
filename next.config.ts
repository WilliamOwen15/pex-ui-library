import { createMDX } from "fumadocs-mdx/next";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "images.unsplash.com",
			},
			{
				protocol: "https",
				hostname: "www.projectexodus.net",
			},
			{
				protocol: "https",
				hostname: "projectexodus.net",
			},
			{
				protocol: "https",
				hostname: "cdn.prod.website-files.com",
			},
		],
	},
};

const withMDX = createMDX();

export default withMDX(nextConfig);
