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
}: StreamingResponseProps) {
    const provider = process.env.AI_PROVIDER || 'openai'
    const selectedModel = selectModel(provider)
    const convertedMessages = await convertToModelMessages(messages)

    const systemPrompt = `
    
You are a coding assistant helping a learner understand their code.

${systemGuardrail.raisin}

${systemPersona.socrates}

The user is currently viewing: ${fileName ?? 'unknown file'} (cursor at line ${cursorLine ?? 1})

File contents:
\`\`\`
${fileContent ?? ''}
\`\`\`

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
