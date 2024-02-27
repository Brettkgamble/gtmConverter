import tagFile from '../public/files/GTM-P3NVH2_workspace.json';
const fs = require('fs');

async function sleep(milliseconds) {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}


function  dataLoop() {
    let  name='';
    let type ='';
    let tagId = '';
    let parameterType = '';
    let pkey = '';
    let tagType = ''

    let result = []

    Object.entries(tagFile).forEach((entry) => {
        const  [key, value ] = entry;
        Object.entries(value).forEach((entry2)=> {
            const [key2, value2] = entry2;
            if (key2 ===  'tag')   {
                tagType  = 'tag'
                Object.entries(value2).forEach((entry3)=> {
                    let paramsArray =[];
                    const [key3, value3] = entry3;
                    Object.entries(value3).forEach((entry4)=> {
                        const [key4, value4] = entry4;
                        if (key4 === 'name') {
                            name = value4;
                        }
                        if (key4 === 'tagId') {
                            tagId = value4
                        }
                        if (key4 === 'type') {
                            type = value4
                        }
                        if (key4 === 'parameter') {
                            Object.entries(value4).forEach((entry5)=> {
                                 const [key5, value5] = entry5;
                                 Object.entries(value5).forEach((entry6)=> {
                                     const [key6, value6] = entry6;
                                     if (key6  === 'type') {
                                        parameterType = value6;
                                     }
                                     if (key6 === 'key') {
                                         pkey = value6
                                     }

                                 })
                                let  params = {parameterType, pkey }
                                paramsArray.push(params)
                            })
                        }
                    })
                    const entries = {tagType, name, tagId, type, paramsArray}
                    result.push(entries)
                })
            }
        })

    })
    return result
}

function appendtoFile(value) {
    fs.appendFile('test.csv',
        value ,
        function(err){
            if (err) throw err;
        }
    )
}

async function GtmToCSV(gtmdata) {

    Object.entries(gtmdata).forEach((entry) => {
        let  tempArray=[];
        const [key, value] = entry;
        tempArray.push(value.tagType);
        tempArray.push(value.name);
        tempArray.push(value.tagId);
        tempArray.push(value.type);

        for (var i = 0; i < value.paramsArray.length; i++) {
            let pos1 = value.paramsArray[i].parameterType
            let pos2 = value.paramsArray[i].pkey
            tempArray.push(pos1)
            tempArray.push(pos2)
        }

        tempArray.push(`\r\n`);

         // console.log('Array', tempArray)
        let text  = ''
        for (var i = 0; i < tempArray.length; i++)  {
            if (tempArray[i] != '\r\n') {
                text = text + tempArray[i] + ','
            } else {
                text = text + tempArray[i]
            }
        }
        // test 2
        setTimeout(appendtoFile, 500, text)
    })
    console.log('Complete6')
}

export default function Home() {
    const test =  dataLoop();
    // console.log(test)
    GtmToCSV(test)
  return (
      <div>
          Hello world
      </div>
  )
}
