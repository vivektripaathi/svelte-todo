/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope

import { build, files, version } from '$service-worker';

// Create a unique cache name for this deployment
const CACHE = `cache-${version}`;

const ASSETS = [
	...build, // the app itself
	...files,  // everything in `static`
];

// console.log({ build, files, version });


// install service worker
self.addEventListener('install', (event) => {
	// Create a new cache and add all files to it
	async function addFilesToCache() {
		const cache = await caches.open(CACHE);
		await cache.addAll(ASSETS);
	}

	event.waitUntil(addFilesToCache());
});


// activate service worker
self.addEventListener('activate', (event) => {
	// Remove previous cached data from disk
	async function deleteOldCaches() {
		for (const key of await caches.keys()) {
			if (key !== CACHE) await caches.delete(key);
		}
	}

	event.waitUntil(deleteOldCaches());
});


// listen to fetch events

self.addEventListener('fetch', async event => {
	if(event.request.method !== 'GET') return;

	async function respond() {
		const url = new URL(event.request.url)
		const cache = await caches.open(CACHE)

		//serve build files from cache
		if(ASSETS.includes(url.pathname)) {
			const cachedResponse = await cache.match(url.pathname);
			if (cachedResponse) return cachedResponse;
		}

		// for everything else, try the network first, but
		// fall back to the cache if we're offline
		try {
			const response = await fetch(event.request);
			const isNotExtenstion = url.protocol === 'http:';
			const isSuccess = response.status === 200;

			if(isNotExtenstion && isSuccess) {
				cache.put(event.request, response.clone());
			}

			return response
		} catch (err) {
			//fallback to the cache
			const cachedResponse = await cache.match(event.request);
			if (cachedResponse) return cachedResponse;
			//if no cache found throw regular error
			throw err;
		}

		// return new Response('This site can’t be reached :(', { status: 404 })
	}

	event.respondWith(respond())
})
