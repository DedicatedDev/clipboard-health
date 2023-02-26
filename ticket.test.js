const { deterministicPartitionKey } = require("./ticket");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given an object with partition key length<256 input", () => {
    const data = { "partitionKey": "SOME-KEY" }
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey).toBe("0");
  });
});

describe("deterministicPartitionKey", () => {
  it("Returns the a hex of the sha3-512 message when given an object with partition key length>256 input", () => {
    const partitionKey = `
    A String or Number object that's used to insert white space (including indentation, line break characters, etc.) into the output JSON string for readability purposes.
    If this is a Number, it indicates the number of space characters to use as white space for indenting purposes; this number is capped at 10 (if it is greater, the value is just 10). Values less than 1 indicate that no space should be used.
    If this is a String, the string (or the first 10 characters of the string, if it's longer than that) is used as white space.
    If this parameter is not provided (or is null), no white space is used.
`
    const data = { "partitionKey": partitionKey }
    const trivialKey = deterministicPartitionKey(data);
    expect(trivialKey.length).toBe(128);
  });
});
