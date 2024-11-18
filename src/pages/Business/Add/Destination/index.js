import Select from 'react-select';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import apiService from '../../../../Components/ApiService';
import validateDestinationData from './validationDestinationData';
import styles from './AddDestination.module.scss';
import swal from 'sweetalert';
import { LoadingPopup } from '../../../../Components/Loading/LoadingPopup';
function Add() {
    const [errors, setErrors] = useState({});
    const [fileImage, setFileImage] = useState([]);
    const [cityId, setCityId] = useState();
    const [districtId, setDistrictId] = useState();
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);
    const [ward, setWard] = useState([]);
    const [inputKey] = useState(Date.now());
    const [imagePreviewUrl, setImagePreviewUrl] = useState('');
    const [loading, setLoading] = useState(false);
    const [newDestination, setNewDestination] = useState({
        image: '',
        destinationName: '',
        address: '',
        wardId: '',
        description: '',
    });

    useEffect(() => {
        const fetchCity = async () => {
            try {
                const data = await apiService.request('get', 'business/city');
                // console.log(data);
                setCity(data.map((city) => ({ value: city.id, label: city.full_name })));
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
        setDistrict(res.map((district) => ({ value: district.id, label: district.full_name })));
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
        setWard(res.map((ward) => ({ value: ward.id, label: ward.full_name })));
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

    const handleSaveTour = async () => {
        const validateErrors = validateDestinationData(newDestination);
        console.log(validateErrors);
        const token = localStorage.getItem('token');
        const headers = {
            Authorization: `Bearer ${token}`,
        };
        // console.log(listDestination.length);
        if (Object.keys(validateErrors).length === 0) {
            const formData = new FormData();
            formData.append('image', newDestination.image);
            formData.append('destinationName', newDestination.destinationName);
            formData.append('address', newDestination.address);
            formData.append('wardId', newDestination.wardId);
            formData.append('description', newDestination.description);
            try {
                setLoading(true);
                const data = await apiService.request('post', 'business/destination/save', formData, headers);
                toast(data);
                setNewDestination({
                    image: '',
                    destinationName: '',
                    address: '',
                    wardId: '',
                    description: '',
                });
                setImagePreviewUrl('');
                swal('Thông báo', data, 'info');
            } catch (error) {
            } finally {
                setLoading(false);
            }
            // console.log('No validation Error formData', formData);
            // formData.forEach((value, key) => {
            //     console.log(`Key: ${key}, Value: ${value}`);
            // });
            // console.log('No validation Error newDestination', newDestination);
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
        setImagePreviewUrl(URL.createObjectURL(selectedFile));
    };

    return (
        <div className={styles.container}>
            <div className={styles.formGroupTitle}>
                <label className={styles.labelTitle}>Tên điểm đến:</label>
                <input
                    type="text"
                    value={newDestination.destinationName}
                    className={`${styles.inputInfo} ${styles.inputTitle}`}
                    placeholder="Tên điểm đến"
                    name="destinationName"
                    onChange={(e) => handleValueToursChange(e, 'destinationName')}
                />
            </div>
            {errors.destinationName && <div className={styles.error}>{errors.destinationName}</div>}
            <div className={styles.formGroupTitle}>
                <label className={styles.labelTitle}>Mô tả cho điểm đến:</label>
                <textarea
                    value={newDestination.description}
                    className={`${styles.inputInfo} ${styles.inputTitle}`}
                    placeholder="Thêm mô tả điểm đến"
                    name="description"
                    onChange={(e) => handleValueToursChange(e, 'description')}
                />
            </div>
            {errors.description && <div className={styles.error}>{errors.description}</div>}
            {imagePreviewUrl && (
                <div className={styles.formGroupDate}>
                    {/* anh duoc chon hien thi ơ day */}
                    <div>
                        {imagePreviewUrl && <img className={styles.imageUpload} src={imagePreviewUrl} alt="Preview" />}
                    </div>
                </div>
            )}
            <div className={styles.formGroupDate}>
                <div className={styles.endDay}>
                    <label className={styles.labelStartDay}>Ảnh cho điểm đến:</label>
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
                    <label className={styles.labelCity}>Chọn thành phố/tỉnh:</label>
                    <Select
                        className={styles.selectDestination}
                        value={city.find((option) => option.value === cityId)}
                        onChange={handleSelectCity}
                        options={city}
                        placeholder="Chọn thành phố/tỉnh"
                    />
                    {errors.wardId && <div className={styles.error}>Tỉnh/Thành phố là bắt buộc</div>}
                </div>
                <div className={styles.groupLocation}>
                    <label className={styles.labelDistrict}>Chọn quận/huyện: </label>
                    <Select
                        className={styles.selectDistrict}
                        value={district?.find((option) => option.value === districtId)}
                        onChange={handleSelectDistrict}
                        options={district}
                        placeholder="Chọn quận/huyện"
                        isDisabled={!cityId}
                    />
                    {errors.wardId && <div className={styles.error}>Quận/Huyện là bắt buộc</div>}
                </div>
                <div className={styles.groupLocation}>
                    <label className={styles.labelDistrict}>Chọn phường/xã: </label>
                    <Select
                        className={styles.selectWard}
                        value={ward?.find((option) => option.value === ward.id)}
                        onChange={handleSelectWard}
                        options={ward}
                        placeholder="Chọn phường/xã"
                        isDisabled={!districtId}
                    />
                    {errors.wardId && <div className={styles.error}>{errors.wardId}</div>}
                </div>
            </div>
            <div className={styles.startDay}>
                <label className={styles.labelStartDay}>Địa chỉ cụ thể:</label>
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
                    Lưu lại
                </button>
            </div>
            <LoadingPopup isLoading={loading} />
        </div>
    );
}

export default Add;
