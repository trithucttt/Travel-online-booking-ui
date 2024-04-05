import styles from './AddDestination.module.scss';
import Select from 'react-select';
import { useEffect, useState } from 'react';
import apiService from '../../../../Components/ApiService';
import validateDestinationData from './validationDestinationData';
function Add() {
    const [errors, setErrors] = useState({});
    const [fileImage, setFileImage] = useState([]);
    const [cityId, setCityId] = useState();
    const [districtId, setDistrictId] = useState();
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [inputKey] = useState(Date.now());
    const [newDestination, setNewDestination] = useState({
        image: '',
        destinationName: '',
        address: '',
        wardId: '',
    });

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const data = await apiService.request('get', 'business/city');
                // console.log(data);
                setCity(data.map((city) => ({ value: city.id, label: city.full_name_en })));
            } catch (error) {
                console.log(error);
            }
        };
        fetchCity();
    }, []);

    const handleValueToursChange = (e, fieldName) => {
        const { value } = e.target;
        // console.log(`Updating ${fieldName} to ${value}`);
        setNewDestination((prevValues) => ({
            ...prevValues,
            [fieldName]: value,
        }));
        // console.log(newDestination);
    };

    const handleSelectCity = async (data) => {
        // console.log('City Id', data);
        const cityIdSelect = data.value;
        setCityId(cityIdSelect);
        const res = await apiService.request(
            'get',
            'business/district',
            null,
            {},
            {
                id: cityIdSelect,
            },
        );
        setDistrict(res.map((district) => ({ value: district.id, label: district.full_name_en })));
    };
    const handleSelectDistrict = async (data) => {
        // console.log('District Id', data);
        const districtIdSelect = data.value;
        setDistrictId(districtIdSelect);
        const res = await apiService.request(
            'get',
            'business/ward',
            null,
            {},
            {
                id: districtIdSelect,
            },
        );
        setWard(res.map((ward) => ({ value: ward.id, label: ward.full_name_en })));
    };
    const handleSelectWard = (data) => {
        console.log(data);
        const wardIdSelect = data.value;
        setNewDestination((pre) => ({
            ...pre,
            wardId: wardIdSelect,
        }));
        console.log(newDestination);
    };

    const handleSaveTour = () => {
        const validateErrors = validateDestinationData(newDestination);
        console.log(validateErrors);
        // console.log(listDestination.length);
        if (Object.keys(validateErrors).length === 0) {
            console.log('No validation Error', newDestination);
        } else {
            setErrors(validateErrors);
        }
    };

    const handleChangeImage = (e) => {
        const selectedFile = e.target.files[0];
        setFileImage(selectedFile);
        console.log(selectedFile);
        setNewDestination((pre) => ({
            ...pre,
            image: selectedFile,
        }));
    };

    return (
        <div className={styles.container}>
            <div className={styles.formGroupTitle}>
                <label className={styles.labelTitle}>Name Destination:</label>
                <input
                    type="text"
                    value={newDestination.destinationName}
                    className={`${styles.inputInfo} ${styles.inputTitle}`}
                    placeholder="Enter name Destination"
                    name="destinationName"
                    onChange={(e) => handleValueToursChange(e, 'destinationName')}
                />
            </div>
            {errors.destinationName && <div className={styles.error}>{errors.destinationName}</div>}
            <div className={styles.formGroupDate}>
                <div className={styles.endDay}>
                    <label className={styles.labelStartDay}>Image:</label>
                    <input
                        type="file"
                        key={inputKey}
                        className={`${styles.inputInfo} ${styles.inputEndDay}`}
                        onChange={handleChangeImage}
                    />
                </div>
                {errors.image && <div className={styles.error}>{errors.image}</div>}
            </div>
            <div className={styles.location}>
                <div className={styles.groupLocation}>
                    <label className={styles.labelCity}>Choose City:</label>
                    <Select
                        className={styles.selectDestination}
                        value={city.find((option) => option.value === cityId)}
                        onChange={handleSelectCity}
                        options={city}
                        placeholder="Select City"
                    />
                    {errors.wardId && <div className={styles.error}>City is required</div>}
                </div>
                <div className={styles.groupLocation}>
                    <label className={styles.labelDistrict}>Chose District: </label>
                    <Select
                        className={styles.selectDistrict}
                        value={district?.find((option) => option.value === districtId)}
                        onChange={handleSelectDistrict}
                        options={district}
                        placeholder="Select District"
                        isDisabled={!cityId}
                    />
                    {errors.wardId && <div className={styles.error}>District is required</div>}
                </div>
                <div className={styles.groupLocation}>
                    <label className={styles.labelDistrict}>Chose Ward: </label>
                    <Select
                        className={styles.selectWard}
                        value={ward?.find((option) => option.value === ward.id)}
                        onChange={handleSelectWard}
                        options={ward}
                        placeholder="Select Ward"
                        isDisabled={!districtId}
                    />
                    {errors.wardId && <div className={styles.error}>{errors.wardId}</div>}
                </div>
            </div>
            <div className={styles.startDay}>
                <label className={styles.labelStartDay}>Address:</label>
                <input
                    type="text"
                    name="address"
                    className={`${styles.inputInfo} ${styles.inputStartDay}`}
                    value={newDestination.address}
                    onChange={(e) => handleValueToursChange(e, 'address')}
                />
            </div>
            {errors.address && <div className={styles.error}>{errors.address}</div>}
            <div className={styles.groupButton}>
                <button onClick={handleSaveTour} className={styles.btnSave}>
                    Save
                </button>
            </div>
        </div>
    );
}

export default Add;
