const cvstfjs = require('@microsoft/customvision-tfjs-node');
var fs = require('fs')

exports.testMask = async function(req , res) {

    let image = req.file;

    if(!image) return res.status(500).json({
        error : "Image is required"
    })


    try {
        
        const model = new cvstfjs.ObjectDetectionModel();

        // console.log('app' , req.protocol + '://' + req.hostname )
        await model.loadModelAsync('file://model.json');


        fs.readFile(image.path, async function (err, data) {
            if (err) {
              throw err;
            }

            console.log('data' , data)
        
            const result = await model.executeAsync(data);
            
            var boundingBoxes = result[0]
            var probabilities = result[1]
            var classIds = result[3]
            var isMask  = false

            probabilities.map(prob => {
                if (prob > 0.5) isMask = true
            })

            return res.json({
                result : isMask ? 1 : 0,
                message : isMask ? 'Mask is there' : 'No mask found',
                data : { result }
            })
          });



    } 
    catch (error) {
        
        res.json({
            result : 0,
            error : error.message,
            data : {}
        })
    }

}
