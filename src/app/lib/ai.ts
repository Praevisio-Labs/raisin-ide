import { streamText, convertToModelMessages } from 'ai'
import { openai } from '@ai-sdk/openai'
import { bedrock } from '@ai-sdk/amazon-bedrock'
import { StreamingResponseProps } from '@/types/components'
import { MODELS } from '@/data/ai/models'
import { outputFormat, systemGuardrail, systemPersona } from '@/data/ai/prompts'

const bedrockModel = MODELS.bedrock.haiku
const openaiModel = MODELS.openai.fast

function selectModel(provider: string) {
    if (provider === 'bedrock') {
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
    const provider = process.env.AI_PROVIDER || 'openai'
    const selectedModel = selectModel(provider)
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

    const response = streamText({
        model: selectedModel,
        messages: convertedMessages,
        system: systemPrompt,
    })

    console.log('response:', response)
    return response
}
