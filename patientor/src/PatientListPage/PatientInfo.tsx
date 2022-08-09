import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';

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

    return (
        <>
            <h2> {detailedPatient?.name} {getGender()}</h2>

            <p> ssn: {detailedPatient?.ssn}</p>
            <p> occupation: {detailedPatient?.occupation}</p>

        </>
    );
};

export default PatientInfo;