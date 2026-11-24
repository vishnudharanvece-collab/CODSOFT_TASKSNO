
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract StudentCertificate {

    struct Certificate {
        string studentName;
        string course;
        uint256 issueDate;
        bool exists;
    }

    mapping(string => Certificate) private certificates;

    event CertificateIssued(
        string certificateId,
        string studentName,
        string course
    );

    // Issue a certificate with a unique ID
    function issueCertificate(
        string memory _certificateId,
        string memory _studentName,
        string memory _course
    ) public {
        require(bytes(_certificateId).length > 0, "ID required");
        require(!certificates[_certificateId].exists, "Certificate already exists");

        certificates[_certificateId] = Certificate({
            studentName: _studentName,
            course: _course,
            issueDate: block.timestamp,
            exists: true
        });

        emit CertificateIssued(
            _certificateId,
            _studentName,
            _course
        );
    }

    // Verify whether a certificate exists
    function verifyCertificate(
        string memory _certificateId
    ) public view returns (bool) {
        return certificates[_certificateId].exists;
    }

    // Retrieve certificate details
    function getCertificate(
        string memory _certificateId
    ) public view returns (
        string memory,
        string memory,
        uint256
    ) {
        require(
            certificates[_certificateId].exists,
            "Certificate not found"
        );

        Certificate memory cert = certificates[_certificateId];

        return (
            cert.studentName,
            cert.course,
            cert.issueDate
        );
    }
}
