export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const apiEnd = `http://127.0.0.1:8000/events/`
      const options = { 
        body: req.body,
        method: "POST",
        headers: {'Content-Type': 'application/json'} 
      }
      const response = await fetch(apiEnd, options);
      await response.json()
      res.status(200).end()
    } catch (err){
      res.status(err).json({})
    }
  }
}