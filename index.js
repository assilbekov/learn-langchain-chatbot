import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter'
import fs from "fs"

fs.readFile('scrimba-info.txt', 'utf8', async (err, data) => {
  if (err) {
    console.error(err)
    return
  }

  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 500
  })
  const output = await splitter.createDocuments([data])

  fs.writeFile('output.json', JSON.stringify(output, null, 2), (err) => {
    if (err) {
      console.error(err)
      return
    }
    console.log('File has been created')
  })
})