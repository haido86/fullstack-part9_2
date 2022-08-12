import { useParams } from "react-router-dom";
import { useStateValue } from "../state";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Entry } from "../types";
import DiagnoseInfo from "../components/DiagnoseInfo";
import EntryDetails from "../components/EntryDetails";
import { Box, Button, Grid, Paper, styled } from "@material-ui/core";

const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
}));


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
                    <Box sx={{ width: '100%' }} style={{ padding: 6 }} key={index}>
                        <Grid>
                            <Item>
                                <div>{entry.date} {<EntryDetails entry={entry} />}</div>
                                <div><em>{entry.description}</em></div>

                                <ul>{entry.diagnosisCodes?.map((diagnosisCode, index) =>
                                    <li key={index}>{diagnosisCode}{' '}{<DiagnoseInfo code={diagnosisCode} />}</li>)}
                                </ul>

                                <div> diagnosed by {entry.specialist}</div>
                            </Item>
                        </Grid>
                    </Box>
                );
            }
            )
            }
            <Button variant="contained" color="primary" style={{ margin: 20 }}>
                Add New Entry
            </Button>

        </>
    );

};

export default PatientInfo;