import * as yup from 'yup';
import { INVALID_FIELD } from '../../../constants/err-msgs';
import { URL_REGEX } from '../../../constants/regex';

export const shema = yup.object().shape({
    cloudDataLink: yup.string().trim().required(INVALID_FIELD).matches(URL_REGEX, { message: INVALID_FIELD }),
});
