export default async function handler(req, res) {
  try{
    const response = await fetch("https://myqa.fleksa.com/pyapi/50/menu")
    const menuData = await response.json()
    res.status(200).json(menuData)
  } catch (error) {
    throw new Error(error);
  }
}
