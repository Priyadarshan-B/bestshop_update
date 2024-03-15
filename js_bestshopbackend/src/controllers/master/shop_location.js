const {
  get_query_database,
  post_query_database,
} = require("../../config/database_utlis");

exports.get_shop_location = async (req, res) => {
  try {
    const query = `SELECT id, name 
        FROM shop_location
        WHERE status = '1'`;
    const shop_location = await get_query_database(query);
    res.json(shop_location);
  } catch (err) {
    console.error("Error fetching shop location", err);
    res.status(500).json({
      error: "Error fetching shop location",
    });
  }
};

exports.post_shop_location = async (req, res) => {
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({
      error: "name is required",
    });
  }
  try {
    const formatted_name = name.toUpperCase();
    const query = `INSERT INTO shop_location(name)
        VALUES(?)`;
    const success_message = await post_query_database(
      query,
      [formatted_name],
      "Shop location added successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error Adding shop location:", err);
    res.status(500).json({ error: "Error Adding shop location" });
  }
};

exports.update_shop_location = async (req, res) => {
  const { id, name } = req.body;
  if (!id || !name) {
    return res.status(400).json({
      err: "id and name are required",
    });
  }
  try {
    const formatted_name = name.toUpperCase();
    const query = `UPDATE shop_location
    SET name = ?
    WHERE id = ?`;
    const success_message = await post_query_database(
      query,
      [formatted_name, id],
      "Shop location updated successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error updating shop location:", err);
    res.status(500).json({
      error: "Error updating shop location",
    });
  }
};

exports.delete_shop_location = async(req, res)=>{
  const {id} = req.body
  try {
    const query = `UPDATE shop_location
    SET status = '0'
    WHERE id = ?`
    const success_message = await post_query_database(
      query,
      [id],
      "Shop location deleted successfully"
    )
    res.json({message:success_message})
  } catch (err) {
    console.error("Error deleting shop location:", err)
    res.status(500).json({
      error: "Error deleting shop location"
    })
  }
}