
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { network } from "hardhat";

describe("SimpleStorage", function () {

  it("should store and retrieve a number", async function () {
    const connection = await network.connect();
    const contract = await connection.viem.deployContract("SimpleStorage");

    await contract.write.store([25n]);

    const result = await contract.read.retrieve();
    assert.equal(result, 25n);
  });

  it("should increment the stored number", async function () {
    const connection = await network.connect();
    const contract = await connection.viem.deployContract("SimpleStorage");

    await contract.write.store([25n]);
    await contract.write.increment();

    const result = await contract.read.retrieve();
    assert.equal(result, 26n);
  });

  it("should decrement the stored number", async function () {
    const connection = await network.connect();
    const contract = await connection.viem.deployContract("SimpleStorage");

    await contract.write.store([25n]);
    await contract.write.decrement();

    const result = await contract.read.retrieve();
    assert.equal(result, 24n);
  });

  it("should prevent decrementing zero", async function () {
    const connection = await network.connect();
    const contract = await connection.viem.deployContract("SimpleStorage");

    await assert.rejects(
      contract.write.decrement()
    );
  });

});
