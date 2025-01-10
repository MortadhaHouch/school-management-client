export default async function fetchData(url:string,method:string,body:{},setIsLoading:Function){
  try {
    const request = await fetch(url,{
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    setIsLoading(true);
    const data = await request.json();
    return data;
  } catch (error) {
    setIsLoading(false);
    console.log(error);
  }finally{
    setIsLoading(false);
  }
}
