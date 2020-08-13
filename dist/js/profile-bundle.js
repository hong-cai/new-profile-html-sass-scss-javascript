/******/ (function(modules) { // webpackBootstrap
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "hot/hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "hot/hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "3363e0051f505c94886f";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_selfInvalidated: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/ 			invalidate: function() {
/******/ 				this._selfInvalidated = true;
/******/ 				switch (hotStatus) {
/******/ 					case "idle":
/******/ 						hotUpdate = {};
/******/ 						hotUpdate[moduleId] = modules[moduleId];
/******/ 						hotSetStatus("ready");
/******/ 						break;
/******/ 					case "ready":
/******/ 						hotApplyInvalidatedModule(moduleId);
/******/ 						break;
/******/ 					case "prepare":
/******/ 					case "check":
/******/ 					case "dispose":
/******/ 					case "apply":
/******/ 						(hotQueuedInvalidatedModules =
/******/ 							hotQueuedInvalidatedModules || []).push(moduleId);
/******/ 						break;
/******/ 					default:
/******/ 						// ignore requests in error states
/******/ 						break;
/******/ 				}
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash, hotQueuedInvalidatedModules;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus(hotApplyInvalidatedModules() ? "ready" : "idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			var chunkId = "profile";
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/ 		return hotApplyInternal(options);
/******/ 	}
/******/
/******/ 	function hotApplyInternal(options) {
/******/ 		hotApplyInvalidatedModules();
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (
/******/ 					!module ||
/******/ 					(module.hot._selfAccepted && !module.hot._selfInvalidated)
/******/ 				)
/******/ 					continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted &&
/******/ 				// removed self-accepted modules should not be required
/******/ 				appliedUpdate[moduleId] !== warnUnexpectedRequire &&
/******/ 				// when called invalidate self-accepting is not possible
/******/ 				!installedModules[moduleId].hot._selfInvalidated
/******/ 			) {
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					parents: installedModules[moduleId].parents.slice(),
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Now in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		if (hotUpdateNewHash !== undefined) {
/******/ 			hotCurrentHash = hotUpdateNewHash;
/******/ 			hotUpdateNewHash = undefined;
/******/ 		}
/******/ 		hotUpdate = undefined;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = item.parents;
/******/ 			hotCurrentChildModule = moduleId;
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			return hotApplyInternal(options).then(function(list) {
/******/ 				outdatedModules.forEach(function(moduleId) {
/******/ 					if (list.indexOf(moduleId) < 0) list.push(moduleId);
/******/ 				});
/******/ 				return list;
/******/ 			});
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModules() {
/******/ 		if (hotQueuedInvalidatedModules) {
/******/ 			if (!hotUpdate) hotUpdate = {};
/******/ 			hotQueuedInvalidatedModules.forEach(hotApplyInvalidatedModule);
/******/ 			hotQueuedInvalidatedModules = undefined;
/******/ 			return true;
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApplyInvalidatedModule(moduleId) {
/******/ 		if (!Object.prototype.hasOwnProperty.call(hotUpdate, moduleId))
/******/ 			hotUpdate[moduleId] = modules[moduleId];
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return hotCreateRequire(0)(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/css/main.scss":
/*!***************************!*\
  !*** ./src/css/main.scss ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("// extracted by mini-css-extract-plugin\n\n//# sourceURL=webpack:///./src/css/main.scss?");

/***/ }),

/***/ "./src/js/index.js":
/*!*************************!*\
  !*** ./src/js/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nconsole.log('in js file');\n/** ==========================\r\n ** - Remove LocalStorage Key -\r\n** ==========================\r\n**\r\n*/\n\nwindow.onbeforeunload = function () {\n  localStorage.removeItem('loginPopedUp');\n  return '';\n};\n/** =================\r\n ** - Embed Google Map -\r\n** ===================\r\n**\r\n*/\n\n\nfunction initMap() {\n  var options = {\n    center: {\n      lat: -41.2865,\n      lng: 174.7762\n    },\n    zoom: 14\n  };\n  var map = new google.maps.Map(document.getElementById(\"map\"), options);\n  var flag = \"https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png\";\n  var marker = new google.maps.Marker({\n    // position: wellington lat: -41.2865, lng: 174.7762 \n    position: {\n      lat: -41.2865,\n      lng: 174.7762\n    },\n    map: map,\n    icon: flag\n  });\n  var infowindow = new google.maps.InfoWindow({\n    content: \"<p>Marker Location:\" + marker.getPosition() + \"</p>\"\n  });\n  google.maps.event.addListener(marker, \"click\", function () {\n    infowindow.open(map, marker);\n  });\n}\n\n;\nwindow.initMap = initMap;\n/*End of Google Map */\n\n/** ===========================================\r\n** - DEPRECATED:Assign Main Random Colors To Icons-\r\n** ============================================\r\n**\r\n*/\n// let colors = ['#CAF1DE', '#E1F8DC', '#FEF8DD', '#FFE7C7', '#F7D8BA'];\n// document.addEventListener('DOMContentLoaded', getColorScheme());\n// const contactsIcons = document.querySelectorAll('.personal-contacts i');\n// console.log(contactsIcons);\n// window.addEventListener('load', () => {\n//     contactsIcons.forEach(icon => {\n//         for (let i = 0; i < [...contactsIcons].length; i++) {\n//             let randomIndex = Math.floor(Math.random() * (colors.length));\n//             icon.style.color = `darken(${colors[randomIndex]},10%)`;\n//             colors = colors.filter((color, index) => index !== randomIndex);\n//         }\n//     });\n// });\n// function getColorScheme() {\n//     const divs = document.querySelectorAll('.wrapper');\n//     const navs = document.querySelectorAll('.nav-wrapper');\n//     for (let i = 0; i < divs.length; i++) {\n//         let randomIndex = Math.floor(Math.random() * (colors.length));\n//         const newStyle = colors[randomIndex];\n//         divs[i].style.background = \"url('../img/bg-main.jpg') repeat \" + newStyle;\n//         colors = colors.filter((color, index) => index !== randomIndex);\n//     }\n// }\n\n/* -----End of Random Content Background----- */\n\n/** ============================================\r\n** - Prevent CSS Transition Before Fully Loading -\r\n** =============================================\r\n**\r\n*/\n\nvar preloader = document.querySelector('.preloader');\nvar currentCard = document.querySelector('.current-card');\nvar cardsRail = document.querySelector('.cards-track');\nwindow.addEventListener('load', function () {\n  // setTimeout(() => {  }, 500);\n  preloader.classList.add('complete');\n  cardsRail.style.transform = 'translateX(-' + currentCard.style.left + ')';\n});\n/** =========================================== \r\n** - Menu Close Button + Toggle Responsive Menu  -\r\n** =========================================== */\n\nvar menuSpan = document.querySelector('.nav-btn span');\nvar centerBar = document.querySelector('.nav-btn span i');\nvar navMenu = document.querySelector('.nav-menu');\nvar cardsNav = document.getElementById('cards-nav');\nmenuSpan.addEventListener('click', showHideMenu);\nwindow.addEventListener('touchstart', function (e) {\n  if (!cardsNav.contains(e.target)) {\n    hideMenu();\n  }\n});\n\nfunction showHideMenu() {\n  menuSpan.classList.toggle(\"active\");\n  centerBar.classList.toggle(\"active\");\n  navMenu.classList.toggle('toggle-menu');\n}\n\nfunction hideMenu() {\n  menuSpan.classList.remove(\"active\");\n  centerBar.classList.remove(\"active\");\n  navMenu.classList.remove('toggle-menu');\n}\n/*End of Bars clicked to turn into close icon */\n\n/** =============================\r\n**  -  Main Slides Scrolling -\r\n** ==============================*/\n\n\nvar cards = Array.from(cardsRail.children);\nvar leftArrow = document.querySelector('.left-arrow');\nvar rightArrow = document.querySelector('.right-arrow');\nvar navWraps = document.querySelectorAll('.nav-wrapper'); // const cardWidth = cards[0].getBoundingClientRect().width;\n\nvar mainWidth = document.querySelector('.main').getBoundingClientRect().width; // console.log(mainWidth);\n// console.log(Math.floor(mainWidth));\n// console.log(Math.round(mainWidth));\n// console.log(document.documentElement.clientWidth);\n\nvar responsiveWidth = mainWidth / document.documentElement.clientWidth * 100;\ncards.forEach(function (card, index) {\n  card.style.left = Math.floor(index * responsiveWidth) + 'vw';\n}); //Cards track width based on all cards' width\n\ncardsRail.style.width = responsiveWidth * cards.length + 'vw';\nnavWraps.forEach(function (nav) {\n  nav.addEventListener('click', function (e) {\n    var currentCard = cardsRail.querySelector('.current-card');\n    var clickedNav = e.currentTarget;\n\n    var clickedIndex = _toConsumableArray(navWraps).indexOf(clickedNav);\n\n    var currentIndex = cards.indexOf(currentCard); //hightlight current nav\n\n    hightlightNav(navWraps[currentIndex], navWraps[clickedIndex]); //able/disable left/right arrows\n\n    if (clickedIndex === 0) {\n      hideShowArrow(leftArrow);\n    } else if (clickedIndex === navWraps.length - 1) {\n      hideShowArrow(rightArrow);\n    } else if (clickedIndex !== 0 || navWraps.length - 1) {\n      showArrow(leftArrow);\n      showArrow(rightArrow);\n    }\n\n    var nextCard = cards.find(function (card, index) {\n      return index === clickedIndex ? card : false;\n    });\n    moveToCard(cardsRail, nextCard, currentCard);\n  });\n}); //Left/Right arrow clicks and slides move\n\nrightArrow.addEventListener('click', ToRightSlide);\nleftArrow.addEventListener('click', ToLeftSlide); //keyboard controls left/right\n\ndocument.onkeydown = function (e) {\n  switch (e.keyCode) {\n    case 37:\n      //left\n      e.preventDefault();\n      ToLeftSlide();\n      break;\n\n    case 39:\n      //right\n      e.preventDefault();\n      ToRightSlide();\n      break;\n  }\n}; //highlight current nav\n\n\nfunction hightlightNav(currentNav, targetNav) {\n  currentNav.classList.remove('highlight');\n  targetNav.classList.add('highlight');\n} //slide left to the sibling card\n\n\nfunction ToLeftSlide() {\n  var currentCard = cardsRail.querySelector('.current-card');\n  var prevCard = currentCard.previousElementSibling || currentCard;\n  var prevIndex = cards.indexOf(prevCard);\n  var currentIndex = cards.indexOf(currentCard); //hightlight current nav\n\n  hightlightNav(navWraps[currentIndex], navWraps[prevIndex]); //activate arrow when necessary\n\n  showArrow(rightArrow); //move to the requested card\n\n  if (cards.indexOf(prevCard) >= 0) {\n    moveToCard(cardsRail, prevCard, currentCard);\n    return cards.indexOf(prevCard) === 0 ? leftArrow.classList.add('disable-arrow') : null;\n  }\n} //slide right to the sibling card\n\n\nfunction ToRightSlide() {\n  var currentCard = cardsRail.querySelector('.current-card');\n  var nextCard = currentCard.nextElementSibling || currentCard;\n  var nextIndex = cards.indexOf(nextCard);\n  var currentIndex = cards.indexOf(currentCard); //hightlight current nav\n\n  hightlightNav(navWraps[currentIndex], navWraps[nextIndex]); //activate arrow when necessary\n\n  showArrow(leftArrow); //move to the requested card\n\n  if (cards.indexOf(nextCard) < cards.length) {\n    moveToCard(cardsRail, nextCard, currentCard);\n    return cards.indexOf(nextCard) === cards.length - 1 ? rightArrow.classList.add('disable-arrow') : null;\n  }\n} //move to a certain card\n\n\nfunction moveToCard(track, targetCard, currentCard) {\n  cardsRail.style.transform = 'translateX(-' + targetCard.style.left + ')';\n  currentCard.classList.remove('current-card');\n  targetCard.classList.add('current-card');\n} //activate disabled arrows\n\n\nfunction showArrow(arrow) {\n  return arrow.classList.contains('disable-arrow') ? arrow.classList.remove('disable-arrow') : null;\n} //activate/deactivate arrows\n\n\nfunction hideShowArrow(arrow) {\n  return arrow.classList.contains('disable-arrow') ? arrow.classList.remove('disable-arrow') : arrow.classList.add('disable-arrow');\n}\n/** =============================\r\n**  -Main Slides-Touch Screen-\r\n** ==============================\r\n**\r\n*/\n\n\ncardsRail.addEventListener('touchstart', handleTouchStart, false);\ncardsRail.addEventListener('touchend', handleTouchEnd, false); // cardsRail.addEventListener('touchmove', handleTouchMove, false);\n\nvar startX;\nvar endX;\n\nfunction handleTouchStart(e) {\n  startX = e.touches[0].clientX;\n}\n\nfunction handleTouchEnd(e) {\n  endX = e.changedTouches[0].clientX;\n  var dist = startX - endX;\n\n  if (dist > 80) {\n    ToRightSlide();\n  } else if (dist < -80) {\n    ToLeftSlide();\n  } else {\n    return false;\n  }\n}\n/* ----End of Main Slides-Touch Screen----- */\n\n/** ================================\r\n** --Animate When Slide Moves In--\r\n** =================================\r\n**\r\n*/\n// currentCard.addEventListener('')\n\n/* ----End of Animation When Slide Moves In----- */\n\n/** ===================================\r\n** --  About Slide:Overal Level Rating  --\r\n** ====================================\r\n**\r\n*/\n\n\nvar starsRating = document.querySelector('.stars-rating');\nwindow.addEventListener('load', function () {\n  handleStarsLength(starsRating, 0.4);\n});\n/* ----End of About Page:Level Rating----- */\n\n/** ======================================================\r\n ** ---DEPRECATED: IN PHP INSTEAD: Display Recent Works ---\r\n ** ======================================================\r\n **\r\n */\n// async function getWorksData() {\n//     const res = await fetch(`http://localhost/profile-css-html-js/mvc/index.php`);\n//     const data = await res.json();\n//     console.log(data);\n// }\n// const works = [\n//     { id: 1, name: 'BYO Homes', level: '0.4', time: '02/2020', description: 'A maximum 20-hour work created on Wordpress early 2020,A maximum 20-hour work created on Wordpress early 202,A maximum 20-hour work created on Wordpress early 20A maximum 20-hour work created on Wordpress early 2020,A maximum 20-hour work created on Wordpress early 202,A maximum 20-hour work created on Wordpress early 2022', img: './css/img/byohomes500x348.jpg' },\n//     { id: 2, name: 'Woodend Golf Club', level: '0.5', time: '01/2020', description: 'A maximum 20-hour work created on Wordpress early 2020,A maximum 20-hour work created on Wordpress early 202,A maximum 20-hour work created on Wordpress early 202', img: './css/img/woodendgolfclub 500x348.jpg' }\n// ];\n// const worksFrame = document.querySelector('.frame-wrapper');\n// window.addEventListener('load', () => {\n//     works.forEach(work => {\n//         const workDiv = document.createElement('div');\n//         workDiv.classList.add('website-frame');\n//         const worksList = `<div class=\"website-screenshot\">\n//         <div class=\"website-img\" onclick=\"document.querySelector('.modal-img').style.display = 'block';\">\n//         <a href=\"${work.img}\" onclick=\"event.preventDefault();\">\n//             <img src=\" ${work.img} \" alt=\" ${work.name} \" id=\"img-\"+${work.id}/></a>\n//         </div>\n//         <div class=\"website-text\">\n//             <div>\n//                 <a href=\"\">\n//                     <h4> ${work.name} </h4>\n//                 </a>\n//                 <div class='project-level'>\n//                 <span> <strong>Difficulty:</strong></span>\n//                 <div class=\"stars-track\">\n//                     <div class=\"progress\">\n//                         <div class=\"star\"><i class=\"fa fa-star\"></i></div>\n//                         <div class=\"star\"><i class=\"fa fa-star\"></i></div>\n//                         <div class=\"star\"><i class=\"fa fa-star\"></i></div>\n//                         <div class=\"star\"><i class=\"fa fa-star\"></i></div>\n//                         <div class=\"star\"><i class=\"fa fa-star\"></i></div>\n//                     </div>\n//                     <div class=\"star\"><i class=\"fa fa-star-o\"></i></div>\n//                     <div class=\"star\"><i class=\"fa fa-star-o\"></i></div>\n//                     <div class=\"star\"><i class=\"fa fa-star-o\"></i></div>\n//                     <div class=\"star\"><i class=\"fa fa-star-o\"></i></div>\n//                     <div class=\"star\"><i class=\"fa fa-star-o\"></i></div>\n//                 </div>\n//             </div>\n//             <span> <strong>Time:</strong>${work.time}</span>\n//                 <p>${work.description}\n//             </div>\n//             </p>\n//         </div>`;\n//         workDiv.innerHTML = worksList;\n//         worksFrame.appendChild(workDiv);\n//         handleStarsLength(workDiv, work.level);\n//     });\n// });\n\n/*End of Displaying Works */\n\n/** =====================================\r\n ** --- Display Recent Works Stars Level ---\r\n ** ====================================\r\n **\r\n */\n\nfunction handleStarsLength(addedDiv, percent) {\n  // Calculate the length of star progress bar\n  var starsTrack = addedDiv.querySelector('.stars-track');\n  var progress = addedDiv.querySelector('.progress');\n  var horrowStars = addedDiv.querySelectorAll('.stars-track > .star');\n  var hardStars = addedDiv.querySelectorAll('.progress > .star');\n  var starWidth = horrowStars[0].offsetWidth; //Setting each horrow star width,left and position\n\n  starLeft(_toConsumableArray(horrowStars)); //Setting each hard stars width,left and position\n\n  starLeft(_toConsumableArray(hardStars)); //Setting starTrack's whole width\n\n  starsTrack.style.width = starWidth * horrowStars.length + 'px'; //progress bar to display the skill level,default:60%\n\n  progress.style.width = percent * starWidth * horrowStars.length + 'px'; //setting each star style.left;\n\n  function starLeft(stars) {\n    stars.map(function (star, index) {\n      stars[index].style.left = starWidth * index + 'px';\n    });\n  }\n} //Jquery Ajax here to get all the skills' levels for work projects\n// const projects = document.querySelectorAll('.project-level');\n// $('.experience').ready(function () {\n//     $.ajax({\n//         type: 'GET',\n//         url: \"http://localhost/profile-css-html-js/mvc/profile/getStarsLevel\",\n//         dataType: 'json',\n//         success: function (data) {\n//             for (let i = 0; i < projects.length; i++) {\n//                 handleStarsLength(projects[i], parseFloat(data[i].content_detail));\n//             }\n//         },\n//         error: function (response) {\n//             alert('something wrong');\n//         }\n//     });\n// });\n\n/*End of Displaying Works Stars Level */\n\n/** ================================\r\n ** --   Show Modal Images    --\r\n ** ================================\r\n**\r\n*/\n// const imgDivs = document.querySelectorAll('.content-experience');\n// console.log(imgDivs);\n// debugger;\n// const experienceContent = document.querySelector('.content-experience');\n// imgDivs.forEach(imgDiv => {\n//     imgDiv.addEventListener('click', (e) => {\n//         e.preventDefault;\n//         console.log(e.target.getAttribute('href'));\n//         const imgModal = document.createElement('div');\n//         imgModal.classList.add('.modal-img');\n//         experienceContent.insertBefore(imgModal);\n//         imgModal.innerHTML = `hello`;\n//     })\n// })\n\n/*End of Displaying Modal Images */\n\n/** ================================\r\n** -- Display:Skills Progress Bars  --\r\n** =================================\r\n**\r\n*/\n// Display the skills level progress divs\n// const progressDiv = document.querySelector('.progress-bars');\n// $('.Skills').ready(function () {\n//     $.ajax({\n//         type: 'GET',\n//         url: \"http://localhost/profile-css-html-js/mvc/profile/getSkillsInfo\",\n//         dataType: 'json',\n//         success: function (data) {\n//             const skillGroup = Math.round(data.length / 3);\n//             data.map(record=>{})\n//             debugger;\n//             for (let i = 0; i < data.length; i++) {\n//                 // console.log(data[i].content_title);\n//                 const skillDiv = document.createElement('div');\n//                 skillDiv.classList.add('progress-bar');\n//                 skillDiv.innerHTML = `\n// <div class='skill'>\n// <span class='skill-title'>${data[i].content_title}</span>\n// </div>\n// `;\n//                 progressDiv.appendChild(skillDiv);\n//                 // handleStarsLength(skillDiv, sample.level);\n//             }\n//         },\n//         error: function (response) {\n//             alert('something wrong');\n//         }\n//     });\n// });\n\n\nvar skillsSample = [{\n  id: 1,\n  skill: 'Javascript',\n  level: 0.6\n}, {\n  id: 2,\n  skill: 'HTML',\n  level: 0.9\n}, {\n  id: 3,\n  skill: 'CSS',\n  level: 0.8\n}];\nvar progressDiv = document.querySelector('.progress-bars'); // console.log(progressDiv);\n\nwindow.addEventListener('load', function () {\n  skillsSample.forEach(function (sample) {\n    var skillDiv = document.createElement('div');\n    skillDiv.classList.add('progress-bar'); // skillDiv.setAttribute('id', 'skill-' + `${sample.skill}`);\n\n    skillDiv.innerHTML = \"\\n            <div class=\\\"skill\\\">\\n            <span class=\\\"skill-title\\\">\".concat(sample.skill, \"</span>\\n            <span class=\\\"skill-level\\\">\").concat(sample.level * 100, \"%</span>\\n        </div>\\n        <div class=\\\"stars-track\\\">\\n            <div class=\\\"progress\\\">\\n                <div class=\\\"star\\\"><i class=\\\"fa fa-star\\\"></i></div>\\n                <div class=\\\"star\\\"><i class=\\\"fa fa-star\\\"></i></div>\\n                <div class=\\\"star\\\"><i class=\\\"fa fa-star\\\"></i></div>\\n                <div class=\\\"star\\\"><i class=\\\"fa fa-star\\\"></i></div>\\n                <div class=\\\"star\\\"><i class=\\\"fa fa-star\\\"></i></div>\\n            </div>\\n            <div class=\\\"star\\\"><i class=\\\"fa fa-star-o\\\"></i></div>\\n            <div class=\\\"star\\\"><i class=\\\"fa fa-star-o\\\"></i></div>\\n            <div class=\\\"star\\\"><i class=\\\"fa fa-star-o\\\"></i></div>\\n            <div class=\\\"star\\\"><i class=\\\"fa fa-star-o\\\"></i></div>\\n            <div class=\\\"star\\\"><i class=\\\"fa fa-star-o\\\"></i></div>\\n        </div>\\n        <div class=\\\"details\\\">\\n            <span>\\n                <div class=\\\"level-btn\\\">\\n                    <a href=\\\"/\\\">\\n                        <i class=\\\"fa fa-link\\\" aria-hidden=\\\"true\\\"></i>\\n                    </a>\\n                </div>\\n            </span>\\n            <span>\\n                <div class=\\\"level-btn\\\">\\n                    <a href=\\\"/\\\">\\n                        <i class=\\\"fa fa-ellipsis-h\\\" aria-hidden=\\\"true\\\"></i>\\n                    </a>\\n                </div>\\n            </span>\\n        </div>\\n            \");\n    progressDiv.appendChild(skillDiv);\n    handleStarsLength(skillDiv, sample.level);\n  });\n});\n/* ----End of Skills Progress Bars----- */\n\n/** ===========================\r\n ** ----- Hide Modal -------\r\n ** ===========================\r\n **\r\n */\n// Get the modal\n\nvar modalLogin = document.querySelector('.modal-login');\nvar modalNote = document.querySelector('.modal-note');\nvar noteDisplay = modalNote.querySelector('.note-display');\nvar modalDelete = document.querySelector('.modal-delete');\nvar deleteCancel = document.querySelector('.confirm-n');\nvar imgCancel = document.querySelector('.modal-img');\nvar modalArray = [modalLogin, modalNote, modalDelete];\nvar noteBtns = document.querySelectorAll('button[data-id]');\n\n_toConsumableArray(noteBtns).forEach(function (btn) {\n  btn.addEventListener('click', function (e) {\n    var noteId = e.target.getAttribute('data-id'); //Get note data from fetchAPI\n\n    fetchNoteInfo(noteId); //Check if session exists,flag in localStorage\n\n    controlModalNoteOpen();\n  });\n}); //Get note data from fetchAPI\n\n\nfunction fetchNoteInfo(noteId) {\n  fetch(\"notes/getSingleNote/\".concat(noteId), {\n    method: 'get',\n    headers: {\n      'Accept': 'application/json',\n      'Content-Type': 'application/json'\n    }\n  }).then(function (response) {\n    if (!response.ok) {\n      throw response.status + ': ' + Response.responseText;\n    }\n\n    return response.json();\n  }).then(function (data) {\n    // const parsedData = JSON.parse(data);\n    noteDetails(data);\n  })[\"catch\"](function (error) {\n    return console.log(error);\n  });\n}\n\nfunction modalOpen(modal) {\n  modal.style.display = 'block';\n} //Check if session exists,flag in localStorage\n\n\nfunction controlModalNoteOpen() {\n  if (sessionStorage.getItem(\"user_id\") !== null) {\n    modalOpen(modalNote);\n  } else {\n    //Remind to login once only,if 'use_id'not there,flag in localstorage\n    if (localStorage.getItem('loginPopedUp') !== \"1\") {\n      localStorage.setItem('loginPopedUp', 1);\n      modalOpen(modalLogin);\n      return;\n    }\n\n    modalOpen(modalNote);\n  }\n} //Close modal and clean modalNote innerHTML\n\n\nmodalArray.forEach(function (modal) {\n  return modal.addEventListener('click', function (e) {\n    if (e.target == modal) {\n      modal.style.display = \"none\";\n\n      if (modal == modalNote) {\n        modalNote.innerHTML = null;\n      } else if (modal == modalLogin) {\n        modalOpen(modalNote);\n      }\n    }\n  });\n}); //Display the note contents\n\nfunction noteDetails(data) {\n  var note = document.createElement('div');\n  note.classList.add('note', 'note-display', 'animate');\n  note.innerHTML = \"\\n    <div class=\\\"note-title\\\">\\n        <h4> <strong>\".concat(data.title, \"</strong></h4>\\n        <div class=\\\"note-category\\\">\\n            <span class=\\\"note-tag\\\">\\n                <h5>\").concat(data.category, \"</h5>\\n            </span>\\n            <span class=\\\"note-tag\\\">\\n                <h5>\").concat(data.created_at, \"</h5>\\n            </span>\\n        </div>\\n    </div>\\n    <div class=\\\"note-body\\\">\\n        <p>\\n        \").concat(data.body, \"\\n        </p>\\n    </div>\\n    <div class=\\\"note-footer\\\">\\n\\n        <button //REMIND: SHOULD BE REPLY CONTENT\\n            onclick=\\\"document.querySelector('.modal-note').style.display='none'\\\"\\n            style=\\\"width:auto;\\\">ok</button>\\n    </div>\\n    \");\n  modalNote.appendChild(note);\n}\n\ndeleteCancel.addEventListener('click', function () {\n  modalDelete.style.display = 'none';\n  console.log('herehere');\n});\n/*End of Hiding Modal */\n\n/** ==============================\r\n ** - ReadMore Btn Gets Note Info -\r\n ** ==============================\r\n **\r\n */\n// [...noteBtns].forEach(btn => btn.addEventListener('click', (e) => {\n//     console.log(e.target.getAttribute('data-id'));\n//     const noteId = e.target.getAttribute('data-id');\n// fetch('notes/getSingleNote', {\n//     method: 'POST',\n//     headers: { 'Content-Type': 'application/json' },\n//     body: JSON.stringify({\n//         'data': noteId\n//     })\n//         .then((response) => {\n//             if (!response.ok) {\n//                 throw (response.status + ': ' + Response.responseText);\n//             }\n//             return response.json();\n//         })\n//         .then((data) => {\n//             // modalLogin.style.display = 'block'?modalLogin.style.display = 'none':null;\n//             const parsedData = JSON.parse(data);\n//             console.log(parsedData);\n//         })\n//         .catch(error => console.log(error))\n// })\n// }));\n\n/* ----End of ReadMore Btn Gets Note Info----- */\n\n/** ==========================  \r\n ** - About Page:Tag Buttons -\r\n ** ========================= */\n// .btn - highlight\n\nvar tagBtns = document.querySelectorAll('.main-btns li button');\n\n_toConsumableArray(tagBtns).forEach(function (btn) {\n  btn.addEventListener('click', function (e) {\n    removeHighlight();\n    var clickedBtn = e.currentTarget;\n    clickedBtn.classList.add('btn-highlight');\n  });\n});\n\nfunction removeHighlight() {\n  tagBtns.forEach(function (btn) {\n    return btn.classList.contains('btn-highlight') ? btn.classList.remove('btn-highlight') : null;\n  });\n}\n/* ----End of Skills Progress Bars----- */\n\n/** ================ \r\n** - Tags Switch -\r\n \r\n** ================ */\n\n\nwindow.addEventListener('load', function () {\n  var tagSlides = document.querySelector('.content-about');\n  var Btns = document.querySelectorAll('.main-btns button');\n  var nSlides = tagSlides.querySelectorAll(\".tag-slide\");\n\n  for (var i = 0; i < Btns.length; i++) {\n    Btns[i].index = i;\n\n    Btns[i].onclick = function () {\n      nSlides.forEach(function (slide) {\n        slide.classList.remove('tag-slide-in');\n        slide.classList.add('tag-slide-fade');\n      });\n      nSlides[this.index].classList.remove('tag-slide-fade');\n      nSlides[this.index].classList.add('tag-slide-in');\n    };\n  }\n});\n/*End of Tag Switch */\n\n/** =================================\r\n ** ----- Hide Contact Content -------\r\n ** =================================\r\n **\r\n */\n\nvar contactTitles = document.querySelectorAll('.card-contact .card-details');\nvar contactBlocks = document.querySelectorAll('.card-contact .content-range'); // const arrowIcons=document.querySelectorAll('.card-contact .content-range')\n// console.log([...contactBlocks][0]);\n\nfor (var i = 0; i < contactTitles.length; i++) {\n  contactTitles[i].addEventListener('click', function () {// contactBlocks[]\n  });\n}\n/*End of Hiding Contact Content */\n\n/** =========================\r\n ** - Contact Form Validation -\r\n ** ========================\r\n **\r\n */\n\n\nvar inputNodes = document.querySelectorAll('.contacts-validate .input100');\nvar newInputs = Array.from(inputNodes); //remove alert message when input on focus\n\n_toConsumableArray(newInputs).forEach(function (input) {\n  input.addEventListener('focus', function () {\n    hideValidate(input);\n    this.classList.remove('true-validate');\n  });\n}); //validate input value when on blur\n\n\n_toConsumableArray(newInputs).forEach(function (input) {\n  input.addEventListener('blur', function () {\n    if (validate(input) === false) {\n      showValidate(input);\n    } else {\n      this.parentElement.classList.add('true-validate');\n    }\n  });\n}); //function: validate the input value\n\n\nfunction validate(input) {\n  var trimValue = input.value.trim();\n\n  if (input.getAttribute(\"type\") === 'email' || input.getAttribute('name') === 'email') {\n    if (trimValue.match(/^([a-zA-Z0-9_\\-\\.]+)@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.)|(([a-zA-Z0-9\\-]+\\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\\]?)$/) == null) {\n      return false;\n    }\n\n    ;\n  } else {\n    if (trimValue == '') {\n      return false;\n    }\n  }\n\n  ;\n}\n\n; //function: show validate alert message\n\nfunction showValidate(input) {\n  var alertNode = input.parentElement;\n  alertNode.classList.add('alert-validate');\n} //function: hide alert message when input on focus\n\n\nfunction hideValidate(input) {\n  var alertNode = input.parentElement;\n  alertNode.classList.remove('alert-validate');\n}\n/*End of Validating Contact Form */\n\n/** =====================\r\n ** - Contact Form Sumit -\r\n ** =====================\r\n **\r\n */\n\n\nfunction checkFormSumit() {\n  var checkform = document.getElementById('check').value;\n  console.log(checkform);\n}\n/*End of Contact Form Sumit */\n\n/** ===============================\r\n ** - Submit Button Recaptcha -\r\n ** ================================\r\n **\r\n */\n\n\nfunction onSubmit(e) {\n  e.preventDefault();\n  grecaptcha.ready(function () {\n    grecaptcha.execute('6LfgI64ZAAAAAGQAHbRF8-FkXXAT6baiHzAiSOQj', {\n      action: 'submit'\n    }).then(function (token) {\n      console.log(token);\n    });\n  });\n}\n\nvar btnSubmit = document.querySelector('.submit-button');\nbtnSubmit.addEventListener('click', onSubmit);\n/*End of Button Submit Recaptcha */\n\n/** ===============================\r\n** - Load Random Content Background -\r\n** ================================\r\n**\r\n*/\n// window.addEventListener(\"DOMContentLoaded\", function () {\n//     getColorScheme();\n// }, false);\n// let colors = ['#CAF1DE', '#E1F8DC', '#FEF8DD', '#FFE7C7', '#F7D8BA'];\n// document.addEventListener('DOMContentLoaded', getColorScheme());\n// function getColorScheme() {\n//     const divs = document.querySelectorAll('.wrapper');\n//     const navs = document.querySelectorAll('.nav-wrapper');\n//     for (let i = 0; i < divs.length; i++) {\n//         let randomIndex = Math.floor(Math.random() * (colors.length));\n//         const newStyle = colors[randomIndex];\n//         divs[i].style.background = \"url('../img/bg-main.jpg') repeat \" + newStyle;\n//         colors = colors.filter((color, index) => index !== randomIndex);\n//     }\n// }\n\n/* -----End of Random Content Background----- */\n\n/** ================================\r\n** --Click To Bring Tab To front--\r\n** =================================\r\n**\r\n*/\n// const cards = document.querySelector('.cards');\n// const cardsArray = [...document.querySelectorAll('.card')];\n// // console.log(cardsArray);\n// function TabToFront(e) {\n//     const card = e.target.closest(\".card\");\n//     // console.log(card);\n//     if (card.classList.contains('to-front')) {\n//         return card.classList.remove('to-front')\n//     } else {\n//         cardsArray.forEach(card => card.classList.remove('to-front'));\n//         return card.classList.add('to-front')\n//     }\n// }\n// cards.addEventListener('click', (e) => { TabToFront(e); });\n\n/* ----End of Click To Bring Tab To front----- */\n\n/** ================\r\n** - Tags Switch -\r\n** ================ */\n// window.onload = function () {\n//     var tagSlides = document.querySelector('.tag-slides');\n//     var Btns = document.querySelectorAll('.tag-btns button');\n//     var nDiv = tagSlides.getElementsByTagName(\"div\");\n//     for (var i = 0; i < Btns.length; i++) {\n//         Btns[i].index = i;\n//         Btns[i].onclick = function () {\n//             for (i = 0; i < Btns.length; i++) {\n//                 nDiv[i].style.display = \"none\";\n//             }\n//             nDiv[this.index].style.display = \"block\";\n//         };\n//     }\n// };\n\n/*End of Tag Switch */\n\n/* ----Bee Flying Path----- */\n// const flightPath = {\n//     curviness: 1.25,\n//     autoRotate: true,\n//     values: [{ x: 100, y: -20 }]\n// }\n// const tl = new TimelineLite();\n// tl.add(\n//     TweenLite.to('.bee', 3, { bezier: flightPath, ease: Power1.easeInOut })\n// )\n\n/* ----End of Bee Flying Path----- */\n\n/* ----Set Content Size----- */\n// const contents = document.querySelectorAll('.content-range');\n// const contentWidth = contents[0].closest('.content-wrapper').clientWidth;\n// // console.log(contentWidth);\n// contents.forEach((content, index) => {\n//     content.style.width = contentWidth * (100 - 12 * index - 5 * 2) / 100 + 'px';\n// });\n\n/* ----End of Setting Content Size----- */\n\n/* ----Experience Card: Image Hovering Effect----- */\n// const imgCards = document.querySelectorAll('.website-screenshot');\n// const imgFrames = document.querySelectorAll('.website-frame');\n// const imgsWidth = document.querySelector('.experience .content-range');\n// imgFrames.forEach((imgFrame, index) => imgFrame.addEventListener('mousemove', (e) => {\n//     // console.log(imgsWidth.offsetWidth);\n//     posX = (imgsWidth.offsetWidth / 2 - e.pageX) / 20;\n//     posY = (imgsWidth.offsetWidth / 2 - e.pageY) / 10;\n//     console.log(imgCards[index]);\n//     imgCards[index].setAttribute('style', \"transform: rotateY(\" + posX + \"deg) rotateX(\" + posY + \"deg);\");\n//     console.log(imgCards[index].style);\n// }))\n\n/* ----End of Experience Card: Image Hovering Effect----- */\n//\n\n//# sourceURL=webpack:///./src/js/index.js?");

/***/ }),

/***/ 0:
/*!***************************************************!*\
  !*** multi ./src/js/index.js ./src/css/main.scss ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("__webpack_require__(/*! ./src/js/index.js */\"./src/js/index.js\");\nmodule.exports = __webpack_require__(/*! ./src/css/main.scss */\"./src/css/main.scss\");\n\n\n//# sourceURL=webpack:///multi_./src/js/index.js_./src/css/main.scss?");

/***/ })

/******/ });