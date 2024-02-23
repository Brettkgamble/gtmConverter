
// import { FetchGtm } from '../components/functions/FetchGtm';
import tagFile from '../public/files/GTM-P3NVH2_workspace.json';

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
    console.log(result)
}

export default function Home() {
  // console.log('Tagfile', tagFile.containerVersion.path)
  //   console.log('Tagfile', tagFile.containerVersion.tag[0])
    const test =  dataLoop();

  return (
      <div>
          Hello world
      </div>
  )
}
