import * as yup from 'yup';
import { INVALID_FIELD } from '../../../constants/err-msgs';

export const shema = yup.object().shape({
    anotherCalendar: yup.string().required(INVALID_FIELD),
});
