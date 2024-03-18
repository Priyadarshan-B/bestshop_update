const { get_query_database, post_query_database } = require("../../config/database_utlis");

exports.get_model = async (req, res) => {
  const brand = req.query.brand;

  if (!brand) {
    return res.status(400).json({
      error: "brand is required in query!!",
    });
  }

  try {
    const query = `
      SELECT id, name
      FROM model
      WHERE brand = ?
      AND status = '1'
    `;

    const models = await get_query_database(query, [brand]);
    res.json(models);
  } catch (err) {
    console.error("Error fetching models:", err);
    res.status(500).json({ error: "Error fetching models" });
  }
};

exports.post_model = async (req, res) => {
  const { brand, name } = req.body;

  if (!brand || !name) {
    return res.status(400).json({
      error: "brand and name are required",
    });
  }

  try {
    const formatted_name = name.toUpperCase();
    const query = `
      INSERT INTO model (brand, name)
      VALUES (?, ?)
    `;

    const success_message = await post_query_database(
      query,
      [brand, formatted_name],
      "Model added successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error adding model:", err);
    res.status(500).json({ error: "Error adding model" });
  }
};

exports.update_model = async (req, res) => {
  const { id, name } = req.body;

  if (!id || !name) {
    return res.status(400).json({
      error: "id and name are required",
    });
  }

  try {
    const formatted_name = name.toUpperCase();
    const query = `
      UPDATE model
      SET name = ?
      WHERE id = ?
    `;

    const success_message = await post_query_database(
      query,
      [formatted_name, id],
      "Model updated successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error updating model:", err);
    res.status(500).json({ error: "Error updating model" });
  }
};

exports.delete_model = async (req, res) => {
  const { id } = req.body;

  if (!id) {
    return res.status(400).json({
      error: "ID is required",
    });
  }

  try {
    const query = `
      UPDATE model
      SET status = '0'
      WHERE id = ?
    `;

    const success_message = await post_query_database(
      query,
      [id],
      "Model deleted successfully"
    );
    res.json({ message: success_message });
  } catch (err) {
    console.error("Error deleting model:", err);
    res.status(500).json({ error: "Error deleting model" });
  }
};
