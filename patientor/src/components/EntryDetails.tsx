import { Entry } from "../types";
import HealthCheckEntry from "./HealthCheckEntry";
import HospitalEntry from "./HospitalEntry";
import OccupationalHealthcareEntry from "./OccupationalHealthcareEntry";
import FavoriteIcon from '@mui/icons-material/Favorite';

const assertNever = (value: never): never => {
    throw new Error(
        `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
};

const EntryInfo: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "HealthCheck":
            return <HealthCheckEntry />;
        case "Hospital":
            return <HospitalEntry />;
        case "OccupationalHealthcare":
            return <OccupationalHealthcareEntry employerName={entry.employerName} />;
        default:
            return assertNever(entry);
    }
};

const Favorite: React.FC<{ entry: Entry }> = ({ entry }) => {
    switch (entry.type) {
        case "HealthCheck":
            return <FavoriteIcon style={{ color: entry.healthCheckRating === 0 ? 'green' : 'yellow' }} />;
        case "Hospital":
        case "OccupationalHealthcare":
            return null;
        default:
            return assertNever(entry);
    }
};

const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {

    return <>
        <div>{entry.date} {<EntryInfo entry={entry} />}</div>
        <div><Favorite entry={entry} /></div>
        <div><em>{entry.description}</em></div>
    </>;
};

export default EntryDetails;