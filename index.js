import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import { createClient } from '@supabase/supabase-js'
import { SupabaseVectorStore } from "langchain/vectorstores/supabase"
import { OpenAIEmbeddings } from "langchain/embeddings/openai"
import fs from "fs"

fs.readFile('scrimba-info.txt', 'utf8', async (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500,
    separators: ['\n\n','\n', ' ', ''], // default separators.
    chunkOverlap: 50,
  })
  const output = await splitter.createDocuments([data])

  const sbApiKey = process.env.SUPABASE_API_KEY
  const sbUrl = process.env.SUPABASE_URL
  const openAIApiKey = process.env.OPENAI_API_KEY

  console.log({sbApiKey, sbUrl, openAIApiKey})

  const client = createClient(sbUrl, sbApiKey)

  await SupabaseVectorStore.fromDocuments(
    output,
    new OpenAIEmbeddings({ openAIApiKey }),
    {
      client,
      tableName: 'documents',
    }
  )

  fs.writeFile('output.json', JSON.stringify(output, null, 2), (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('File has been created')
  })
})