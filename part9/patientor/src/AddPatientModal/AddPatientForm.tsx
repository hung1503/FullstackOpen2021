import React from "react";
import { Grid, Button } from "semantic-ui-react";
import { Field, Formik, Form } from "formik";

import { TextField, SelectField, Option, DiagnosisSelection } from "./FormField";
import { Gender, Patient, HealthCheckEntry, EntryType, HealthCheckRating } from "../types";
import { useStateValue } from "../state";
/*
 * use type Patient, but omit id and entries,
 * because those are irrelevant for new patient object.
 */
export type PatientFormValues = Omit<Patient, "id" | "entries">;

export type EntryFormValues = HealthCheckEntry;

interface Props {
  onSubmit: (values: PatientFormValues) => void;
  onCancel: () => void;
}

const genderOptions: Option[] = [
  { value: Gender.Male, label: "Male" },
  { value: Gender.Female, label: "Female" },
  { value: Gender.Other, label: "Other" }
];

interface EntryProps {
  onSubmit: (values: EntryFormValues) => void;
  onCancel: () => void;
  patientId: string;
}

const ratingOption: Option[] = [
  { value: HealthCheckRating.Healthy, label: 'Healthy' },
  { value: HealthCheckRating.LowRisk, label: 'LowRisk' },
  { value: HealthCheckRating.HighRisk, label: 'HighRisk' },
  { value: HealthCheckRating.CriticalRisk, label: 'CriticalRisk' },
];

const entryOptions: Option[] = [
  { value: EntryType.HealthCheck, label: 'HealthCheck' },
];

export const AddEntryForm = ({ onSubmit, onCancel, patientId }: EntryProps) => {
  const [{ diagnoses }] = useStateValue();

  return (
    <Formik
      initialValues={{
        id: patientId,
        type: 'HealthCheck',
        description: "",
        date: "",
        specialist: "",
        diagnosisCodes: [],
        healthCheckRating: HealthCheckRating.Healthy,
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.description) {
          errors.description = requiredError;
        } else if (!values.date) {
          errors.date = requiredError;
        } else if (!values.specialist) {
          errors.specialist = requiredError;
        } 
        return errors;
      }}>
        {({ isValid, dirty, setFieldValue, setFieldTouched }) => {
          return (
            <Form className="form ui">
              <Field
                label="Description"
                placeholder="Description"
                name="description"
                component={TextField}
              />
              <Field
                label="Date"
                placeholder="YYYY-MM-DD"
                name="date"
                component={TextField}
              />
              <Field
                label="Specialist"
                placeholder="Specialist"
                name="specialist"
                component={TextField}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
              <SelectField label="Types" name="type" options={entryOptions} />
              <SelectField
                label="Rating"
                name="healthCheckRating"
                options={ratingOption}
              />
              <Grid>
                <Grid.Column floated="left" width={5}>
                  <Button type="button" onClick={onCancel} color="red">
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated="right" width={5}>
                  <Button
                    type="submit"
                    floated="right"
                    color="green"
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
  );
};

export const AddPatientForm = ({ onSubmit, onCancel } : Props ) => {
  return (
    <Formik
      initialValues={{
        name: "",
        ssn: "",
        dateOfBirth: "",
        occupation: "",
        gender: Gender.Other
      }}
      onSubmit={onSubmit}
      validate={values => {
        const requiredError = "Field is required";
        const errors: { [field: string]: string } = {};
        if (!values.name) {
          errors.name = requiredError;
        }
        if (!values.ssn) {
          errors.ssn = requiredError;
        }
        if (!values.dateOfBirth) {
          errors.dateOfBirth = requiredError;
        }
        if (!values.occupation) {
          errors.occupation = requiredError;
        }
        return errors;
      }}
    >
      {({ isValid, dirty }) => {
        return (
          <Form className="form ui">
            <Field
              label="Name"
              placeholder="Name"
              name="name"
              component={TextField}
            />
            <Field
              label="Social Security Number"
              placeholder="SSN"
              name="ssn"
              component={TextField}
            />
            <Field
              label="Date Of Birth"
              placeholder="YYYY-MM-DD"
              name="dateOfBirth"
              component={TextField}
            />
            <Field
              label="Occupation"
              placeholder="Occupation"
              name="occupation"
              component={TextField}
            />
            <SelectField
              label="Gender"
              name="gender"
              options={genderOptions}
            />
            <Grid>
              <Grid.Column floated="left" width={5}>
                <Button type="button" onClick={onCancel} color="red">
                  Cancel
                </Button>
              </Grid.Column>
              <Grid.Column floated="right" width={5}>
                <Button
                  type="submit"
                  floated="right"
                  color="green"
                  disabled={!dirty || !isValid}
                >
                  Add
                </Button>
              </Grid.Column>
            </Grid>
          </Form>
        );
      }}
    </Formik>
  );
};

export default AddPatientForm;
