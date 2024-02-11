export const ONLY_DIGITS_REGEX = /^\d+$/;
export const PHONE_REGEX = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/gm;
export const EMAIL_REGEX = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/gm;
export const URL_REGEX =
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\+.~#?&\/\/=]*)/gm;
export const PORT_NUMBER_REGEX =
    /^((6553[0-5])|(655[0-2][0-9])|(65[0-4][0-9]{2})|(6[0-4][0-9]{3})|([1-5][0-9]{4})|([0-5]{0,5})|([0-9]{1,4}))$/;
export const SQL_SERVER_REGEX =
    /(?=.*Data Source=([^;]+))(?=.*Initial Catalog=([^;]+))(?=.*User ID=([^;]+))(?=.*Password=([^;]+)).*[^;]+;$/;
export const ORACLE_REGEX = /(?=.*User Id=([^;]+))(?=.*Password=([^;]+))(?=.*Data Source=([^:]+):(\d+)\/([^;]+)).*[^;]+;$/;
export const MY_SQL_REGEX = /(?=.*Server=([^;]+))(?=.*Database=([^;]+))(?=.*User ID=([^;]+))(?=.*Password=([^;]+)).*[^;]+;$/;
export const POSTGRE_SQL = /(?=.*Host=([^;]+))(?=.*Database=([^;]+))(?=.*Username=([^;]+))(?=.*Password=([^;]+)).*[^;]+;$/;
export const MONGODB_REGEX = /^mongodb:\/\/([^:]+):([^@]+)@([^:]+):(\d+)\/([^\/]+)/;
export const REDIS_REGEX = /^([^:]+):([^,]+)(?=.*password=([^,]+))(?=.*user=([^,]+))/;
