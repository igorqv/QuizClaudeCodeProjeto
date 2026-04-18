"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "app/api/game/answer/route";
exports.ids = ["app/api/game/answer/route"];
exports.modules = {

/***/ "@prisma/client":
/*!*********************************!*\
  !*** external "@prisma/client" ***!
  \*********************************/
/***/ ((module) => {

module.exports = require("@prisma/client");

/***/ }),

/***/ "../../client/components/action-async-storage.external":
/*!*******************************************************************************!*\
  !*** external "next/dist/client/components/action-async-storage.external.js" ***!
  \*******************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/action-async-storage.external.js");

/***/ }),

/***/ "../../client/components/request-async-storage.external":
/*!********************************************************************************!*\
  !*** external "next/dist/client/components/request-async-storage.external.js" ***!
  \********************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/request-async-storage.external.js");

/***/ }),

/***/ "../../client/components/static-generation-async-storage.external":
/*!******************************************************************************************!*\
  !*** external "next/dist/client/components/static-generation-async-storage.external.js" ***!
  \******************************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/client/components/static-generation-async-storage.external.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-page.runtime.dev.js":
/*!*************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-page.runtime.dev.js" ***!
  \*************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-page.runtime.dev.js");

/***/ }),

/***/ "next/dist/compiled/next-server/app-route.runtime.dev.js":
/*!**************************************************************************!*\
  !*** external "next/dist/compiled/next-server/app-route.runtime.dev.js" ***!
  \**************************************************************************/
/***/ ((module) => {

module.exports = require("next/dist/compiled/next-server/app-route.runtime.dev.js");

/***/ }),

/***/ "assert":
/*!*************************!*\
  !*** external "assert" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("assert");

/***/ }),

/***/ "buffer":
/*!*************************!*\
  !*** external "buffer" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("buffer");

/***/ }),

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("crypto");

/***/ }),

/***/ "events":
/*!*************************!*\
  !*** external "events" ***!
  \*************************/
/***/ ((module) => {

module.exports = require("events");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("http");

/***/ }),

/***/ "https":
/*!************************!*\
  !*** external "https" ***!
  \************************/
/***/ ((module) => {

module.exports = require("https");

/***/ }),

/***/ "querystring":
/*!******************************!*\
  !*** external "querystring" ***!
  \******************************/
/***/ ((module) => {

module.exports = require("querystring");

/***/ }),

/***/ "url":
/*!**********************!*\
  !*** external "url" ***!
  \**********************/
/***/ ((module) => {

module.exports = require("url");

/***/ }),

/***/ "util":
/*!***********************!*\
  !*** external "util" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("util");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

module.exports = require("zlib");

/***/ }),

/***/ "(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fgame%2Fanswer%2Froute&page=%2Fapi%2Fgame%2Fanswer%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgame%2Fanswer%2Froute.ts&appDir=C%3A%5Cigorqv-git%5CQuizClaudeCodeProjeto%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cigorqv-git%5CQuizClaudeCodeProjeto&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!":
/*!*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fgame%2Fanswer%2Froute&page=%2Fapi%2Fgame%2Fanswer%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgame%2Fanswer%2Froute.ts&appDir=C%3A%5Cigorqv-git%5CQuizClaudeCodeProjeto%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cigorqv-git%5CQuizClaudeCodeProjeto&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D! ***!
  \*****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   originalPathname: () => (/* binding */ originalPathname),\n/* harmony export */   patchFetch: () => (/* binding */ patchFetch),\n/* harmony export */   requestAsyncStorage: () => (/* binding */ requestAsyncStorage),\n/* harmony export */   routeModule: () => (/* binding */ routeModule),\n/* harmony export */   serverHooks: () => (/* binding */ serverHooks),\n/* harmony export */   staticGenerationAsyncStorage: () => (/* binding */ staticGenerationAsyncStorage)\n/* harmony export */ });\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/dist/server/future/route-modules/app-route/module.compiled */ \"(rsc)/./node_modules/next/dist/server/future/route-modules/app-route/module.compiled.js\");\n/* harmony import */ var next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/dist/server/future/route-kind */ \"(rsc)/./node_modules/next/dist/server/future/route-kind.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/dist/server/lib/patch-fetch */ \"(rsc)/./node_modules/next/dist/server/lib/patch-fetch.js\");\n/* harmony import */ var next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var C_igorqv_git_QuizClaudeCodeProjeto_app_api_game_answer_route_ts__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app/api/game/answer/route.ts */ \"(rsc)/./app/api/game/answer/route.ts\");\n\n\n\n\n// We inject the nextConfigOutput here so that we can use them in the route\n// module.\nconst nextConfigOutput = \"\"\nconst routeModule = new next_dist_server_future_route_modules_app_route_module_compiled__WEBPACK_IMPORTED_MODULE_0__.AppRouteRouteModule({\n    definition: {\n        kind: next_dist_server_future_route_kind__WEBPACK_IMPORTED_MODULE_1__.RouteKind.APP_ROUTE,\n        page: \"/api/game/answer/route\",\n        pathname: \"/api/game/answer\",\n        filename: \"route\",\n        bundlePath: \"app/api/game/answer/route\"\n    },\n    resolvedPagePath: \"C:\\\\igorqv-git\\\\QuizClaudeCodeProjeto\\\\app\\\\api\\\\game\\\\answer\\\\route.ts\",\n    nextConfigOutput,\n    userland: C_igorqv_git_QuizClaudeCodeProjeto_app_api_game_answer_route_ts__WEBPACK_IMPORTED_MODULE_3__\n});\n// Pull out the exports that we need to expose from the module. This should\n// be eliminated when we've moved the other routes to the new format. These\n// are used to hook into the route.\nconst { requestAsyncStorage, staticGenerationAsyncStorage, serverHooks } = routeModule;\nconst originalPathname = \"/api/game/answer/route\";\nfunction patchFetch() {\n    return (0,next_dist_server_lib_patch_fetch__WEBPACK_IMPORTED_MODULE_2__.patchFetch)({\n        serverHooks,\n        staticGenerationAsyncStorage\n    });\n}\n\n\n//# sourceMappingURL=app-route.js.map//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9ub2RlX21vZHVsZXMvbmV4dC9kaXN0L2J1aWxkL3dlYnBhY2svbG9hZGVycy9uZXh0LWFwcC1sb2FkZXIuanM/bmFtZT1hcHAlMkZhcGklMkZnYW1lJTJGYW5zd2VyJTJGcm91dGUmcGFnZT0lMkZhcGklMkZnYW1lJTJGYW5zd2VyJTJGcm91dGUmYXBwUGF0aHM9JnBhZ2VQYXRoPXByaXZhdGUtbmV4dC1hcHAtZGlyJTJGYXBpJTJGZ2FtZSUyRmFuc3dlciUyRnJvdXRlLnRzJmFwcERpcj1DJTNBJTVDaWdvcnF2LWdpdCU1Q1F1aXpDbGF1ZGVDb2RlUHJvamV0byU1Q2FwcCZwYWdlRXh0ZW5zaW9ucz10c3gmcGFnZUV4dGVuc2lvbnM9dHMmcGFnZUV4dGVuc2lvbnM9anN4JnBhZ2VFeHRlbnNpb25zPWpzJnJvb3REaXI9QyUzQSU1Q2lnb3Jxdi1naXQlNUNRdWl6Q2xhdWRlQ29kZVByb2pldG8maXNEZXY9dHJ1ZSZ0c2NvbmZpZ1BhdGg9dHNjb25maWcuanNvbiZiYXNlUGF0aD0mYXNzZXRQcmVmaXg9Jm5leHRDb25maWdPdXRwdXQ9JnByZWZlcnJlZFJlZ2lvbj0mbWlkZGxld2FyZUNvbmZpZz1lMzAlM0QhIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFzRztBQUN2QztBQUNjO0FBQ3VCO0FBQ3BHO0FBQ0E7QUFDQTtBQUNBLHdCQUF3QixnSEFBbUI7QUFDM0M7QUFDQSxjQUFjLHlFQUFTO0FBQ3ZCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsS0FBSztBQUNMO0FBQ0E7QUFDQSxZQUFZO0FBQ1osQ0FBQztBQUNEO0FBQ0E7QUFDQTtBQUNBLFFBQVEsaUVBQWlFO0FBQ3pFO0FBQ0E7QUFDQSxXQUFXLDRFQUFXO0FBQ3RCO0FBQ0E7QUFDQSxLQUFLO0FBQ0w7QUFDdUg7O0FBRXZIIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcXVpei1icmFzaWwvP2VjZGUiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQXBwUm91dGVSb3V0ZU1vZHVsZSB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1tb2R1bGVzL2FwcC1yb3V0ZS9tb2R1bGUuY29tcGlsZWRcIjtcbmltcG9ydCB7IFJvdXRlS2luZCB9IGZyb20gXCJuZXh0L2Rpc3Qvc2VydmVyL2Z1dHVyZS9yb3V0ZS1raW5kXCI7XG5pbXBvcnQgeyBwYXRjaEZldGNoIGFzIF9wYXRjaEZldGNoIH0gZnJvbSBcIm5leHQvZGlzdC9zZXJ2ZXIvbGliL3BhdGNoLWZldGNoXCI7XG5pbXBvcnQgKiBhcyB1c2VybGFuZCBmcm9tIFwiQzpcXFxcaWdvcnF2LWdpdFxcXFxRdWl6Q2xhdWRlQ29kZVByb2pldG9cXFxcYXBwXFxcXGFwaVxcXFxnYW1lXFxcXGFuc3dlclxcXFxyb3V0ZS50c1wiO1xuLy8gV2UgaW5qZWN0IHRoZSBuZXh0Q29uZmlnT3V0cHV0IGhlcmUgc28gdGhhdCB3ZSBjYW4gdXNlIHRoZW0gaW4gdGhlIHJvdXRlXG4vLyBtb2R1bGUuXG5jb25zdCBuZXh0Q29uZmlnT3V0cHV0ID0gXCJcIlxuY29uc3Qgcm91dGVNb2R1bGUgPSBuZXcgQXBwUm91dGVSb3V0ZU1vZHVsZSh7XG4gICAgZGVmaW5pdGlvbjoge1xuICAgICAgICBraW5kOiBSb3V0ZUtpbmQuQVBQX1JPVVRFLFxuICAgICAgICBwYWdlOiBcIi9hcGkvZ2FtZS9hbnN3ZXIvcm91dGVcIixcbiAgICAgICAgcGF0aG5hbWU6IFwiL2FwaS9nYW1lL2Fuc3dlclwiLFxuICAgICAgICBmaWxlbmFtZTogXCJyb3V0ZVwiLFxuICAgICAgICBidW5kbGVQYXRoOiBcImFwcC9hcGkvZ2FtZS9hbnN3ZXIvcm91dGVcIlxuICAgIH0sXG4gICAgcmVzb2x2ZWRQYWdlUGF0aDogXCJDOlxcXFxpZ29ycXYtZ2l0XFxcXFF1aXpDbGF1ZGVDb2RlUHJvamV0b1xcXFxhcHBcXFxcYXBpXFxcXGdhbWVcXFxcYW5zd2VyXFxcXHJvdXRlLnRzXCIsXG4gICAgbmV4dENvbmZpZ091dHB1dCxcbiAgICB1c2VybGFuZFxufSk7XG4vLyBQdWxsIG91dCB0aGUgZXhwb3J0cyB0aGF0IHdlIG5lZWQgdG8gZXhwb3NlIGZyb20gdGhlIG1vZHVsZS4gVGhpcyBzaG91bGRcbi8vIGJlIGVsaW1pbmF0ZWQgd2hlbiB3ZSd2ZSBtb3ZlZCB0aGUgb3RoZXIgcm91dGVzIHRvIHRoZSBuZXcgZm9ybWF0LiBUaGVzZVxuLy8gYXJlIHVzZWQgdG8gaG9vayBpbnRvIHRoZSByb3V0ZS5cbmNvbnN0IHsgcmVxdWVzdEFzeW5jU3RvcmFnZSwgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZSwgc2VydmVySG9va3MgfSA9IHJvdXRlTW9kdWxlO1xuY29uc3Qgb3JpZ2luYWxQYXRobmFtZSA9IFwiL2FwaS9nYW1lL2Fuc3dlci9yb3V0ZVwiO1xuZnVuY3Rpb24gcGF0Y2hGZXRjaCgpIHtcbiAgICByZXR1cm4gX3BhdGNoRmV0Y2goe1xuICAgICAgICBzZXJ2ZXJIb29rcyxcbiAgICAgICAgc3RhdGljR2VuZXJhdGlvbkFzeW5jU3RvcmFnZVxuICAgIH0pO1xufVxuZXhwb3J0IHsgcm91dGVNb2R1bGUsIHJlcXVlc3RBc3luY1N0b3JhZ2UsIHN0YXRpY0dlbmVyYXRpb25Bc3luY1N0b3JhZ2UsIHNlcnZlckhvb2tzLCBvcmlnaW5hbFBhdGhuYW1lLCBwYXRjaEZldGNoLCAgfTtcblxuLy8jIHNvdXJjZU1hcHBpbmdVUkw9YXBwLXJvdXRlLmpzLm1hcCJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fgame%2Fanswer%2Froute&page=%2Fapi%2Fgame%2Fanswer%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgame%2Fanswer%2Froute.ts&appDir=C%3A%5Cigorqv-git%5CQuizClaudeCodeProjeto%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cigorqv-git%5CQuizClaudeCodeProjeto&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!\n");

/***/ }),

/***/ "(rsc)/./app/api/game/answer/route.ts":
/*!**************************************!*\
  !*** ./app/api/game/answer/route.ts ***!
  \**************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   POST: () => (/* binding */ POST)\n/* harmony export */ });\n/* harmony import */ var next_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next/server */ \"(rsc)/./node_modules/next/dist/api/server.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth */ \"(rsc)/./node_modules/next-auth/index.js\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v3/ZodError.js\");\n/* harmony import */ var _lib_auth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @/lib/auth */ \"(rsc)/./lib/auth.ts\");\n/* harmony import */ var _lib_prisma__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @/lib/prisma */ \"(rsc)/./lib/prisma.ts\");\n/* harmony import */ var _lib_scoring__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @/lib/scoring */ \"(rsc)/./lib/scoring.ts\");\n/* harmony import */ var _lib_validators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @/lib/validators */ \"(rsc)/./lib/validators.ts\");\n\n\n\n\n\n\n\nasync function POST(request) {\n    const session = await (0,next_auth__WEBPACK_IMPORTED_MODULE_1__.getServerSession)(_lib_auth__WEBPACK_IMPORTED_MODULE_2__.authOptions);\n    if (!session?.user?.id) {\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"N\\xe3o autenticado\"\n        }, {\n            status: 401\n        });\n    }\n    try {\n        const body = await request.json();\n        const { sessionId, questionId, chosenAnswer } = _lib_validators__WEBPACK_IMPORTED_MODULE_5__.answerSchema.parse(body);\n        const gameSession = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.gameSession.findUnique({\n            where: {\n                id: sessionId\n            },\n            include: {\n                answers: {\n                    select: {\n                        questionId: true,\n                        answeredAt: true\n                    },\n                    orderBy: {\n                        answeredAt: \"desc\"\n                    }\n                }\n            }\n        });\n        if (!gameSession || gameSession.userId !== session.user.id) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Sess\\xe3o inv\\xe1lida\"\n            }, {\n                status: 404\n            });\n        }\n        if (gameSession.status !== \"in_progress\") {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Sess\\xe3o j\\xe1 finalizada\"\n            }, {\n                status: 400\n            });\n        }\n        if (gameSession.answers.some((a)=>a.questionId === questionId)) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Pergunta j\\xe1 respondida\"\n            }, {\n                status: 400\n            });\n        }\n        const question = await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.question.findUnique({\n            where: {\n                id: questionId\n            }\n        });\n        if (!question) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Pergunta n\\xe3o encontrada\"\n            }, {\n                status: 404\n            });\n        }\n        // Calculate time server-side: elapsed since last answer (or session start for first question)\n        const lastAnswer = gameSession.answers[0];\n        const questionStartTime = lastAnswer?.answeredAt ?? gameSession.startedAt;\n        const serverTimeSpentMs = Math.min(Date.now() - questionStartTime.getTime(), 65000);\n        const isCorrect = chosenAnswer === question.correctAnswer;\n        const pointsEarned = (0,_lib_scoring__WEBPACK_IMPORTED_MODULE_4__.calculatePoints)(question.difficulty, isCorrect, serverTimeSpentMs);\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.sessionAnswer.create({\n            data: {\n                sessionId,\n                questionId,\n                chosenAnswer,\n                isCorrect,\n                timeSpentMs: serverTimeSpentMs,\n                pointsEarned\n            }\n        });\n        await _lib_prisma__WEBPACK_IMPORTED_MODULE_3__.prisma.gameSession.update({\n            where: {\n                id: sessionId\n            },\n            data: {\n                score: {\n                    increment: pointsEarned\n                },\n                correctCount: {\n                    increment: isCorrect ? 1 : 0\n                }\n            }\n        });\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            isCorrect,\n            correctAnswer: question.correctAnswer,\n            explanation: question.explanation,\n            pointsEarned\n        });\n    } catch (error) {\n        if (error instanceof zod__WEBPACK_IMPORTED_MODULE_6__.ZodError) {\n            return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n                error: \"Dados inv\\xe1lidos\"\n            }, {\n                status: 400\n            });\n        }\n        return next_server__WEBPACK_IMPORTED_MODULE_0__.NextResponse.json({\n            error: \"Erro ao processar resposta\"\n        }, {\n            status: 500\n        });\n    }\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QU96QyxxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO1lBQ3ZCNkI7WUFDQUMsZUFBZVgsU0FBU1csYUFBYTtZQUNyQ1csYUFBYXRCLFNBQVNzQixXQUFXO1lBQ2pDVjtRQUNGO0lBQ0YsRUFBRSxPQUFPOUIsT0FBTztRQUNkLElBQUlBLGlCQUFpQlgseUNBQVFBLEVBQUU7WUFDN0IsT0FBT0YscURBQVlBLENBQUNZLElBQUksQ0FBQztnQkFBRUMsT0FBTztZQUFrQixHQUFHO2dCQUFFQyxRQUFRO1lBQUk7UUFDdkU7UUFDQSxPQUFPZCxxREFBWUEsQ0FBQ1ksSUFBSSxDQUFDO1lBQUVDLE9BQU87UUFBNkIsR0FBRztZQUFFQyxRQUFRO1FBQUk7SUFDbEY7QUFDRiIsInNvdXJjZXMiOlsid2VicGFjazovL3F1aXotYnJhc2lsLy4vYXBwL2FwaS9nYW1lL2Fuc3dlci9yb3V0ZS50cz84MjQ2Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5leHRSZXNwb25zZSB9IGZyb20gXCJuZXh0L3NlcnZlclwiXG5pbXBvcnQgdHlwZSB7IE5leHRSZXF1ZXN0IH0gZnJvbSBcIm5leHQvc2VydmVyXCJcbmltcG9ydCB7IGdldFNlcnZlclNlc3Npb24gfSBmcm9tIFwibmV4dC1hdXRoXCJcbmltcG9ydCB7IFpvZEVycm9yIH0gZnJvbSBcInpvZFwiXG5pbXBvcnQgeyBhdXRoT3B0aW9ucyB9IGZyb20gXCJAL2xpYi9hdXRoXCJcbmltcG9ydCB7IHByaXNtYSB9IGZyb20gXCJAL2xpYi9wcmlzbWFcIlxuaW1wb3J0IHsgY2FsY3VsYXRlUG9pbnRzIH0gZnJvbSBcIkAvbGliL3Njb3JpbmdcIlxuaW1wb3J0IHsgYW5zd2VyU2NoZW1hIH0gZnJvbSBcIkAvbGliL3ZhbGlkYXRvcnNcIlxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gUE9TVChyZXF1ZXN0OiBOZXh0UmVxdWVzdCkge1xuICBjb25zdCBzZXNzaW9uID0gYXdhaXQgZ2V0U2VydmVyU2Vzc2lvbihhdXRoT3B0aW9ucylcbiAgaWYgKCFzZXNzaW9uPy51c2VyPy5pZCkge1xuICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIk7Do28gYXV0ZW50aWNhZG9cIiB9LCB7IHN0YXR1czogNDAxIH0pXG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGJvZHkgPSBhd2FpdCByZXF1ZXN0Lmpzb24oKVxuICAgIGNvbnN0IHsgc2Vzc2lvbklkLCBxdWVzdGlvbklkLCBjaG9zZW5BbnN3ZXIgfSA9IGFuc3dlclNjaGVtYS5wYXJzZShib2R5KVxuXG4gICAgY29uc3QgZ2FtZVNlc3Npb24gPSBhd2FpdCBwcmlzbWEuZ2FtZVNlc3Npb24uZmluZFVuaXF1ZSh7XG4gICAgICB3aGVyZTogeyBpZDogc2Vzc2lvbklkIH0sXG4gICAgICBpbmNsdWRlOiB7XG4gICAgICAgIGFuc3dlcnM6IHtcbiAgICAgICAgICBzZWxlY3Q6IHsgcXVlc3Rpb25JZDogdHJ1ZSwgYW5zd2VyZWRBdDogdHJ1ZSB9LFxuICAgICAgICAgIG9yZGVyQnk6IHsgYW5zd2VyZWRBdDogXCJkZXNjXCIgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIGlmICghZ2FtZVNlc3Npb24gfHwgZ2FtZVNlc3Npb24udXNlcklkICE9PSBzZXNzaW9uLnVzZXIuaWQpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlNlc3PDo28gaW52w6FsaWRhXCIgfSwgeyBzdGF0dXM6IDQwNCB9KVxuICAgIH1cbiAgICBpZiAoZ2FtZVNlc3Npb24uc3RhdHVzICE9PSBcImluX3Byb2dyZXNzXCIpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlNlc3PDo28gasOhIGZpbmFsaXphZGFcIiB9LCB7IHN0YXR1czogNDAwIH0pXG4gICAgfVxuICAgIGlmIChnYW1lU2Vzc2lvbi5hbnN3ZXJzLnNvbWUoKGEpID0+IGEucXVlc3Rpb25JZCA9PT0gcXVlc3Rpb25JZCkpIHtcbiAgICAgIHJldHVybiBOZXh0UmVzcG9uc2UuanNvbih7IGVycm9yOiBcIlBlcmd1bnRhIGrDoSByZXNwb25kaWRhXCIgfSwgeyBzdGF0dXM6IDQwMCB9KVxuICAgIH1cblxuICAgIGNvbnN0IHF1ZXN0aW9uID0gYXdhaXQgcHJpc21hLnF1ZXN0aW9uLmZpbmRVbmlxdWUoeyB3aGVyZTogeyBpZDogcXVlc3Rpb25JZCB9IH0pXG4gICAgaWYgKCFxdWVzdGlvbikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiUGVyZ3VudGEgbsOjbyBlbmNvbnRyYWRhXCIgfSwgeyBzdGF0dXM6IDQwNCB9KVxuICAgIH1cblxuICAgIC8vIENhbGN1bGF0ZSB0aW1lIHNlcnZlci1zaWRlOiBlbGFwc2VkIHNpbmNlIGxhc3QgYW5zd2VyIChvciBzZXNzaW9uIHN0YXJ0IGZvciBmaXJzdCBxdWVzdGlvbilcbiAgICBjb25zdCBsYXN0QW5zd2VyID0gZ2FtZVNlc3Npb24uYW5zd2Vyc1swXVxuICAgIGNvbnN0IHF1ZXN0aW9uU3RhcnRUaW1lID0gbGFzdEFuc3dlcj8uYW5zd2VyZWRBdCA/PyBnYW1lU2Vzc2lvbi5zdGFydGVkQXRcbiAgICBjb25zdCBzZXJ2ZXJUaW1lU3BlbnRNcyA9IE1hdGgubWluKERhdGUubm93KCkgLSBxdWVzdGlvblN0YXJ0VGltZS5nZXRUaW1lKCksIDY1MDAwKVxuXG4gICAgY29uc3QgaXNDb3JyZWN0ID0gY2hvc2VuQW5zd2VyID09PSBxdWVzdGlvbi5jb3JyZWN0QW5zd2VyXG4gICAgY29uc3QgcG9pbnRzRWFybmVkID0gY2FsY3VsYXRlUG9pbnRzKHF1ZXN0aW9uLmRpZmZpY3VsdHksIGlzQ29ycmVjdCwgc2VydmVyVGltZVNwZW50TXMpXG5cbiAgICBhd2FpdCBwcmlzbWEuc2Vzc2lvbkFuc3dlci5jcmVhdGUoe1xuICAgICAgZGF0YToge1xuICAgICAgICBzZXNzaW9uSWQsXG4gICAgICAgIHF1ZXN0aW9uSWQsXG4gICAgICAgIGNob3NlbkFuc3dlcixcbiAgICAgICAgaXNDb3JyZWN0LFxuICAgICAgICB0aW1lU3BlbnRNczogc2VydmVyVGltZVNwZW50TXMsXG4gICAgICAgIHBvaW50c0Vhcm5lZCxcbiAgICAgIH0sXG4gICAgfSlcblxuICAgIGF3YWl0IHByaXNtYS5nYW1lU2Vzc2lvbi51cGRhdGUoe1xuICAgICAgd2hlcmU6IHsgaWQ6IHNlc3Npb25JZCB9LFxuICAgICAgZGF0YToge1xuICAgICAgICBzY29yZTogeyBpbmNyZW1lbnQ6IHBvaW50c0Vhcm5lZCB9LFxuICAgICAgICBjb3JyZWN0Q291bnQ6IHsgaW5jcmVtZW50OiBpc0NvcnJlY3QgPyAxIDogMCB9LFxuICAgICAgfSxcbiAgICB9KVxuXG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHtcbiAgICAgIGlzQ29ycmVjdCxcbiAgICAgIGNvcnJlY3RBbnN3ZXI6IHF1ZXN0aW9uLmNvcnJlY3RBbnN3ZXIsXG4gICAgICBleHBsYW5hdGlvbjogcXVlc3Rpb24uZXhwbGFuYXRpb24sXG4gICAgICBwb2ludHNFYXJuZWQsXG4gICAgfSlcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBab2RFcnJvcikge1xuICAgICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRGFkb3MgaW52w6FsaWRvc1wiIH0sIHsgc3RhdHVzOiA0MDAgfSlcbiAgICB9XG4gICAgcmV0dXJuIE5leHRSZXNwb25zZS5qc29uKHsgZXJyb3I6IFwiRXJybyBhbyBwcm9jZXNzYXIgcmVzcG9zdGFcIiB9LCB7IHN0YXR1czogNTAwIH0pXG4gIH1cbn1cbiJdLCJuYW1lcyI6WyJOZXh0UmVzcG9uc2UiLCJnZXRTZXJ2ZXJTZXNzaW9uIiwiWm9kRXJyb3IiLCJhdXRoT3B0aW9ucyIsInByaXNtYSIsImNhbGN1bGF0ZVBvaW50cyIsImFuc3dlclNjaGVtYSIsIlBPU1QiLCJyZXF1ZXN0Iiwic2Vzc2lvbiIsInVzZXIiLCJpZCIsImpzb24iLCJlcnJvciIsInN0YXR1cyIsImJvZHkiLCJzZXNzaW9uSWQiLCJxdWVzdGlvbklkIiwiY2hvc2VuQW5zd2VyIiwicGFyc2UiLCJnYW1lU2Vzc2lvbiIsImZpbmRVbmlxdWUiLCJ3aGVyZSIsImluY2x1ZGUiLCJhbnN3ZXJzIiwic2VsZWN0IiwiYW5zd2VyZWRBdCIsIm9yZGVyQnkiLCJ1c2VySWQiLCJzb21lIiwiYSIsInF1ZXN0aW9uIiwibGFzdEFuc3dlciIsInF1ZXN0aW9uU3RhcnRUaW1lIiwic3RhcnRlZEF0Iiwic2VydmVyVGltZVNwZW50TXMiLCJNYXRoIiwibWluIiwiRGF0ZSIsIm5vdyIsImdldFRpbWUiLCJpc0NvcnJlY3QiLCJjb3JyZWN0QW5zd2VyIiwicG9pbnRzRWFybmVkIiwiZGlmZmljdWx0eSIsInNlc3Npb25BbnN3ZXIiLCJjcmVhdGUiLCJkYXRhIiwidGltZVNwZW50TXMiLCJ1cGRhdGUiLCJzY29yZSIsImluY3JlbWVudCIsImNvcnJlY3RDb3VudCIsImV4cGxhbmF0aW9uIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(rsc)/./app/api/game/answer/route.ts\n");

/***/ }),

/***/ "(rsc)/./lib/auth.ts":
/*!*********************!*\
  !*** ./lib/auth.ts ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   authOptions: () => (/* binding */ authOptions)\n/* harmony export */ });\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth/providers/credentials */ \"(rsc)/./node_modules/next-auth/providers/credentials.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! bcryptjs */ \"(rsc)/./node_modules/bcryptjs/index.js\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _prisma__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./prisma */ \"(rsc)/./lib/prisma.ts\");\n\n\n\nconst authOptions = {\n    providers: [\n        (0,next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_0__[\"default\"])({\n            name: \"credentials\",\n            credentials: {\n                email: {\n                    label: \"Email\",\n                    type: \"email\"\n                },\n                password: {\n                    label: \"Senha\",\n                    type: \"password\"\n                }\n            },\n            async authorize (credentials) {\n                if (!credentials?.email || !credentials?.password) return null;\n                const user = await _prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n                    where: {\n                        email: credentials.email\n                    }\n                });\n                if (!user) return null;\n                const isValid = await bcryptjs__WEBPACK_IMPORTED_MODULE_1___default().compare(credentials.password, user.passwordHash);\n                if (!isValid) return null;\n                return {\n                    id: user.id,\n                    email: user.email,\n                    name: user.name,\n                    level: user.level,\n                    totalScore: user.totalScore\n                };\n            }\n        })\n    ],\n    callbacks: {\n        async jwt ({ token, user }) {\n            if (user) {\n                token.id = user.id;\n                token.level = user.level;\n                token.totalScore = user.totalScore;\n            }\n            return token;\n        },\n        async session ({ session, token }) {\n            if (token?.id && session.user) {\n                // Fetch fresh data so session reflects post-game level/score updates\n                const fresh = await _prisma__WEBPACK_IMPORTED_MODULE_2__.prisma.user.findUnique({\n                    where: {\n                        id: token.id\n                    },\n                    select: {\n                        level: true,\n                        totalScore: true\n                    }\n                });\n                session.user.id = token.id;\n                session.user.level = fresh?.level ?? token.level;\n                session.user.totalScore = fresh?.totalScore ?? token.totalScore;\n            }\n            return session;\n        }\n    },\n    pages: {\n        signIn: \"/login\"\n    },\n    session: {\n        strategy: \"jwt\",\n        maxAge: 24 * 60 * 60\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvYXV0aC50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUNpRTtBQUNwQztBQUNJO0FBRTFCLE1BQU1HLGNBQStCO0lBQzFDQyxXQUFXO1FBQ1RKLDJFQUFtQkEsQ0FBQztZQUNsQkssTUFBTTtZQUNOQyxhQUFhO2dCQUNYQyxPQUFPO29CQUFFQyxPQUFPO29CQUFTQyxNQUFNO2dCQUFRO2dCQUN2Q0MsVUFBVTtvQkFBRUYsT0FBTztvQkFBU0MsTUFBTTtnQkFBVztZQUMvQztZQUNBLE1BQU1FLFdBQVVMLFdBQVc7Z0JBQ3pCLElBQUksQ0FBQ0EsYUFBYUMsU0FBUyxDQUFDRCxhQUFhSSxVQUFVLE9BQU87Z0JBRTFELE1BQU1FLE9BQU8sTUFBTVYsMkNBQU1BLENBQUNVLElBQUksQ0FBQ0MsVUFBVSxDQUFDO29CQUN4Q0MsT0FBTzt3QkFBRVAsT0FBT0QsWUFBWUMsS0FBSztvQkFBQztnQkFDcEM7Z0JBQ0EsSUFBSSxDQUFDSyxNQUFNLE9BQU87Z0JBRWxCLE1BQU1HLFVBQVUsTUFBTWQsdURBQWMsQ0FBQ0ssWUFBWUksUUFBUSxFQUFFRSxLQUFLSyxZQUFZO2dCQUM1RSxJQUFJLENBQUNGLFNBQVMsT0FBTztnQkFFckIsT0FBTztvQkFDTEcsSUFBSU4sS0FBS00sRUFBRTtvQkFDWFgsT0FBT0ssS0FBS0wsS0FBSztvQkFDakJGLE1BQU1PLEtBQUtQLElBQUk7b0JBQ2ZjLE9BQU9QLEtBQUtPLEtBQUs7b0JBQ2pCQyxZQUFZUixLQUFLUSxVQUFVO2dCQUM3QjtZQUNGO1FBQ0Y7S0FDRDtJQUNEQyxXQUFXO1FBQ1QsTUFBTUMsS0FBSSxFQUFFQyxLQUFLLEVBQUVYLElBQUksRUFBRTtZQUN2QixJQUFJQSxNQUFNO2dCQUNSVyxNQUFNTCxFQUFFLEdBQUdOLEtBQUtNLEVBQUU7Z0JBQ2xCSyxNQUFNSixLQUFLLEdBQUdQLEtBQUtPLEtBQUs7Z0JBQ3hCSSxNQUFNSCxVQUFVLEdBQUdSLEtBQUtRLFVBQVU7WUFDcEM7WUFDQSxPQUFPRztRQUNUO1FBQ0EsTUFBTUMsU0FBUSxFQUFFQSxPQUFPLEVBQUVELEtBQUssRUFBRTtZQUM5QixJQUFJQSxPQUFPTCxNQUFNTSxRQUFRWixJQUFJLEVBQUU7Z0JBQzdCLHFFQUFxRTtnQkFDckUsTUFBTWEsUUFBUSxNQUFNdkIsMkNBQU1BLENBQUNVLElBQUksQ0FBQ0MsVUFBVSxDQUFDO29CQUN6Q0MsT0FBTzt3QkFBRUksSUFBSUssTUFBTUwsRUFBRTtvQkFBVztvQkFDaENRLFFBQVE7d0JBQUVQLE9BQU87d0JBQU1DLFlBQVk7b0JBQUs7Z0JBQzFDO2dCQUNBSSxRQUFRWixJQUFJLENBQUNNLEVBQUUsR0FBR0ssTUFBTUwsRUFBRTtnQkFDMUJNLFFBQVFaLElBQUksQ0FBQ08sS0FBSyxHQUFHTSxPQUFPTixTQUFVSSxNQUFNSixLQUFLO2dCQUNqREssUUFBUVosSUFBSSxDQUFDUSxVQUFVLEdBQUdLLE9BQU9MLGNBQWVHLE1BQU1ILFVBQVU7WUFDbEU7WUFDQSxPQUFPSTtRQUNUO0lBQ0Y7SUFDQUcsT0FBTztRQUNMQyxRQUFRO0lBQ1Y7SUFDQUosU0FBUztRQUNQSyxVQUFVO1FBQ1ZDLFFBQVEsS0FBSyxLQUFLO0lBQ3BCO0lBQ0FDLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZTtBQUNyQyxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vcXVpei1icmFzaWwvLi9saWIvYXV0aC50cz9iZjdlIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB0eXBlIHsgTmV4dEF1dGhPcHRpb25zIH0gZnJvbSBcIm5leHQtYXV0aFwiXG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tIFwibmV4dC1hdXRoL3Byb3ZpZGVycy9jcmVkZW50aWFsc1wiXG5pbXBvcnQgYmNyeXB0IGZyb20gXCJiY3J5cHRqc1wiXG5pbXBvcnQgeyBwcmlzbWEgfSBmcm9tIFwiLi9wcmlzbWFcIlxuXG5leHBvcnQgY29uc3QgYXV0aE9wdGlvbnM6IE5leHRBdXRoT3B0aW9ucyA9IHtcbiAgcHJvdmlkZXJzOiBbXG4gICAgQ3JlZGVudGlhbHNQcm92aWRlcih7XG4gICAgICBuYW1lOiBcImNyZWRlbnRpYWxzXCIsXG4gICAgICBjcmVkZW50aWFsczoge1xuICAgICAgICBlbWFpbDogeyBsYWJlbDogXCJFbWFpbFwiLCB0eXBlOiBcImVtYWlsXCIgfSxcbiAgICAgICAgcGFzc3dvcmQ6IHsgbGFiZWw6IFwiU2VuaGFcIiwgdHlwZTogXCJwYXNzd29yZFwiIH0sXG4gICAgICB9LFxuICAgICAgYXN5bmMgYXV0aG9yaXplKGNyZWRlbnRpYWxzKSB7XG4gICAgICAgIGlmICghY3JlZGVudGlhbHM/LmVtYWlsIHx8ICFjcmVkZW50aWFscz8ucGFzc3dvcmQpIHJldHVybiBudWxsXG5cbiAgICAgICAgY29uc3QgdXNlciA9IGF3YWl0IHByaXNtYS51c2VyLmZpbmRVbmlxdWUoe1xuICAgICAgICAgIHdoZXJlOiB7IGVtYWlsOiBjcmVkZW50aWFscy5lbWFpbCB9LFxuICAgICAgICB9KVxuICAgICAgICBpZiAoIXVzZXIpIHJldHVybiBudWxsXG5cbiAgICAgICAgY29uc3QgaXNWYWxpZCA9IGF3YWl0IGJjcnlwdC5jb21wYXJlKGNyZWRlbnRpYWxzLnBhc3N3b3JkLCB1c2VyLnBhc3N3b3JkSGFzaClcbiAgICAgICAgaWYgKCFpc1ZhbGlkKSByZXR1cm4gbnVsbFxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgaWQ6IHVzZXIuaWQsXG4gICAgICAgICAgZW1haWw6IHVzZXIuZW1haWwsXG4gICAgICAgICAgbmFtZTogdXNlci5uYW1lLFxuICAgICAgICAgIGxldmVsOiB1c2VyLmxldmVsLFxuICAgICAgICAgIHRvdGFsU2NvcmU6IHVzZXIudG90YWxTY29yZSxcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KSxcbiAgXSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgaWYgKHVzZXIpIHtcbiAgICAgICAgdG9rZW4uaWQgPSB1c2VyLmlkXG4gICAgICAgIHRva2VuLmxldmVsID0gdXNlci5sZXZlbFxuICAgICAgICB0b2tlbi50b3RhbFNjb3JlID0gdXNlci50b3RhbFNjb3JlXG4gICAgICB9XG4gICAgICByZXR1cm4gdG9rZW5cbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiB9KSB7XG4gICAgICBpZiAodG9rZW4/LmlkICYmIHNlc3Npb24udXNlcikge1xuICAgICAgICAvLyBGZXRjaCBmcmVzaCBkYXRhIHNvIHNlc3Npb24gcmVmbGVjdHMgcG9zdC1nYW1lIGxldmVsL3Njb3JlIHVwZGF0ZXNcbiAgICAgICAgY29uc3QgZnJlc2ggPSBhd2FpdCBwcmlzbWEudXNlci5maW5kVW5pcXVlKHtcbiAgICAgICAgICB3aGVyZTogeyBpZDogdG9rZW4uaWQgYXMgc3RyaW5nIH0sXG4gICAgICAgICAgc2VsZWN0OiB7IGxldmVsOiB0cnVlLCB0b3RhbFNjb3JlOiB0cnVlIH0sXG4gICAgICAgIH0pXG4gICAgICAgIHNlc3Npb24udXNlci5pZCA9IHRva2VuLmlkIGFzIHN0cmluZ1xuICAgICAgICBzZXNzaW9uLnVzZXIubGV2ZWwgPSBmcmVzaD8ubGV2ZWwgPz8gKHRva2VuLmxldmVsIGFzIG51bWJlcilcbiAgICAgICAgc2Vzc2lvbi51c2VyLnRvdGFsU2NvcmUgPSBmcmVzaD8udG90YWxTY29yZSA/PyAodG9rZW4udG90YWxTY29yZSBhcyBudW1iZXIpXG4gICAgICB9XG4gICAgICByZXR1cm4gc2Vzc2lvblxuICAgIH0sXG4gIH0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiBcIi9sb2dpblwiLFxuICB9LFxuICBzZXNzaW9uOiB7XG4gICAgc3RyYXRlZ3k6IFwiand0XCIsXG4gICAgbWF4QWdlOiAyNCAqIDYwICogNjAsXG4gIH0sXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVULFxufVxuIl0sIm5hbWVzIjpbIkNyZWRlbnRpYWxzUHJvdmlkZXIiLCJiY3J5cHQiLCJwcmlzbWEiLCJhdXRoT3B0aW9ucyIsInByb3ZpZGVycyIsIm5hbWUiLCJjcmVkZW50aWFscyIsImVtYWlsIiwibGFiZWwiLCJ0eXBlIiwicGFzc3dvcmQiLCJhdXRob3JpemUiLCJ1c2VyIiwiZmluZFVuaXF1ZSIsIndoZXJlIiwiaXNWYWxpZCIsImNvbXBhcmUiLCJwYXNzd29yZEhhc2giLCJpZCIsImxldmVsIiwidG90YWxTY29yZSIsImNhbGxiYWNrcyIsImp3dCIsInRva2VuIiwic2Vzc2lvbiIsImZyZXNoIiwic2VsZWN0IiwicGFnZXMiLCJzaWduSW4iLCJzdHJhdGVneSIsIm1heEFnZSIsInNlY3JldCIsInByb2Nlc3MiLCJlbnYiLCJORVhUQVVUSF9TRUNSRVQiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(rsc)/./lib/auth.ts\n");

/***/ }),

/***/ "(rsc)/./lib/prisma.ts":
/*!***********************!*\
  !*** ./lib/prisma.ts ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   prisma: () => (/* binding */ prisma)\n/* harmony export */ });\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @prisma/client */ \"@prisma/client\");\n/* harmony import */ var _prisma_client__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_prisma_client__WEBPACK_IMPORTED_MODULE_0__);\n\nconst globalForPrisma = globalThis;\nconst prisma = globalForPrisma.prisma ?? new _prisma_client__WEBPACK_IMPORTED_MODULE_0__.PrismaClient();\nif (true) globalForPrisma.prisma = prisma;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvcHJpc21hLnRzIiwibWFwcGluZ3MiOiI7Ozs7OztBQUE2QztBQUU3QyxNQUFNQyxrQkFBa0JDO0FBRWpCLE1BQU1DLFNBQVNGLGdCQUFnQkUsTUFBTSxJQUFJLElBQUlILHdEQUFZQSxHQUFFO0FBRWxFLElBQUlJLElBQXFDLEVBQUVILGdCQUFnQkUsTUFBTSxHQUFHQSIsInNvdXJjZXMiOlsid2VicGFjazovL3F1aXotYnJhc2lsLy4vbGliL3ByaXNtYS50cz85ODIyIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFByaXNtYUNsaWVudCB9IGZyb20gXCJAcHJpc21hL2NsaWVudFwiXG5cbmNvbnN0IGdsb2JhbEZvclByaXNtYSA9IGdsb2JhbFRoaXMgYXMgdW5rbm93biBhcyB7IHByaXNtYTogUHJpc21hQ2xpZW50IH1cblxuZXhwb3J0IGNvbnN0IHByaXNtYSA9IGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPz8gbmV3IFByaXNtYUNsaWVudCgpXG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViAhPT0gXCJwcm9kdWN0aW9uXCIpIGdsb2JhbEZvclByaXNtYS5wcmlzbWEgPSBwcmlzbWFcbiJdLCJuYW1lcyI6WyJQcmlzbWFDbGllbnQiLCJnbG9iYWxGb3JQcmlzbWEiLCJnbG9iYWxUaGlzIiwicHJpc21hIiwicHJvY2VzcyJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/prisma.ts\n");

/***/ }),

/***/ "(rsc)/./lib/scoring.ts":
/*!************************!*\
  !*** ./lib/scoring.ts ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   calculatePoints: () => (/* binding */ calculatePoints)\n/* harmony export */ });\nconst BASE_POINTS = {\n    easy: 20,\n    medium: 40,\n    hard: 60\n};\n// Based on time SPENT (not remaining). Timer is 60s.\n// Spent ≤15s  = Remaining >45s → ×2.0\n// Spent 15-30s = Remaining 30-45s → ×1.5\n// Spent 30-45s = Remaining 15-30s → ×1.25\n// Spent >45s  = Remaining <15s  → ×1.0\nfunction getSpeedMultiplier(timeSpentMs) {\n    const seconds = timeSpentMs / 1000;\n    if (seconds <= 15) return 2.0;\n    if (seconds <= 30) return 1.5;\n    if (seconds <= 45) return 1.25;\n    return 1.0;\n}\nfunction calculatePoints(difficulty, isCorrect, timeSpentMs) {\n    if (!isCorrect) return 0;\n    const base = BASE_POINTS[difficulty] ?? 20;\n    return Math.round(base * getSpeedMultiplier(timeSpentMs));\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvc2NvcmluZy50cyIsIm1hcHBpbmdzIjoiOzs7O0FBQUEsTUFBTUEsY0FBc0M7SUFDMUNDLE1BQU07SUFDTkMsUUFBUTtJQUNSQyxNQUFNO0FBQ1I7QUFFQSxxREFBcUQ7QUFDckQsc0NBQXNDO0FBQ3RDLHlDQUF5QztBQUN6QywwQ0FBMEM7QUFDMUMsdUNBQXVDO0FBQ3ZDLFNBQVNDLG1CQUFtQkMsV0FBbUI7SUFDN0MsTUFBTUMsVUFBVUQsY0FBYztJQUM5QixJQUFJQyxXQUFXLElBQUksT0FBTztJQUMxQixJQUFJQSxXQUFXLElBQUksT0FBTztJQUMxQixJQUFJQSxXQUFXLElBQUksT0FBTztJQUMxQixPQUFPO0FBQ1Q7QUFFTyxTQUFTQyxnQkFDZEMsVUFBa0IsRUFDbEJDLFNBQWtCLEVBQ2xCSixXQUFtQjtJQUVuQixJQUFJLENBQUNJLFdBQVcsT0FBTztJQUN2QixNQUFNQyxPQUFPVixXQUFXLENBQUNRLFdBQVcsSUFBSTtJQUN4QyxPQUFPRyxLQUFLQyxLQUFLLENBQUNGLE9BQU9OLG1CQUFtQkM7QUFDOUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdWl6LWJyYXNpbC8uL2xpYi9zY29yaW5nLnRzPzZmNjIiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgQkFTRV9QT0lOVFM6IFJlY29yZDxzdHJpbmcsIG51bWJlcj4gPSB7XG4gIGVhc3k6IDIwLFxuICBtZWRpdW06IDQwLFxuICBoYXJkOiA2MCxcbn1cblxuLy8gQmFzZWQgb24gdGltZSBTUEVOVCAobm90IHJlbWFpbmluZykuIFRpbWVyIGlzIDYwcy5cbi8vIFNwZW50IOKJpDE1cyAgPSBSZW1haW5pbmcgPjQ1cyDihpIgw5cyLjBcbi8vIFNwZW50IDE1LTMwcyA9IFJlbWFpbmluZyAzMC00NXMg4oaSIMOXMS41XG4vLyBTcGVudCAzMC00NXMgPSBSZW1haW5pbmcgMTUtMzBzIOKGkiDDlzEuMjVcbi8vIFNwZW50ID40NXMgID0gUmVtYWluaW5nIDwxNXMgIOKGkiDDlzEuMFxuZnVuY3Rpb24gZ2V0U3BlZWRNdWx0aXBsaWVyKHRpbWVTcGVudE1zOiBudW1iZXIpOiBudW1iZXIge1xuICBjb25zdCBzZWNvbmRzID0gdGltZVNwZW50TXMgLyAxMDAwXG4gIGlmIChzZWNvbmRzIDw9IDE1KSByZXR1cm4gMi4wXG4gIGlmIChzZWNvbmRzIDw9IDMwKSByZXR1cm4gMS41XG4gIGlmIChzZWNvbmRzIDw9IDQ1KSByZXR1cm4gMS4yNVxuICByZXR1cm4gMS4wXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVQb2ludHMoXG4gIGRpZmZpY3VsdHk6IHN0cmluZyxcbiAgaXNDb3JyZWN0OiBib29sZWFuLFxuICB0aW1lU3BlbnRNczogbnVtYmVyXG4pOiBudW1iZXIge1xuICBpZiAoIWlzQ29ycmVjdCkgcmV0dXJuIDBcbiAgY29uc3QgYmFzZSA9IEJBU0VfUE9JTlRTW2RpZmZpY3VsdHldID8/IDIwXG4gIHJldHVybiBNYXRoLnJvdW5kKGJhc2UgKiBnZXRTcGVlZE11bHRpcGxpZXIodGltZVNwZW50TXMpKVxufVxuIl0sIm5hbWVzIjpbIkJBU0VfUE9JTlRTIiwiZWFzeSIsIm1lZGl1bSIsImhhcmQiLCJnZXRTcGVlZE11bHRpcGxpZXIiLCJ0aW1lU3BlbnRNcyIsInNlY29uZHMiLCJjYWxjdWxhdGVQb2ludHMiLCJkaWZmaWN1bHR5IiwiaXNDb3JyZWN0IiwiYmFzZSIsIk1hdGgiLCJyb3VuZCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/scoring.ts\n");

/***/ }),

/***/ "(rsc)/./lib/validators.ts":
/*!***************************!*\
  !*** ./lib/validators.ts ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   answerSchema: () => (/* binding */ answerSchema),\n/* harmony export */   finishSchema: () => (/* binding */ finishSchema),\n/* harmony export */   registerSchema: () => (/* binding */ registerSchema)\n/* harmony export */ });\n/* harmony import */ var zod__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! zod */ \"(rsc)/./node_modules/zod/v3/types.js\");\n\nconst registerSchema = zod__WEBPACK_IMPORTED_MODULE_0__.object({\n    name: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(2, \"Nome deve ter pelo menos 2 caracteres\"),\n    email: zod__WEBPACK_IMPORTED_MODULE_0__.string().email(\"Email inv\\xe1lido\"),\n    password: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(8, \"Senha deve ter pelo menos 8 caracteres\")\n});\nconst answerSchema = zod__WEBPACK_IMPORTED_MODULE_0__.object({\n    sessionId: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(1),\n    questionId: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(1),\n    chosenAnswer: zod__WEBPACK_IMPORTED_MODULE_0__.string()\n});\nconst finishSchema = zod__WEBPACK_IMPORTED_MODULE_0__.object({\n    sessionId: zod__WEBPACK_IMPORTED_MODULE_0__.string().min(1)\n});\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHJzYykvLi9saWIvdmFsaWRhdG9ycy50cyIsIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQXVCO0FBRWhCLE1BQU1DLGlCQUFpQkQsdUNBQVEsQ0FBQztJQUNyQ0csTUFBTUgsdUNBQVEsR0FBR0ssR0FBRyxDQUFDLEdBQUc7SUFDeEJDLE9BQU9OLHVDQUFRLEdBQUdNLEtBQUssQ0FBQztJQUN4QkMsVUFBVVAsdUNBQVEsR0FBR0ssR0FBRyxDQUFDLEdBQUc7QUFDOUIsR0FBRTtBQUVLLE1BQU1HLGVBQWVSLHVDQUFRLENBQUM7SUFDbkNTLFdBQVdULHVDQUFRLEdBQUdLLEdBQUcsQ0FBQztJQUMxQkssWUFBWVYsdUNBQVEsR0FBR0ssR0FBRyxDQUFDO0lBQzNCTSxjQUFjWCx1Q0FBUTtBQUN4QixHQUFFO0FBRUssTUFBTVksZUFBZVosdUNBQVEsQ0FBQztJQUNuQ1MsV0FBV1QsdUNBQVEsR0FBR0ssR0FBRyxDQUFDO0FBQzVCLEdBQUUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9xdWl6LWJyYXNpbC8uL2xpYi92YWxpZGF0b3JzLnRzPzU2YjAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgeiB9IGZyb20gXCJ6b2RcIlxuXG5leHBvcnQgY29uc3QgcmVnaXN0ZXJTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIG5hbWU6IHouc3RyaW5nKCkubWluKDIsIFwiTm9tZSBkZXZlIHRlciBwZWxvIG1lbm9zIDIgY2FyYWN0ZXJlc1wiKSxcbiAgZW1haWw6IHouc3RyaW5nKCkuZW1haWwoXCJFbWFpbCBpbnbDoWxpZG9cIiksXG4gIHBhc3N3b3JkOiB6LnN0cmluZygpLm1pbig4LCBcIlNlbmhhIGRldmUgdGVyIHBlbG8gbWVub3MgOCBjYXJhY3RlcmVzXCIpLFxufSlcblxuZXhwb3J0IGNvbnN0IGFuc3dlclNjaGVtYSA9IHoub2JqZWN0KHtcbiAgc2Vzc2lvbklkOiB6LnN0cmluZygpLm1pbigxKSxcbiAgcXVlc3Rpb25JZDogei5zdHJpbmcoKS5taW4oMSksXG4gIGNob3NlbkFuc3dlcjogei5zdHJpbmcoKSxcbn0pXG5cbmV4cG9ydCBjb25zdCBmaW5pc2hTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIHNlc3Npb25JZDogei5zdHJpbmcoKS5taW4oMSksXG59KVxuIl0sIm5hbWVzIjpbInoiLCJyZWdpc3RlclNjaGVtYSIsIm9iamVjdCIsIm5hbWUiLCJzdHJpbmciLCJtaW4iLCJlbWFpbCIsInBhc3N3b3JkIiwiYW5zd2VyU2NoZW1hIiwic2Vzc2lvbklkIiwicXVlc3Rpb25JZCIsImNob3NlbkFuc3dlciIsImZpbmlzaFNjaGVtYSJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(rsc)/./lib/validators.ts\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next","vendor-chunks/next-auth","vendor-chunks/@babel","vendor-chunks/jose","vendor-chunks/openid-client","vendor-chunks/bcryptjs","vendor-chunks/oauth","vendor-chunks/object-hash","vendor-chunks/preact","vendor-chunks/uuid","vendor-chunks/yallist","vendor-chunks/preact-render-to-string","vendor-chunks/lru-cache","vendor-chunks/cookie","vendor-chunks/oidc-token-hash","vendor-chunks/@panva","vendor-chunks/zod"], () => (__webpack_exec__("(rsc)/./node_modules/next/dist/build/webpack/loaders/next-app-loader.js?name=app%2Fapi%2Fgame%2Fanswer%2Froute&page=%2Fapi%2Fgame%2Fanswer%2Froute&appPaths=&pagePath=private-next-app-dir%2Fapi%2Fgame%2Fanswer%2Froute.ts&appDir=C%3A%5Cigorqv-git%5CQuizClaudeCodeProjeto%5Capp&pageExtensions=tsx&pageExtensions=ts&pageExtensions=jsx&pageExtensions=js&rootDir=C%3A%5Cigorqv-git%5CQuizClaudeCodeProjeto&isDev=true&tsconfigPath=tsconfig.json&basePath=&assetPrefix=&nextConfigOutput=&preferredRegion=&middlewareConfig=e30%3D!")));
module.exports = __webpack_exports__;

})();