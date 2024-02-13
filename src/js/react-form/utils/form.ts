import { MONGODB_REGEX, MY_SQL_REGEX, ORACLE_REGEX, POSTGRE_SQL, REDIS_REGEX, SQL_SERVER_REGEX } from '../constants/regex';
import { TDataBaseTypes } from '../models/form';

export const maskPhoneNumber = (value: string) => {
    if (value.length > 6) {
        return (value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(6)}`);
    }
    if (value.length > 3) {
        return (value = `(${value.slice(0, 3)}) ${value.slice(3)}`);
    }
    return value;
};

export const detectDBTypeByUrl = (url: string): TDataBaseTypes | null => {
    if (ORACLE_REGEX.test(url)) return 'Oracle';
    if (POSTGRE_SQL.test(url)) return 'PostgreSQL';
    if (MY_SQL_REGEX.test(url)) return 'MySql';
    if (SQL_SERVER_REGEX.test(url)) return 'SqlServer';
    if (MONGODB_REGEX.test(url)) return 'MongoDB';
    if (REDIS_REGEX.test(url)) return 'Redis';
    return null;
};
