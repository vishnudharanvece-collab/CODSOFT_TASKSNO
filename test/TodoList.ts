
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { network } from "hardhat";

describe("TodoList", function () {

  it("should add and retrieve a task", async function () {
    const connection = await network.connect();
    const contract = await connection.viem.deployContract("TodoList");

    await contract.write.addTask(["Complete blockchain project"]);

    const result = await contract.read.getTask([0n]);

    assert.equal(result[0], "Complete blockchain project");
    assert.equal(result[1], false);
    assert.ok(result[2] > 0n);
  });

  it("should update task completion status", async function () {
    const connection = await network.connect();
    const contract = await connection.viem.deployContract("TodoList");

    await contract.write.addTask(["Complete assignment"]);
    await contract.write.updateTask([0n, true]);

    const result = await contract.read.getTask([0n]);

    assert.equal(result[1], true);
  });

  it("should return the correct task count", async function () {
    const connection = await network.connect();
    const contract = await connection.viem.deployContract("TodoList");

    await contract.write.addTask(["Task one"]);
    await contract.write.addTask(["Task two"]);

    const result = await contract.read.getTaskCount();

    assert.equal(result, 2n);
  });

  it("should reject an invalid task ID", async function () {
    const connection = await network.connect();
    const contract = await connection.viem.deployContract("TodoList");

    await assert.rejects(
      contract.read.getTask([0n])
    );
  });

});
