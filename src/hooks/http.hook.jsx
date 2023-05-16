import { useState, useCallback } from "react";

export const useHttp = () => {
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = { 'Content-Type': 'application/json' }) => {

        setProcess('loading');

        try {
            //робимо запрос до арі
            const response = await fetch(url, { method, body, headers });

            if (!response.ok) {
                new Error(
                    `Could not fetch ${url}, check the status: ${response.status}`,
                );
            }
            const data = await response.json();
            // setProcess('confirmed'); переносимо в кожен компонент шоб не вибивало помилку при підгрузкі персонажу, та передаємо состояніе setProcess
            return data;
        } catch (e) {
            setProcess('error');
            throw e; // викидуємо ошибку 
        }
    }, []);

    const clearError = useCallback(() => {
        setProcess('waiting');
    }, []);

    return {
        request,
        clearError,
        process,
        setProcess
    }
}
