import tagFile  from '../../public/files/GTM-P3NVH2_workspace.json'
export async function FetchGtm () {
    console.log('Here')

    const getData = async () => {
        try {
            const res = await
                fetch('GTM-P3NVH2_workspace.json')
            const data = await res.text()
            console.log(data)
            return data

        } catch (err) {
            console.log(err)
        }
    }
    let d = getData();
}