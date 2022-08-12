// import { HealthCheckEntry } from "../types";
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import FavoriteIcon from '@mui/icons-material/Favorite';

const HealthCheckEntry = ({ heartCheckRating }: { heartCheckRating: number }) => {
    return (
        <>
            <MedicalServicesIcon />
            <FavoriteIcon style={{ color: heartCheckRating === 0 ? 'green' : 'yellow' }} />
        </>
    );
};

export default HealthCheckEntry;