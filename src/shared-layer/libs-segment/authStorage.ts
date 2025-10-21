export const authStorage = {
    saveBasicCredentials: (login: string, password: string) => {
        localStorage.setItem('basic-creds', JSON.stringify({login, password}));
    },

    getBasicCredentials: () => {
        const credsString = localStorage.getItem('basic-creds')
        if (credsString) {
            const creds = JSON.parse(credsString)
            return creds;
        }

        return null
    },

    removeBasicCredentials: () => {
        localStorage.removeItem('basic-creds');
    }
}