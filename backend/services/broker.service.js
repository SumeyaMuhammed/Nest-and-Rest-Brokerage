const db = require('../database/dbconfig');
const { sendEmail } = require('../utils/email');

const assignBroker = async (propertyId, location) => {
  const availableBroker = await db.query(
    `SELECT * FROM Brokers 
    WHERE location = ? 
    AND current_assignments < 5 
    ORDER BY current_assignments ASC LIMIT 1`,
    [location]
  );

  if (availableBroker.length > 0) {
    const broker = availableBroker[0];

    await db.query(
      `UPDATE Properties SET broker_id = ? WHERE property_id = ?`,
      [broker.broker_id, propertyId]
    );

    await db.query(
      `UPDATE Brokers SET current_assignments = current_assignments + 1 WHERE broker_id = ?`,
      [broker.broker_id]
    );

    // Fetch property details for email
    const property = await db.query(`SELECT title, location FROM Properties WHERE property_id = ?`, [propertyId]);

    // Send email notification
    await sendEmail(
      broker.email,
      'New Property Assignment',
      `
        <h1>Hello ${broker.name},</h1>
        <p>You have been assigned a new property:</p>
        <ul>
          <li><strong>Title:</strong> ${property[0].title}</li>
          <li><strong>Location:</strong> ${property[0].location}</li>
        </ul>
        <p>Please log in to your dashboard to view the details.</p>
        <p>Thank you,</p>
        <p>Your Company</p>
      `
    );

    return broker;
  } else {
    throw new Error('No available brokers');
  }
};

module.exports = { assignBroker };
