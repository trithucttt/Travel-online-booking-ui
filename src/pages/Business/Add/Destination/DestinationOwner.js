import { useEffect, useState } from 'react';
import apiService from '../../../../Components/ApiService';
import styles from './TableDestination.module.scss';
function TableDestination() {
    const [destinationData, setDestinationData] = useState([]);
    useEffect(() => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const fetchDestinationTable = async () => {
            const data = await apiService.request('get', 'business/table/destination', null, headers);
            setDestinationData(data);
            console.log(data);
        };
        fetchDestinationTable();
    }, []);

    return (
        <div>
            <table className={styles.destinationTable}>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Address</th>
                        <th>Location</th>
                    </tr>
                </thead>
                <tbody>
                    {destinationData.map((destination) => (
                        <tr key={destination.desId}>
                            <td>{destination.desId}</td>
                            <td>{destination.desName}</td>
                            <td>{destination.description}</td>
                            <td>{destination.desAddress}</td>
                            <td>{destination.location}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
export default TableDestination;
