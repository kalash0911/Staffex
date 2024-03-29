import * as yup from 'yup';
import { INVALID_FIELD } from '../../../constants/err-msgs';

export const shema = yup.object().shape({
    anotherAppName: yup.string().trim().required(INVALID_FIELD),
});
