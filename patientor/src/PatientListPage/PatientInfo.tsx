import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Entry } from "../types";


const PatientInfo = () => {
    const [{ patients },] = useStateValue();
    const allPatient = Object.values(patients);

    const { id } = useParams<{ id: string }>();

    const detailedPatient = allPatient.find(p => p.id === id);

    const getGender = () => {
        if (detailedPatient?.gender === "male") {
            return <MaleIcon />;
        }
        else if (detailedPatient?.gender === "female") {
            return <FemaleIcon />;
        }
        else {
            return null;
        }
    };

    console.log('detailedPatient', detailedPatient);
    console.log('entries', detailedPatient?.entries);

    return (
        <>
            <h2> {detailedPatient?.name} {getGender()}</h2>

            <p> ssn: {detailedPatient?.ssn}</p>
            <p> occupation: {detailedPatient?.occupation}</p>
            <br />
            {detailedPatient && detailedPatient.entries && detailedPatient.entries.length > 0 && (<h3>Entries</h3>)}

            {detailedPatient?.entries?.map((entry: Entry, index) => {
                return (
                    <div key={index}>
                        <div>
                            {entry.date} {''}
                            <em>{entry.description}</em>
                        </div>
                        <ul>
                            {entry.diagnosisCodes?.map((diagnosisCode, index) => <li key={index}>{diagnosisCode}</li>)}
                        </ul>
                    </div>
                );
            }
            )
            }
        </>
    );

};

export default PatientInfo;