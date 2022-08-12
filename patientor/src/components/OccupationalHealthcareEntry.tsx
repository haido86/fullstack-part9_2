import WorkIcon from '@mui/icons-material/Work';

const OccupationalHealthcareEntry = ({ employerName }: { employerName: string }) => {
    return (
        <>
            <WorkIcon />
            <div>{employerName}</div>
        </>
    );
};

export default OccupationalHealthcareEntry;