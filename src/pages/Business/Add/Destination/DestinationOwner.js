import { useEffect, useState } from 'react';
import apiService from '../../../../Components/ApiService';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faBuilding, faInfoCircle, faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditDestination from './EditDestination';

function TableDestination() {
    const [destinationData, setDestinationData] = useState([]);
    const [selectDestination, setSelectedDestination] = useState(false);
    const fetchDestinationTable = async () => {
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        const data = await apiService.request('get', 'business/table/destination', null, headers);
        setDestinationData(data);
        console.log(data);
    };
    useEffect(() => {
        fetchDestinationTable();
    }, []);

    const handleEdit = (destination) => {
        console.log('Chỉnh sửa điểm đến có ID:', destination);
        setSelectedDestination(destination);
    };

    const handleDelete = (id) => {
        console.log('Xóa điểm đến có ID:', id);
        // Logic gọi API để xóa điểm đến
    };

    const closeEditDestination = () => {
        setSelectedDestination(null);
        fetchDestinationTable();
    };
    return (
        <div className="p-6 bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-200 mb-6 text-center">Danh Sách Điểm Đến</h1>
            <div className="overflow-x-auto">
                <table className="w-full table-auto bg-gray-800 shadow-xl rounded-lg overflow-hidden">
                    <thead>
                        <tr className="bg-gray-700 text-gray-300 text-lg">
                            <th className="p-4 border-b border-gray-700">ID</th>
                            <th className="p-4 border-b border-gray-700">Tên Điểm Đến</th>
                            <th className="p-4 border-b border-gray-700">Mô Tả</th>
                            <th className="p-4 border-b border-gray-700">Địa Chỉ</th>
                            <th className="p-4 border-b border-gray-700">Vị Trí</th>
                            <th className="p-4 border-b border-gray-700">Hành Động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {destinationData.map((destination) => (
                            <tr key={destination.desId} className="hover:bg-gray-700 transition-colors">
                                <td className="p-4 text-center font-semibold text-gray-400">{destination.desId}</td>
                                <td className="p-4 flex items-center text-gray-200 font-medium">
                                    <FontAwesomeIcon icon={faBuilding} className="mr-2 text-blue-400" />
                                    {destination.desName}
                                </td>
                                <td className="p-4 text-gray-400">
                                    <FontAwesomeIcon icon={faInfoCircle} className="mr-2 text-gray-500" />
                                    {destination.description.length > 50
                                        ? `${destination.description.substring(0, 50)}...`
                                        : destination.description}
                                </td>
                                <td className="p-4 text-gray-400">
                                    <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-2 text-red-400" />
                                    {destination.desAddress}
                                </td>
                                <td className="p-4 text-gray-400">{destination.location}</td>

                                {/* Hành Động */}
                                <td className="p-4 flex justify-center space-x-4">
                                    <button
                                        onClick={() => handleEdit(destination)}
                                        className="text-blue-400 hover:text-blue-500 transition-colors p-2 rounded-full bg-gray-700 hover:bg-gray-600"
                                    >
                                        <FontAwesomeIcon icon={faEdit} className="text-lg" />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(destination.desId)}
                                        className="text-red-400 hover:text-red-500 transition-colors p-2 rounded-full bg-gray-700 hover:bg-gray-600"
                                    >
                                        <FontAwesomeIcon icon={faTrash} className="text-lg" />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {selectDestination && <EditDestination destination={selectDestination} onClose={closeEditDestination} />}
        </div>
    );
}

export default TableDestination;
