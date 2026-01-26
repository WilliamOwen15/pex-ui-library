// @ts-nocheck

import { server } from "fumadocs-mdx/runtime/server";
import * as __fd_glob_1 from "../content/docs/components/title.mdx?collection=docs";
import * as __fd_glob_0 from "../content/docs/index.mdx?collection=docs";
import type * as Config from "../source.config";

const create = server<
  typeof Config,
  import("fumadocs-mdx/runtime/types").InternalTypeConfig & {
    DocData: {};
  }
>({ doc: { passthroughs: ["extractedReferences"] } });

export const docs = await create.doc("docs", "content/docs", {
  "index.mdx": __fd_glob_0,
  "components/title.mdx": __fd_glob_1,
});
