const crypto = require("crypto");

exports.deterministicPartitionKey = (event) => {
  const TRIVIAL_PARTITION_KEY = "0";
  const MAX_PARTITION_KEY_LENGTH = 256;

  // If event is undefined or null, return trivial key
  if (!event) {
    return TRIVIAL_PARTITION_KEY;
  }

  // If partitionKey exists and is shorter than MAX_PARTITION_KEY_LENGTH, return trivial key
  if (event.partitionKey && event.partitionKey.length <= MAX_PARTITION_KEY_LENGTH) {
    return TRIVIAL_PARTITION_KEY;
  }

  // Generate message data based on partitionKey if it exists, otherwise use the event object
  const data = event.partitionKey ? event.partitionKey : event;
  const message_data = typeof data === "string" ? data : JSON.stringify(data);

  // Return the hashed message data if it's longer than MAX_PARTITION_KEY_LENGTH
  return message_data.length > MAX_PARTITION_KEY_LENGTH
    ? crypto.createHash("sha3-512").update(message_data).digest("hex")
    : TRIVIAL_PARTITION_KEY;
};
