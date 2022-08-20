import { useParams } from "react-router-dom";
import { addEntry, useStateValue } from "../state";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import { Entry, HealthCheckEntry } from "../types";
import DiagnoseInfo from "../components/DiagnoseInfo";
import EntryDetails from "../components/EntryDetails";
import { Box, Button, Grid, Paper, styled } from "@material-ui/core";
import axios from "axios";
import React from "react";
import { EntryFormValues } from "../AddPatientModal/AddEntryForm";
import { apiBaseUrl } from "../constants";
import { AddEntryModal } from "../AddPatientModal";

const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'left',
    color: theme.palette.text.primary,
}));


const PatientInfo = () => {
    const [{ patients }, dispatch] = useStateValue();
    const allPatient = Object.values(patients);

    const { id } = useParams<{ id: string }>();

    const detailedPatient = allPatient.find(p => p.id === id);

    const [modalOpen, setModalOpen] = React.useState<boolean>(false);
    const [error, setError] = React.useState<string>();

    const openModal = (): void => setModalOpen(true);

    const closeModal = (): void => {
        setModalOpen(false);
        setError(undefined);
    };

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

    const submitNewEntry = async (values: EntryFormValues) => {
        try {
            if (id) {
                const { data: newEntry } = await axios.post<HealthCheckEntry>(
                    `${apiBaseUrl}/patients/${id}/entries`,
                    values
                );

                console.log('newEntry', newEntry);


                if (detailedPatient) {
                    dispatch(addEntry(detailedPatient, newEntry));
                    console.log('detailedPatient', detailedPatient);

                    console.log('newEntry', newEntry);

                }
                closeModal();
            }
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e) {
                    console.error(e.response?.data || "Unrecognized axios error");
                    setError(String(e.response?.data) || "Unrecognized axios error");
                }
            } else {
                console.error("Unknown error", e);
                setError("Unknown error");
            }
        }
    };

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
                                {<EntryDetails entry={entry} />}

                                <ul>{entry.diagnosisCodes?.map((diagnosisCode, index) =>
                                    <li key={index}>{<DiagnoseInfo code={diagnosisCode} />}</li>)}
                                </ul>

                                <div> diagnosed by {entry.specialist}</div>
                            </Item>
                        </Grid>
                    </Box>
                );
            }
            )
            }

            <AddEntryModal
                modalOpen={modalOpen}
                onSubmit={submitNewEntry}
                error={error}
                onClose={closeModal}
            />

            <Button variant="contained"
                color="primary"
                style={{ margin: 20 }}
                onClick={() => openModal()}>
                Add New Entry
            </Button>

        </>
    );

};

export default PatientInfo;