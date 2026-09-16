import docsData from "../assets/docs.json";

export interface DocProperty {
  key: string;
  aliases: string[];
  description: string;
  type: string;
}

export interface DocTag {
  name: string;
  aliases: string[];
  components: string[];
  description: string;
  since: string;
}

export interface DocMacro {
  name: string;
  aliases: string[];
  properties: DocProperty[];
  description: string;
}

export interface DocComponent {
  typename: string;
  properties: DocProperty[];
  description: string;
}

export interface DocArgument {
  name: string;
  description: string;
  possibleValues: string[];
}

export const docs = docsData as {
  tags: DocTag[];
  macros: DocMacro[];
  components: DocComponent[];
  arguments: DocArgument[];
};

const byName = (a: { name: string }, b: { name: string }) =>
  a.name.localeCompare(b.name);

export const sortedTags = (): DocTag[] => [...docs.tags].sort(byName);
export const sortedMacros = (): DocMacro[] => [...docs.macros].sort(byName);
export const sortedComponents = (): DocComponent[] =>
  [...docs.components].sort((a, b) => a.typename.localeCompare(b.typename));

export const findTagByAlias = (alias: string | undefined) =>
  docs.tags.find((t) => t.aliases.includes(alias ?? ""));
export const findMacroByAlias = (alias: string | undefined) =>
  docs.macros.find((m) => m.aliases.includes(alias ?? ""));
export const findComponent = (typename: string | undefined) =>
  docs.components.find((c) => c.typename === typename);
