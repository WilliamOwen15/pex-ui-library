import { loader } from "fumadocs-core/source";
import { toFumadocsSource } from "fumadocs-mdx/runtime/server";
import { DocsLayout } from "fumadocs-ui/layouts/docs";
import type { ReactNode } from "react";
import { docs } from "@/.source/server";

const source = toFumadocsSource(docs, []);
const utils = loader({
  source,
  baseUrl: "/docs",
});

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      nav={{
        component: <></>,
        title: "PEx UI Library",
      }}
      tree={utils.pageTree}
    >
      {children}
    </DocsLayout>
  );
}
