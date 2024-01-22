import * as yup from 'yup';

export const shape = yup.object().shape({
    isPhoneRemindersAccept: yup.boolean(),
});
