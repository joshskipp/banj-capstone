// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.

export type Project = {
    project_id: string,
    project_name: string,
    product: string,
    latitude: string,
    longitude: string,
    created_by: string,
    created_at: string,
    updated_at: string,
    approval_status: string,
    approved_by: string,
    approved_at: string
};

export type Company = {
    company_id: string,
    company_name: string,
    asx_code : string,
    notes: string,
    created_by: string,
    created_at: string,
    updated_at: string,
    approval_status: string,
    approved_by: string,
    approved_at: string
}