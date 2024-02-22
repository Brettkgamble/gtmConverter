async function convertJSONtoCSV () {

    const getData = async () => {
        try {
            const res = await
                fetch('../files/GTM-P3NVH2_workspace.json'
            )
            const data = await res.text()
            console.log(data)
            return data

        } catch (err) {
            console.log(err)
        }
    }
    let d = getData();
}

convertJSONtoCSV();