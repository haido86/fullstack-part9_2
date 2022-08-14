import { useStateValue } from "../state";

const DiagnoseInfo = ({ code }: { code: string }) => {
    const [{ diagnoses },] = useStateValue();
    const allDiagnoses = Object.values(diagnoses);

    const filterDiagnose = allDiagnoses.find((diagnose) => diagnose.code === code);

    return (
        <>
            {code} {filterDiagnose?.name}
        </>
    );
};

export default DiagnoseInfo;