import * as yup from 'yup';
import { EMAIL_INVALID, REQUIRED_FIELD } from '../../../constants/err-msgs';
import { EMAIL_REGEX } from '../../../constants/regex';

export const shema = yup.object().shape({
    email: yup.string().required(REQUIRED_FIELD).matches(EMAIL_REGEX, { message: EMAIL_INVALID }),
    appPassword: yup.string().required(REQUIRED_FIELD),
});
