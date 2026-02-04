import type { MDXComponents } from "mdx/types";
import { ComponentPreview } from "@/components/docs/component-preview";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ComponentPreview,
    ...components,
  };
}
