declare module 'astro:content' {
	interface Render {
		'.mdx': Promise<{
			Content: import('astro').MarkdownInstance<{}>['Content'];
			headings: import('astro').MarkdownHeading[];
			remarkPluginFrontmatter: Record<string, any>;
		}>;
	}
}

declare module 'astro:content' {
	interface RenderResult {
		Content: import('astro/runtime/server/index.js').AstroComponentFactory;
		headings: import('astro').MarkdownHeading[];
		remarkPluginFrontmatter: Record<string, any>;
	}
	interface Render {
		'.md': Promise<RenderResult>;
	}

	export interface RenderedContent {
		html: string;
		metadata?: {
			imagePaths: Array<string>;
			[key: string]: unknown;
		};
	}
}

declare module 'astro:content' {
	type Flatten<T> = T extends { [K: string]: infer U } ? U : never;

	export type CollectionKey = keyof AnyEntryMap;
	export type CollectionEntry<C extends CollectionKey> = Flatten<AnyEntryMap[C]>;

	export type ContentCollectionKey = keyof ContentEntryMap;
	export type DataCollectionKey = keyof DataEntryMap;

	type AllValuesOf<T> = T extends any ? T[keyof T] : never;
	type ValidContentEntrySlug<C extends keyof ContentEntryMap> = AllValuesOf<
		ContentEntryMap[C]
	>['slug'];

	/** @deprecated Use `getEntry` instead. */
	export function getEntryBySlug<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		// Note that this has to accept a regular string too, for SSR
		entrySlug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;

	/** @deprecated Use `getEntry` instead. */
	export function getDataEntryById<C extends keyof DataEntryMap, E extends keyof DataEntryMap[C]>(
		collection: C,
		entryId: E,
	): Promise<CollectionEntry<C>>;

	export function getCollection<C extends keyof AnyEntryMap, E extends CollectionEntry<C>>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => entry is E,
	): Promise<E[]>;
	export function getCollection<C extends keyof AnyEntryMap>(
		collection: C,
		filter?: (entry: CollectionEntry<C>) => unknown,
	): Promise<CollectionEntry<C>[]>;

	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(entry: {
		collection: C;
		slug: E;
	}): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(entry: {
		collection: C;
		id: E;
	}): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof ContentEntryMap,
		E extends ValidContentEntrySlug<C> | (string & {}),
	>(
		collection: C,
		slug: E,
	): E extends ValidContentEntrySlug<C>
		? Promise<CollectionEntry<C>>
		: Promise<CollectionEntry<C> | undefined>;
	export function getEntry<
		C extends keyof DataEntryMap,
		E extends keyof DataEntryMap[C] | (string & {}),
	>(
		collection: C,
		id: E,
	): E extends keyof DataEntryMap[C]
		? Promise<DataEntryMap[C][E]>
		: Promise<CollectionEntry<C> | undefined>;

	/** Resolve an array of entry references from the same collection */
	export function getEntries<C extends keyof ContentEntryMap>(
		entries: {
			collection: C;
			slug: ValidContentEntrySlug<C>;
		}[],
	): Promise<CollectionEntry<C>[]>;
	export function getEntries<C extends keyof DataEntryMap>(
		entries: {
			collection: C;
			id: keyof DataEntryMap[C];
		}[],
	): Promise<CollectionEntry<C>[]>;

	export function render<C extends keyof AnyEntryMap>(
		entry: AnyEntryMap[C][string],
	): Promise<RenderResult>;

	export function reference<C extends keyof AnyEntryMap>(
		collection: C,
	): import('astro/zod').ZodEffects<
		import('astro/zod').ZodString,
		C extends keyof ContentEntryMap
			? {
					collection: C;
					slug: ValidContentEntrySlug<C>;
				}
			: {
					collection: C;
					id: keyof DataEntryMap[C];
				}
	>;
	// Allow generic `string` to avoid excessive type errors in the config
	// if `dev` is not running to update as you edit.
	// Invalid collection names will be caught at build time.
	export function reference<C extends string>(
		collection: C,
	): import('astro/zod').ZodEffects<import('astro/zod').ZodString, never>;

	type ReturnTypeOrOriginal<T> = T extends (...args: any[]) => infer R ? R : T;
	type InferEntrySchema<C extends keyof AnyEntryMap> = import('astro/zod').infer<
		ReturnTypeOrOriginal<Required<ContentConfig['collections'][C]>['schema']>
	>;

	type ContentEntryMap = {
		"7-sisters": {
"the-summoning.md": {
	id: "the-summoning.md";
  slug: "the-summoning";
  body: string;
  collection: "7-sisters";
  data: InferEntrySchema<"7-sisters">
} & { render(): Render[".md"] };
};
"blog": {
"Curious-Case-of-WhiteRabbitNeo.md": {
	id: "Curious-Case-of-WhiteRabbitNeo.md";
  slug: "curious-case-of-whiterabbitneo";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Happy-Frog.md": {
	id: "Happy-Frog.md";
  slug: "happy-frog";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"Origin.md": {
	id: "Origin.md";
  slug: "origin";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"ai-in-bug-bounties.md": {
	id: "ai-in-bug-bounties.md";
  slug: "ai-in-bug-bounties";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"ethics-before-skill.md": {
	id: "ethics-before-skill.md";
  slug: "ethics-before-skill";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"flagged-for-ethics.md": {
	id: "flagged-for-ethics.md";
  slug: "flagged-for-ethics";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"hacker-compass.md": {
	id: "hacker-compass.md";
  slug: "hacker-compass";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"prompt-injection.md": {
	id: "prompt-injection.md";
  slug: "prompt-injection";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"red-flag-clients.md": {
	id: "red-flag-clients.md";
  slug: "red-flag-clients";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
"vibe-scraper-incident.md": {
	id: "vibe-scraper-incident.md";
  slug: "vibe-scraper-incident";
  body: string;
  collection: "blog";
  data: InferEntrySchema<"blog">
} & { render(): Render[".md"] };
};
"happy-frog": {
"Access_and_Evasion.md": {
	id: "Access_and_Evasion.md";
  slug: "access_and_evasion";
  body: string;
  collection: "happy-frog";
  data: InferEntrySchema<"happy-frog">
} & { render(): Render[".md"] };
"Rapid_Access.md": {
	id: "Rapid_Access.md";
  slug: "rapid_access";
  body: string;
  collection: "happy-frog";
  data: InferEntrySchema<"happy-frog">
} & { render(): Render[".md"] };
"Session-Persistence.md": {
	id: "Session-Persistence.md";
  slug: "session-persistence";
  body: string;
  collection: "happy-frog";
  data: InferEntrySchema<"happy-frog">
} & { render(): Render[".md"] };
"What_Even_is_HID.md": {
	id: "What_Even_is_HID.md";
  slug: "what_even_is_hid";
  body: string;
  collection: "happy-frog";
  data: InferEntrySchema<"happy-frog">
} & { render(): Render[".md"] };
};
"helper-notes": {
"README.md": {
	id: "README.md";
  slug: "readme";
  body: string;
  collection: "helper-notes";
  data: InferEntrySchema<"helper-notes">
} & { render(): Render[".md"] };
"ai-prompting-pro-guide.md": {
	id: "ai-prompting-pro-guide.md";
  slug: "ai-prompting-pro-guide";
  body: string;
  collection: "helper-notes";
  data: InferEntrySchema<"helper-notes">
} & { render(): Render[".md"] };
"ai-security-commands.md": {
	id: "ai-security-commands.md";
  slug: "ai-security-commands";
  body: string;
  collection: "helper-notes";
  data: InferEntrySchema<"helper-notes">
} & { render(): Render[".md"] };
"burp-suite-tips.md": {
	id: "burp-suite-tips.md";
  slug: "burp-suite-tips";
  body: string;
  collection: "helper-notes";
  data: InferEntrySchema<"helper-notes">
} & { render(): Render[".md"] };
"github-commands.md": {
	id: "github-commands.md";
  slug: "github-commands";
  body: string;
  collection: "helper-notes";
  data: InferEntrySchema<"helper-notes">
} & { render(): Render[".md"] };
"nmap-commands.md": {
	id: "nmap-commands.md";
  slug: "nmap-commands";
  body: string;
  collection: "helper-notes";
  data: InferEntrySchema<"helper-notes">
} & { render(): Render[".md"] };
"sql-injection-commands.md": {
	id: "sql-injection-commands.md";
  slug: "sql-injection-commands";
  body: string;
  collection: "helper-notes";
  data: InferEntrySchema<"helper-notes">
} & { render(): Render[".md"] };
};
"labs": {
"htb-cap.md": {
	id: "htb-cap.md";
  slug: "htb-cap";
  body: string;
  collection: "labs";
  data: InferEntrySchema<"labs">
} & { render(): Render[".md"] };
};
"tools": {
"index-1.md": {
	id: "index-1.md";
  slug: "index-1";
  body: string;
  collection: "tools";
  data: InferEntrySchema<"tools">
} & { render(): Render[".md"] };
};

	};

	type DataEntryMap = {
		
	};

	type AnyEntryMap = ContentEntryMap & DataEntryMap;

	export type ContentConfig = typeof import("./../../src/content/config.js");
}
