import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import fs from "fs"

fs.readFile('scrimba-info.txt', 'utf8', async (err, data) => {
  if (err) {
    console.error(err)
    return
  }
  const splitter = new RecursiveCharacterTextSplitter()
  const output = await splitter.createDocuments([data])
  console.log(output)
})