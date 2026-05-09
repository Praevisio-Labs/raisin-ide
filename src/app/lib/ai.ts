import { streamText, convertToModelMessages } from 'ai'
import { openai } from '@ai-sdk/openai'
import { StreamingResponseProps } from '@/types/components'
import { MODELS } from '@/data/ai/models'
import { outputFormat, systemGuardrail, systemPersona } from '@/data/ai/prompts'

const bedrockModel = MODELS.bedrock.haiku
const openaiModel = process.env.OPENAI_MODEL ?? MODELS.openai.fast

async function selectModel(provider: string) {
    if (provider === 'bedrock') {
        const { bedrock } = await import('@ai-sdk/amazon-bedrock')
        return bedrock(bedrockModel)
    } else {
        return openai(openaiModel)
    }
}

export async function getStreamingResponse({
    messages,
    fileName,
    fileContent,
    cursorLine,
    selectedPersona,
}: StreamingResponseProps) {
    const t0 = Date.now()
    const provider = process.env.AI_PROVIDER || 'openai'
    const modelName = provider === 'bedrock' ? bedrockModel : openaiModel
    const selectedModel = await selectModel(provider)
    const convertedMessages = await convertToModelMessages(messages)

    const fileContext = fileName
        ? `The user is currently viewing: ${fileName} (cursor at line ${cursorLine ?? 1})\n\nFile contents:\n\`\`\`\n${fileContent}\n\`\`\``
        : ''

    const systemPrompt = `

You are a coding assistant helping an intermediate learner improve their skills.

${systemPersona[selectedPersona.key] ?? systemPersona.socrates}

${fileContext}

${systemGuardrail.raisin}

${outputFormat.markdown}

    `.trim()

    let tPreStream = 0
    let firstChunkLogged = false

    const response = streamText({
        model: selectedModel,
        messages: convertedMessages,
        system: systemPrompt,
        providerOptions: {
            openai: { reasoningEffort: 'minimal' },
        },
        onChunk: () => {
            if (firstChunkLogged) return
            firstChunkLogged = true
            console.log(
                `[chat] ttft=${Date.now() - t0}ms preStream=${tPreStream}ms model=${modelName} provider=${provider} persona=${selectedPersona.key} msgCount=${messages.length} sysChars=${systemPrompt.length}`,
            )
        },
    })

    tPreStream = Date.now() - t0

    return response
}
