import {Patient} from "fhir/r4";
import type {PatientProfile} from "~/types/DBTypes";

class CompoundPatient {
  constructor(
    private readonly patient?: Patient,
    private profile?: PatientProfile
  ) {
    console.log("Patient", patient, "Profile", profile)
    this.patient = patient;
    this.profile = profile;
  }

  getName() {
    if (!this.patient) {
      return undefined;
    }
    return this.patient.name?.[0].given?.[0] + " " + this.patient.name?.[0].family;
  }

  get emrId() {
    if (!this.patient) {
      return undefined;
    }
    return this.patient.id;
  }

  get dbId() {
    return this.profile?.id;
  }

  get birthDate() {
    if (!this.patient) {
      return undefined;
    }
    return this.patient.birthDate;
  }
}

export default CompoundPatient;