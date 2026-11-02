import fs from "fs";


fs.readFile('./data.text',(err,data)=>{

if (err){
    console.error('Error reading file',err)
    return
}
console.log(data)
})

fs.writeFile('./output.txt', 'Hello, file',(err)=>{
if (err) throw errconsole.log('file saved!')
})