import { Entry } from "../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheckEntry heartCheckRating={entry.healthCheckRating} />;
        case "Hospital":
            return <HospitalEntry />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry employerName={entry.employerName} />;
        default:
            return assertNever(entry);
    }
};

export default EntryDetails;