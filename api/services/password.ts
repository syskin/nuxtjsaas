import { hash, compare } from 'bcrypt';
export const compareHashPassword = async (password: string, hashPassword: string) => {
    const response = await new Promise((resolve, reject) => {
        compare(password, hashPassword, (err, match) => {
            err ? reject(err) : resolve(match);
        });
    });
    return response;
};

export const hashPassword = async (password: string) => {
    const saltRounds = 10;

    const hashedPassword = await new Promise((resolve, reject) => {
        hash(password, saltRounds, function (err, hash) {
            err ? reject(err) : resolve(hash);
        });
    });

    return hashedPassword;
};

export const validate = (password: string) => {
    const passwordRegex = new RegExp(`^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})`);
    return passwordRegex.test(password);
};
