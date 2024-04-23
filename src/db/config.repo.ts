export enum ConfigKey {
    'autoSkip' = 'autoSkip',
}

export class ConfigStorageSyncRepo {
    static instance: ConfigStorageSyncRepo | undefined;

    static getInstance = () => {
        if (this.instance) return this.instance;
        this.instance = new ConfigStorageSyncRepo();
        return this.instance;
    };

    private getStorage = <T>(key: string): Promise<T | null> => {
        return new Promise((res) => {
            chrome.storage.sync.get([key], (obj) => {
                res(obj[key] ? JSON.parse(obj[key]) : null);
            });
        });
    };

    private setStorage = async <T>(key: string, data: T) => {
        return chrome.storage.sync.set({
            [key]: JSON.stringify(data),
        });
    };

    getAutoSkipIsEnabled = async (id: string) => {
        let isEnabledAutoSkip = await this.getStorage<boolean>(id);
        if (isEnabledAutoSkip === undefined) {
            this.setAutoSkipIsEnabled(id, false);
            isEnabledAutoSkip = false;
        }
        return isEnabledAutoSkip;
    };

    setAutoSkipIsEnabled = async (id: string, isEnabled: boolean) => {
        await this.setStorage(id, isEnabled);
    };
}
