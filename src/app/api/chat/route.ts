import { getStreamingResponse } from '@/app/lib/ai'

export const runtime = 'edge'

export async function POST(request: Request) {
    const tRoute = Date.now()
    const { messages, fileName, fileContent, cursorLine, selectedPersona } =
        await request.json()

    const streamResponse = await getStreamingResponse({
        messages,
        fileName,
        fileContent,
        cursorLine,
        selectedPersona,
    })

    const response = streamResponse.toUIMessageStreamResponse()

    console.log(`[chat] routeOverhead=${Date.now() - tRoute}ms`)

    return response
}
