export interface Passport {
    id: string;
    firstName: string;
    lastName: string;
    partitionKey: string;
    rowKey: string;
    documentName: string;
    documentNumber: string;
    ocrResult: string;
    sex: string;
    placeOfBirth: string;
    machineReadableZone: string;
    issuingAuthority: string;
    documentType: string;
    nationality: string;
    dateOfIssue: string;
    dateOfExpiration: string;
    dateOfBirth: string;
}