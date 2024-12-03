const express = require('express')
const multer  = require('multer')
const cors =require('cors')
const docxtopdf = require('docx-pdf')
const path =require('path')
const app = express()
const port = 3000

app.use(cors())
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
     
      cb(null, file.originalname)
    }
  })
  //upload storing
  const upload = multer({ storage: storage })
  app.post('/convertfile', upload.single('file'), (req, res, next)=> {
 try {
    if(!req.file){
    return res.status(400).json({
        message:"no file is uploaded"
    })
    }
    // output path
    const outoutpath =path.join(__dirname,'files',`${req.file.originalname}.pdf`)
    docxtopdf(req.file.path,outoutpath,(err,result)=>{
        if(err){
          console.log(err)
          return res.status(500).json({
            message:"did not converted"
        })
        }
        res.download(outoutpath,()=>{
          
           console.log('file downloaded')
        })
        console.log('result'+result)
      })
    
 } catch (error) {
    console.log(error)
    res.status(500).json({
        message:"internal server Error"
    })
 }
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})