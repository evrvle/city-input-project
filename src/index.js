import './styles.scss';
import { CityInput } from './components/city-input/city-input';

document.addEventListener('DOMContentLoaded', () => {
    new CityInput('#city-input');
});

// Преобразование ключей объекта в верхний регистр

function convertKeysToUpperCase(data) {
    if (typeof data !== 'object' || data === null) {
        return data;
    }

    if (Array.isArray(data)) {
        return data.map(item => convertKeysToUpperCase(item));
    }

    return Object.entries(data).reduce((acc, [key, value]) => {
        acc[key.toUpperCase()] = convertKeysToUpperCase(value);
        return acc;
    }, {});
}

