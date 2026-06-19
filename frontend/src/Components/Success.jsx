import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/axios';

const Success = () => {
    const { packageName, userId } = useParams();
    const navigate = useNavigate();
    const [done, setDone] = useState(false);

    const prices = { Basic: 49, Professional: 199, Premium: 499 };

    useEffect(() => {
        const savePayment = async () => {
            try {
                await api.post("/payments/paymentAdd", {
                    userId:      userId,
                    packageName: packageName,
                    price:       prices[packageName] || 0
                });
                setDone(true);
            } catch (error) {
                console.error("Save payment error:", error);
            }
        };

        if (userId && packageName) {
            savePayment();
        }
    }, [userId, packageName]);

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-3xl font-bold text-green-600 mb-2">Payment Successful!</h1>
            <p className="text-gray-500 mb-6">Your {packageName} package is now active.</p>
            <button
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-6 py-2.5 rounded-lg font-semibold hover:bg-blue-700"
            >
                Go to Home
            </button>
        </div>
    );
};

export default Success;