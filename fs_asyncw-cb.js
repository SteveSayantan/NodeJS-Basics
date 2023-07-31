const { readFile, writeFile } = require('fs')

console.log('start')
readFile('testFiles/dele.txt', 'utf8', (err, result) => {
  if (err) {
    console.log(err)
    return
  }
  const first = result
  readFile('testFiles/hello.txt', 'utf8', (err, result) => {
    if (err) {
      console.log(err)
      return
    }
    const second = result
    writeFile(
      './result-async.txt',
      `Here is the result : ${first}, ${second}`,
      (err, result) => {
        if (err) {
          console.log(err)
          return
        }
        console.log('done with this task')
      }
    )
  })
})
console.log('starting next task')

//Remarks: It gets the job done but the nested pattern looks awful and destroys code readability.So let's try this using Promises