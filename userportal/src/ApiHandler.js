const ApiHandler = async (APIURL='',optionsObj=null) =>{
       
    try {
      
        const sendApiReq = await fetch(APIURL, optionsObj);

        if (!sendApiReq.ok) {
            throw new Error('Please reload the app.. something went wrong');
        }

        const parsedData = await sendApiReq.json();

        return parsedData

    } catch (err) {

        return {error: err.message}

    }
   

}

export default ApiHandler;