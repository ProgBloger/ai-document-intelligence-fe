import { useParams } from "react-router-dom";
import PassportDetails from "../../components/PassportDetails/PassportDetails";
import { useEffect, useState } from "react";
import {getPassportById} from '../../api/apiService';
import { Passport } from '../../models/Passport';

const PassportDetailsPage: React.FC = () => {
    
    const {id} = useParams<{id:string}>();
    const [passport, setPassport] = useState<Passport | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        if (!id) {
            setError('No ID provided in the URL');
            setLoading(false);
            return;
        }

        const fetchPassport = async () => {
            try {
                const data = await getPassportById(id);
                setPassport(data);
            } catch (err) {
                setError("Failed to fetch passport details");
            } finally {
                setLoading(false);
            }
        };
        
        fetchPassport();
    }, [id]);

    if(loading) {
        return <p>Loading...</p>;
    }

    if(error) {
        return <p>Error: {error}</p>
    }

    if(!passport){
        return <p>No passport found</p>;
    }
    
    return (
        <div>
            <PassportDetails passport={
                {
                    rowKey: passport.rowKey,
                    partitionKey: passport.partitionKey,
                    firstName: passport.firstName,
                    lastName: passport.lastName,
                    dateOfBirth: passport.dateOfBirth,
                    dateOfIssue: passport.dateOfIssue,
                    dateOfExpiration: passport.dateOfExpiration,
                    nationality: passport.nationality,
                    documentType: passport.documentType,
                    documentNumber: passport.documentNumber,
                    issuingAuthority: passport.issuingAuthority,
                    machineReadableZone: passport.machineReadableZone,
                    placeOfBirth: passport.placeOfBirth,
                    sex: passport.sex,
                }
            } />
        </div>
    )
}

export default PassportDetailsPage;