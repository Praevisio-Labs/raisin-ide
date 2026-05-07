## Sprint 1: Next.js + Monaco scaffold with Vercel deploy

- [x] initialize Next.js app with TypeScript and Tailwind, #1
- [x] set up GitHub Kanban board with Backlog / In Progress / Done columns, #2
- [x] install Monaco Editor and render in basic page with no configuration, #4
- [x] add language selector with boilerplate snippets, #8
- [x] confirm Monaco renders TypeScript file with syntax highlighting, #5
- [x] validate editor is functional: typing, cursor movement, basic keybindings, #6
- [x] deploy editor to Vercel and confirm live URL, #3

## Sprint 2: Three-panel IDE with file tree and AI panel

- [x] build three-panel IDE layout with file tree, Monaco editor, and AI panel, #12
- [x] add custom tailwind classes and implement three-theme toggle, #17
- [x] implement static file tree with hardcoded file list, #13
- [x] wire file tree clicks to load placeholder text into Monaco editor, #14
- [x] build AI panel UI shell with input, send button, and message list, #15
- [x] enhance styling and finalize layout at desktop screens sizes, #16

## Sprint 3: First teaching module with /learn dashboard

- [x] add /learn route and dashboard ui rendering first teaching module, #19
- [x] define module schema and author module content for simple spa app, #20
- [x] wire selection to load module files into the editor and file tree, #21
- [x] extract dashboard, project, page headers as standalone components, #23
- [x] add App Router navigation between editor and dashboard interfaces, #22
- [x] content expansion and UI enhancements for learning modules, #24

## Sprint 4: Streaming responses + editor context injection 

- [x] install Vercel AI SDK, create new IAM service user, store env vars, #27
- [x] create POST /api/chat route with streaming response, #28
- [x] replace mock response in AssistantPanel with useChat hook, #29
- [x] track cursor position in CodeEditor and lift to page state, #30
- [x] track highlighted text in CodeEditor and lift to page state, #36
- [ ] inject active file content and cursor line into each chat request, #31
- [ ] add filename and line indicator to AI panel showing active context, #32
- [ ] tune response for contextual awareness of reference code in editor, #33
- [ ] complete backlogged UI enhancements and minor bug fixes, #34
- [ ] measure time to first token and reduce response latency, #35
