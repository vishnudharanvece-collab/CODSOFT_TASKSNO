
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { network } from "hardhat";

describe("StudentCertificate", function () {

  it("should issue and verify a certificate", async function () {
    const connection = await network.connect();
    const contract = await connection.viem.deployContract("StudentCertificate");

    await contract.write.issueCertificate([
      "CERT001",
      "Student A",
      "Blockchain Development"
    ]);

    const result = await contract.read.verifyCertificate(["CERT001"]);
    assert.equal(result, true);
  });

  it("should retrieve certificate details", async function () {
    const connection = await network.connect();
    const contract = await connection.viem.deployContract("StudentCertificate");

    await contract.write.issueCertificate([
      "CERT002",
      "Student B",
      "Blockchain Development"
    ]);

    const result = await contract.read.getCertificate(["CERT002"]);

    assert.equal(result[0], "Student B");
    assert.equal(result[1], "Blockchain Development");
  });

  it("should reject duplicate certificate IDs", async function () {
    const connection = await network.connect();
    const contract = await connection.viem.deployContract("StudentCertificate");

    await contract.write.issueCertificate([
      "CERT003",
      "Student C",
      "Blockchain Development"
    ]);

    await assert.rejects(
      contract.write.issueCertificate([
        "CERT003",
        "Student D",
        "Blockchain Development"
      ])
    );
  });

});