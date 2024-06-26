// Generated by Xata Codegen 0.29.4. Please do not edit.
import { buildClient } from "@xata.io/client";
import type {
  BaseClientOptions,
  SchemaInference,
  XataRecord,
} from "@xata.io/client";

const tables = [
  {
    name: "surveys",
    columns: [
      {
        name: "name",
        type: "string",
        notNull: true,
        defaultValue: "default name",
      },
      { name: "json", type: "json", notNull: true, defaultValue: "{}" },
      {
        name: "description",
        type: "text",
        notNull: true,
        defaultValue: "default description",
      },
    ],
    revLinks: [
      { column: "survey", table: "asigned_surveys" },
      { column: "survey", table: "survey_answers" },
    ],
  },
  {
    name: "asigned_surveys",
    columns: [
      { name: "survey", type: "link", link: { table: "surveys" } },
      { name: "patient", type: "link", link: { table: "patient_profiles" } },
    ],
  },
  {
    name: "survey_answers",
    columns: [
      { name: "survey", type: "link", link: { table: "surveys" } },
      { name: "respondent", type: "link", link: { table: "patient_profiles" } },
      { name: "answer", type: "json", notNull: true, defaultValue: "{}" },
    ],
  },
  {
    name: "patient_profiles",
    columns: [
      { name: "emr_id", type: "string", unique: true },
      { name: "user_id", type: "string", unique: true },
      { name: "name", type: "string", notNull: true, defaultValue: "" },
      { name: "second_name", type: "string" },
      { name: "lastname", type: "string", notNull: true, defaultValue: "" },
      {
        name: "birth_date",
        type: "datetime",
        notNull: true,
        defaultValue: "now",
      },
      { name: "gender", type: "string", notNull: true, defaultValue: "N" },
      { name: "phone", type: "string", notNull: true, defaultValue: "" },
    ],
    revLinks: [
      { column: "patient", table: "asigned_surveys" },
      { column: "respondent", table: "survey_answers" },
    ],
  },
] as const;

export type SchemaTables = typeof tables;
export type InferredTypes = SchemaInference<SchemaTables>;

export type Surveys = InferredTypes["surveys"];
export type SurveysRecord = Surveys & XataRecord;

export type AsignedSurveys = InferredTypes["asigned_surveys"];
export type AsignedSurveysRecord = AsignedSurveys & XataRecord;

export type SurveyAnswers = InferredTypes["survey_answers"];
export type SurveyAnswersRecord = SurveyAnswers & XataRecord;

export type PatientProfiles = InferredTypes["patient_profiles"];
export type PatientProfilesRecord = PatientProfiles & XataRecord;

export type DatabaseSchema = {
  surveys: SurveysRecord;
  asigned_surveys: AsignedSurveysRecord;
  survey_answers: SurveyAnswersRecord;
  patient_profiles: PatientProfilesRecord;
};

const DatabaseClient = buildClient();

const defaultOptions = {
  databaseURL:
    "https://Verzach3-s-workspace-l4k58l.us-east-1.xata.sh/db/wellfit-clinic-main",
};

export class XataClient extends DatabaseClient<DatabaseSchema> {
  constructor(options?: BaseClientOptions) {
    super({ ...defaultOptions, ...options }, tables);
  }
}

let instance: XataClient | undefined = undefined;

export const getXataClient = () => {
  if (instance) return instance;

  instance = new XataClient();
  return instance;
};
