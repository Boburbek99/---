
import {
    required,
    helpers,
    minLength,
    minValue,
    numeric
} from '@vuelidate/validators';

export const useInventoryValidation = (formData, inventoryStore) => {
    const rules = {
        title: {
            required: helpers.withMessage('Название обязательно', required),
            minLength: helpers.withMessage('Минимум 3 символа', minLength(3)),
            notOnlyNumbers: helpers.withMessage(
                'Название не может состоять только из цифр',
                value => !/^\d+$/.test(value)
            ),
            uniqueName: helpers.withMessage(
                'Такое название уже существует',
                value => !inventoryStore.inventories?.some(item =>
                    item.title === value && item.id !== formData.value.id
                )
            )
        },
        category: {
            required: helpers.withMessage('Выберите категорию', required)
        },
        price: {
            required: helpers.withMessage('Укажите цену', required),
            minValue: helpers.withMessage('Цена должна быть больше 0', minValue(0.01)),
        },
        count: {
            required: helpers.withMessage('Укажите количество', required),
            minValue: helpers.withMessage('Минимум 1 единица', minValue(1)),
            numeric: helpers.withMessage('Только числа', numeric)
        },
        avatar: {
            required: helpers.withMessage('Укажите URL аватара', required),
            url: helpers.withMessage(
                'Неверный формат URL',
                value => !value || /^(https?:\/\/).+\..+$/.test(value)
            )
        },
        description: {
            required: helpers.withMessage('Добавьте описание', required),
            maxLength: helpers.withMessage(
                'Максимум 255 символов',
                value => value.length <= 255
            ),
            noXSS: helpers.withMessage(
                'Недопустимые символы',
                value => !/<script|on\w+=|javascript:/i.test(value)
            )
        },
        gallery: {
            validUrls: helpers.withMessage(
                'Неверный формат URL фотографий',
                value => !value.length || value.every(url =>
                    /^(https?:\/\/).+\..+$/.test(url)
                )
            )
        }
    };

    return rules;
};