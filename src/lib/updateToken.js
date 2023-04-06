import axios from 'axios';
import { getRefreshTokenAsyncStorage, setTokenAsyncStorage } from '../store/AsyncStorage';
import { TOKEN_URL, basicAuth } from '../constants/api';

export const updateToken = async () => {
    try {
        const refreshToken = await getRefreshTokenAsyncStorage();
        const config = {
            headers: {
                Authorization: basicAuth,
            },
            params: {
                grant_type: 'refresh_token',
                refresh_token: refreshToken,
            },
        };
        const response = await axios.post(TOKEN_URL, null, config);
        setTokenAsyncStorage(response.data.access_token, response.data.refresh_token);
    } catch (error) {
        console.log(error);
    }
};
