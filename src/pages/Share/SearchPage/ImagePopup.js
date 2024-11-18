import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Modal from 'react-modal';

function ImagePopup({ modalIsOpen, closeModal, modalImages }) {
    return (
        <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className="flex flex-col items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg">
                <button onClick={closeModal} className="mb-4 text-red-500">
                    <FontAwesomeIcon icon={faClose} />
                </button>
                <div className="grid grid-cols-2 gap-4">
                    {modalImages?.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Modal Imagee ${index + 1}`}
                            className="w-full h-40 object-cover rounded-lg"
                        />
                    ))}
                </div>
            </div>
        </Modal>
    );
}

export default ImagePopup;
