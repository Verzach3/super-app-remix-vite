import type {Database} from "~/types/database.types";

export type PatientProfile = Database["public"]["Tables"]["patient_profiles"]["Row"];
export type Survey = Database["public"]["Tables"]["surveys"]["Row"];