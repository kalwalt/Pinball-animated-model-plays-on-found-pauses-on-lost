/** The studio's origin of virtual asset URLs; the type checks it against the studio's. */
export const VIRTUAL_ASSET_ORIGIN = "https://assets.webarkit.invalid";
/** A dataset source for the tracker: a virtual prefix gets its files' blob: URLs as `?<extension>=<blob: URL>`. */
export function virtualSource(url, files) {
	if (!url.startsWith(`${VIRTUAL_ASSET_ORIGIN}/`)) return url;
	const query = new URLSearchParams();
	for (const [file, blobUrl] of Object.entries(files)) {
		if (file.startsWith(`${url}.`)) query.set(file.slice(url.length + 1), blobUrl);
	}
	return `${url}?${query}`;
}
/** fetch() that serves the files of a virtualSource() from their blob: URLs. */
export function virtualFetch(base) {
	return (input, init) => {
		const url = input instanceof Request ? input.url : String(input);
		if (!url.startsWith(`${VIRTUAL_ASSET_ORIGIN}/`)) return base(input, init);
		const { pathname, searchParams } = new URL(url);
		const blobUrl = searchParams.get(pathname.slice(pathname.lastIndexOf(".") + 1));
		return blobUrl ? base(blobUrl, init) : Promise.resolve(new Response(null, {
			status: 404,
			statusText: "Not Found"
		}));
	};
}
// In the tracker's worker, before the facade's module runs (see vite.ts).
if (typeof WorkerGlobalScope !== "undefined" && self instanceof WorkerGlobalScope) {
	self.fetch = virtualFetch(self.fetch.bind(self));
}
