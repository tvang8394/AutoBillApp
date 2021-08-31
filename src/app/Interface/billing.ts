import { Resident } from "./resident";

export interface Billing {
    id: number;
    start_date: string;
    end_date: string;
    resident_id: Resident;
    amount_billed: string;
    units_billed: string;
    approved: string;
}