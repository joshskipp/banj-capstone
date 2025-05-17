// This file contains type definitions for your data.
// It describes the shape of the data, and what data type each property should accept.

export type AuditData= {
    project_id: string,
    previous_value: string[],
    new_value: string[],
    fields_affected: string[],
}

export type AuditRecord = {
    user_id: string,
    project_id: string,
    data: string,
}

export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
  };

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
    created_at: Date,
    updated_at: Date,
    approval_status: string,
    approved_by: string,
    approved_at: Date
}

export type CompanyForm = {
    company_id: string,
    company_name: string,
    asx_code : string,
    notes: string,
}

export type KeyEvent = {
    event_id: string,
    event_date: Date,
    event_details: string,
    created_by: string,
    created_at: Date,
    updated_at: Date,
}

export type KeyEventForm = {
    event_id: string,
    event_date: Date,
    event_details: string,
    project_id: string,
    project_name: string,
}