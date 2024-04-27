const { get_query_database } = require("../../config/database_utlis");

exports.get_dashboard_data = async (req, res) => {
  try {
    const query = `SELECT
    intervals.time_interval,
    IFNULL(SUM(sell_quantity), 0) AS total_quantity,
    IFNULL(SUM(total_price), 0) AS total_price,
    ROUND(IFNULL(AVG(total_price / quantity), 0)) AS rate_of_product
    FROM
    (
        SELECT 'Less than 30 days' AS time_interval
        UNION
        SELECT 'Between 30 to 180 days' AS time_interval
        UNION
        SELECT 'Between 180 to 365 days' AS time_interval
    ) AS intervals
    LEFT JOIN
    test_stock ON
        CASE
            WHEN intervals.time_interval = 'Less than 30 days' THEN DATEDIFF(CURRENT_DATE(), date) < 30
            WHEN intervals.time_interval = '30 to 180 days' THEN DATEDIFF(CURRENT_DATE(), date) >= 30 AND DATEDIFF(CURRENT_DATE(), date) <= 180
            WHEN intervals.time_interval = '180 to 365 days' THEN DATEDIFF(CURRENT_DATE(), date) > 180 AND DATEDIFF(CURRENT_DATE(), date) <= 365
        END
    GROUP BY
    intervals.time_interval;`;
    const data = await get_query_database(query);
    res.json(data);
  } catch (err) {
    console.error("Error fetching dashboard data:", err);
    res.status(500).json({
      err: "Error fetching dashboard data",
    });
  }
};
exports.get_shop_count = async (req, res) => {
  try {
    const query = `SELECT COUNT(name) shop_count FROM shop_location`;
    const data = await get_query_database(query);
    res.json(data);
  } catch (err) {
    console.error("Error fetching shop count");
    res.status(500).json({
      err: "Error fetching shop count",
    });
  }
};

exports.get_shop_user = async (req, res) => {
  try {
    const query = `SELECT COUNT(name) shop_user FROM master_user`;
    const data = await get_query_database(query);
    res.json(data);
  } catch (err) {
    console.error("Error fetching users");
    res.status(500).json({
      err: "Error fetching shop user",
    });
  }
};
