import * as yup from 'yup';
import { INVALID_FIELD, REQUIRED_FIELD } from '../../../constants/err-msgs';
import { PORT_NUMBER_REGEX, URL_REGEX } from '../../../constants/regex';

const shape = yup
    .object()
    .shape(
        {
            url: yup.string().matches(URL_REGEX, { message: INVALID_FIELD }),
            host: yup.string().when('url', {
                is: (value: string) => !value.length,
                then: (schema) => schema.required(REQUIRED_FIELD),
            }),
            port: yup
                .string()
                .matches(PORT_NUMBER_REGEX, { message: INVALID_FIELD })
                .when('url', {
                    is: (value: string) => !value.length,
                    then: (schema) => schema.required(REQUIRED_FIELD),
                }),
            database: yup.string().when('url', {
                is: (value: string) => !value.length,
                then: (schema) => schema.required(REQUIRED_FIELD),
            }),
            user: yup.string().when('url', {
                is: (value: string) => !value.length,
                then: (schema) => schema.required(REQUIRED_FIELD),
            }),
            password: yup.string().when('url', {
                is: (value: string) => !value.length,
                then: (schema) => schema.required(REQUIRED_FIELD),
            }),
        },
        // [['url', 'url']],
    )
    .required();

export const schema = yup.object().shape({
    databaseList: yup.array().of(shape),
});
