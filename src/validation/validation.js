import { required, helpers, minLength } from '@vuelidate/validators';
export const loginValidator = (model) => {
    return {
        title: {
            required: helpers.withMessage("Обязательное поле", value => !!value),
            minLength: helpers.withMessage("Минимальная длина  символов", minLength(6)),
        },
        password: {
            required: helpers.withMessage("Обязательное поле", required),
            minLength: helpers.withMessage("Минимальная длина  символов", minLength(6)),
        }
    };
};
